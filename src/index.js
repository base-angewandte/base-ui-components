import Vue from 'vue';
import App from './app';
import './styles/app.scss';
import 'normalize.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
