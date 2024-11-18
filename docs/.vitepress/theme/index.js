import DefaultTheme from 'vitepress/theme-without-fonts';
import VueLiveWithLayout from './components/vue-live-with-layout';
const modules = import.meta.glob
(['../../../src/**/*.vue'], { eager: true })
import '../styles/app.scss';

export default {
  ...DefaultTheme,
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
      const name = mod.default?.name || mod.name || filePath.split('/').pop().replace(/\..+$/, '')
      app.component(name, mod.default)
    })
  }
};
