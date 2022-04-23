import './global.css';

import App from './App.svelte';

function getHash() {
	return window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "Hypixel Skyblock Auction Service";
}

const app = new App({
	target: document.body,
	props: {
		title: getHash()
	}
});
document.title = getHash();


window.onhashchange = () => {
	app.$set({title:getHash()})
	document.title = getHash();
}

export default app;
