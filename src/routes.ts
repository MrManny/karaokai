import Title from './pages/Title.vue';
import MainLayout from './layouts/MainLayout.vue';
import Vault from './pages/Vault.vue';
import Editor from './pages/Editor.vue';
import PresenterLayout from './layouts/PresenterLayout.vue';
import Wizard from './components/Wizard/Wizard.vue';
import type { RouteRecordRaw } from 'vue-router';

export const enum RouteNames {
  Main = 'main',
  Vault = 'vault',
  Editor = 'editor',
  Presenter = 'presenter',
  Wizard = 'wizard',
}

type NamedRoute = RouteRecordRaw & { name: RouteNames };

export const routes: NamedRoute[] = [
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
  {
    path: '/presentation',
    name: RouteNames.Presenter,
    component: PresenterLayout,
  },
  {
    path: '/wizard',
    name: RouteNames.Wizard,
    component: Wizard,
    meta: {
      layout: MainLayout,
    },
  },
];
