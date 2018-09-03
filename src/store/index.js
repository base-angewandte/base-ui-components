import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import api from './modules/api/index';
import plugins from './plugins';


Vue.use(Vuex);
Vue.use(VueAxios, Axios);

export default new Vuex.Store({
  modules: {
    api,
  },
  strict: false,
});
