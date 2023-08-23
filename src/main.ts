import { defineCustomElement, createApp } from 'vue';
// import App from './App.vue';

import '@/assets/css/main.scss';

import WeatherWidget from '@/components/WeatherWidget.ce.vue';


const weatherWidget = defineCustomElement(WeatherWidget);
customElements.define('weather-widget', weatherWidget);


// const app = createApp(App);
// app.mount('#app');
