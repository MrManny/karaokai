import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';
import DialogService from 'primevue/dialogservice';
import App from './App.vue';
import { routes } from './routes';

import PrimeVue from 'primevue/config';
import './style.css';
import 'primevue/resources/themes/md-dark-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const pinia = createPinia();
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
app.use(PrimeVue);
app.use(DialogService);
app.use(pinia);
app.use(router);
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
