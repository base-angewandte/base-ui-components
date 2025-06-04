import 'normalize.css';
import { h } from 'vue'
import BaseTheme from './base/base-theme.js';
import VueLiveWithLayout from './components/vue-live-with-layout';
import HomeBelow from './components/HomeBelow.vue';
const modules = import.meta.glob(['../../../src/**/*.vue'], { eager: true });
import '../styles/app.scss';
import BaseNotifications from '@/plugins/base-notifications.js';

const ignoreComponents = [
  // we do not want to auto-import the component since it is registered
  // by the plugin automatically
  'BaseNotification',
];

export default {
  extends: BaseTheme,
  Layout() {
    return h(BaseTheme.Layout, null, {
      'home-features-after': () => h(HomeBelow)
    })
  },
  enhanceApp({ app }) {
    app.component('VueLive', VueLiveWithLayout);
    /**
     * This part is needed to make the components work in vue-live and was
     * taken from https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/examples/docgen-vite
     * created by https://github.com/elevatebart
     *
     * Copyright (c) 2021 Vue Styleguidist
     */
    Object.entries(modules).forEach(([filePath, mod]) => {
      const name = mod.default?.name || mod.name || filePath.split('/').pop().replace(/\..+$/, '');
      if (ignoreComponents.includes(name)) return;
      app.component(name, mod.default)
    });
    // add the BaseNotifications plugin for the styleguide demo
    app.use(BaseNotifications);
  }
};
