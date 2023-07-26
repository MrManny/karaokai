import Title from './pages/Title.vue';
import MainLayout from './layouts/MainLayout.vue';
import Vault from './pages/Vault.vue';

export const routes = [
  {
    path: '/',
    name: 'main',
    component: Title,
    meta: {
      layout: MainLayout,
    },
  },
  {
    path: '/vault',
    name: 'vault',
    component: Vault,
    meta: {
      layout: MainLayout,
    },
  },
];
