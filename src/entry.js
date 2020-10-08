// Import vue components
import * as components from './components';
import { use } from './utils/plugins';

/* eslint-disable-next-line no-unused-vars */
let VueInstance;
let config;

const isObject = item => typeof item === 'object' && !Array.isArray(item);
const merge = (target, source, deep = false) => {
  if (deep || !Object.assign) {
    const isDeep = prop => isObject(source[prop])
      && target !== null
      // eslint-disable-next-line no-prototype-builtins
      && target.hasOwnProperty(prop)
      && isObject(target[prop]);
    const replaced = Object.getOwnPropertyNames(source)
      .map(prop => ({
        [prop]: isDeep(prop)
          ? merge(target[prop], source[prop], deep)
          : source[prop],
      }))
      .reduce((a, b) => ({ ...a, ...b }), {});

    return {
      ...target,
      ...replaced,
    };
  }
  return Object.assign(target, source);
};

export const setVueInstance = (Vue) => { VueInstance = Vue; };

export const setOptions = (options) => { config = options; };

const BaseUiComponents = {
  install(Vue, options = {}) {
    setVueInstance(Vue);
    // Options
    setOptions(merge(config, options, true));
    // Components
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const componentKey in components) {
      // eslint-disable-next-line import/namespace
      Vue.use(components[componentKey]);
    }
  },
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if (process.env.ES_BUILD === 'false') {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    use(BaseUiComponents);
  }
}

// Default export is library as a whole, registered via Vue.use()
export default BaseUiComponents;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components';
