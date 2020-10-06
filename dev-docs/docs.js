/* eslint-disable no-unused-vars */
import Vue from 'vue';
import SvgIcon from 'vue-svgicon';

import App from './app';

import './styles/app.scss';

Vue.config.productionTip = false;

Vue.use(SvgIcon, {
  tagName: 'svgicon',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
