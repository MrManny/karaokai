import { describe, expect, it } from 'vitest';
import { routes } from './routes';
import MainLayout from './layouts/MainLayout.vue';

describe('routes', () => {
  const getRouteByName = (name: string) => routes.find((route) => route.name === name);

  const assertRouteExists = (name: string, path?: string) => {
    const route = getRouteByName(name);
    expect(route).toBeDefined();
    if (!path) return;
    expect(route).toHaveProperty('path', path);
  };
  const assertRouteLayout = (name: string, layout: unknown = MainLayout) => {
    const route = getRouteByName(name);
    expect(route.meta).toHaveProperty('layout', layout);
  };

  it('exports routes', () => {
    // assert
    expect(routes).toBeDefined();
  });

  it('has a route named "main"', () => {
    // assert
    assertRouteExists('main', '/');
    assertRouteLayout('main');
  });

  it('has a route named "vault"', () => {
    // assert
    assertRouteExists('vault', '/vault');
    assertRouteLayout('vault');
  });

  it('has a route named "editor"', () => {
    // assert
    assertRouteExists('editor', '/editor');
    assertRouteLayout('editor');
  });
});
