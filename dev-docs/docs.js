/* eslint-disable */
import Vue from 'vue';
import { createApp } from 'vue';

import App from './app.vue';

import './styles/app.scss';

Vue.config.productionTip = false;

const app = createApp(App);
app.mount('#app');
