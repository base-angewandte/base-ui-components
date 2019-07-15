import Vue from 'vue';
import App from './app';

import './styles/app.scss';

Vue.use(require('../src').default);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
