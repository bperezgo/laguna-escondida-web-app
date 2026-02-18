import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BIHcXTut.mjs';
import { manifest } from './manifest_BN-TZHWC.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/analytics.astro.mjs');
const _page2 = () => import('./pages/api/newsletter.astro.mjs');
const _page3 = () => import('./pages/api/reserva.astro.mjs');
const _page4 = () => import('./pages/contenido/categoria/_slug_.astro.mjs');
const _page5 = () => import('./pages/contenido/_slug_.astro.mjs');
const _page6 = () => import('./pages/contenido.astro.mjs');
const _page7 = () => import('./pages/reservas/formulario.astro.mjs');
const _page8 = () => import('./pages/reservas/galeria.astro.mjs');
const _page9 = () => import('./pages/reservas/paquetes.astro.mjs');
const _page10 = () => import('./pages/reservas.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/api/analytics.ts", _page1],
    ["src/pages/api/newsletter.ts", _page2],
    ["src/pages/api/reserva.ts", _page3],
    ["src/pages/contenido/categoria/[slug].astro", _page4],
    ["src/pages/contenido/[slug].astro", _page5],
    ["src/pages/contenido/index.astro", _page6],
    ["src/pages/reservas/formulario.astro", _page7],
    ["src/pages/reservas/galeria.astro", _page8],
    ["src/pages/reservas/paquetes.astro", _page9],
    ["src/pages/reservas/index.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/dist/client/",
    "server": "file:///Users/bryanperez/Documents/me/dev/laguna-escondida-web-app/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
