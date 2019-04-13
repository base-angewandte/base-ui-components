/* eslint-disable no-unused-vars */
import Vue from 'vue';
import SvgIcon from 'vue-svgicon';

import App from './app';

import './styles/app.scss';
import './styles/main.scss';

Vue.config.productionTip = false;

Vue.use(SvgIcon, {
  tagName: 'svgicon',
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
