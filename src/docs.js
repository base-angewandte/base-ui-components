/* eslint-disable no-unused-vars */
import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import Vuex from 'vuex';

import App from './app';

import './styles/app.scss';
import './styles/main.scss';
import SkosmosAPI from './store/SkosmosAPI';


Vue.use(Vuex);
const store = new Vuex.Store({ strict: false });
SkosmosAPI(store, {
  baseURL: 'https://voc.uni-ak.ac.at/skosmos/rest/v1/',
}, 'SkosmosAPI');


Vue.config.productionTip = false;

Vue.use(SvgIcon, {
  tagName: 'svgicon',
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
