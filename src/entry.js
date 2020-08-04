// Import vue components
import * as components from './components';
import { use, registerComponentProgrammatic } from './utils/plugins'
import './styles/lib.scss';

let VueInstance;
let config;

const isObject = (item) => typeof item === 'object' && !Array.isArray(item)
const merge = (target, source, deep = false) => {
  if (deep || !Object.assign) {
    const isDeep = (prop) =>
      isObject(source[prop]) &&
      target !== null &&
      target.hasOwnProperty(prop) &&
      isObject(target[prop])
    const replaced = Object.getOwnPropertyNames(source)
      .map((prop) => ({ [prop]: isDeep(prop)
          ? merge(target[prop], source[prop], deep)
          : source[prop] }))
      .reduce((a, b) => ({ ...a, ...b }), {})

    return {
      ...target,
      ...replaced
    }
  } else {
    return Object.assign(target, source)
  }
}

export const setVueInstance = (Vue) => { VueInstance = Vue }

export const setOptions = (options) => { config = options }

const SrcPackageTest = {
  install(Vue, options = {}) {
    setVueInstance(Vue)
    // Options
    setOptions(merge(config, options, true))
    // Components
    for (let componentKey in components) {
      Vue.use(components[componentKey])
    }
  }
}

use(SrcPackageTest);

console.log(SrcPackageTest);

export default SrcPackageTest;


/*

// install function executed by Vue.use()
const install = function installSrcRollupTest(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */ /*
if ('false' === process.env.ES_BUILD) {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
}
// Default export is library as a whole, registered via Vue.use()
export default plugin; */

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components';
