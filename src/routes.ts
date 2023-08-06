import Title from './pages/Title.vue';
import MainLayout from './layouts/MainLayout.vue';
import Vault from './pages/Vault.vue';
import Editor from './pages/Editor.vue';

export const enum RouteNames {
  Main = 'main',
  Vault = 'vault',
  Editor = 'editor',
}

export const routes = [
  {
    path: '/',
    name: RouteNames.Main,
    component: Title,
    meta: {
      layout: MainLayout,
    },
  },
  {
    path: '/vault',
    name: RouteNames.Vault,
    component: Vault,
    meta: {
      layout: MainLayout,
    },
  },
  {
    path: '/editor',
    name: RouteNames.Editor,
    component: Editor,
    meta: {
      layout: MainLayout,
    },
  },
];
