import '@feltcoop/gro/dist/client/devtools.js';

import App from 'src/App.svelte';

const root_el_id = 'root';
const root = document.getElementById(root_el_id);
if (!root) throw Error(`Cannot find app target element with id '${root_el_id}'`);

export const app = new App({
	target: root,
	props: {},
});

(window as any).app = app;

// fixes the browser back/forward buttons for reasons
window.onhashchange = () => {
	if (window.location.hash) window.location.href = window.location.href;
};
