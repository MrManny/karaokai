import Title from './pages/Title.vue';
import MainLayout from './layouts/MainLayout.vue';

export const routes = [
  {
    path: '/',
    component: Title,
    meta: {
      layout: MainLayout,
    },
  },
];
