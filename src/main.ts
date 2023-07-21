import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

void createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  });
