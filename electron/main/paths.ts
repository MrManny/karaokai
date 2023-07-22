import { join } from 'node:path';

process.env.DIST_ELECTRON = join(__dirname, '..');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

export const preload = join(__dirname, '../preload/index.js');
export const url = process.env.VITE_DEV_SERVER_URL;
export const indexHtml = join(process.env.DIST, 'index.html');
