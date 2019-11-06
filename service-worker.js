importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
	workbox.setConfig({ debug: false });
	workbox.routing.registerRoute(
		/\.css$/,
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: "css-cache"
		})
	);
	workbox.routing.registerRoute(
		/\.js$/,
		new workbox.strategies.NetworkFirst({
			cacheName: "js-cache"
		})
	);
	workbox.routing.registerRoute(
		/\.(?:png|jpg|jpeg|svg|gif)$/,
		new workbox.strategies.CacheFirst({
			cacheName: "image-cache",
			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 50,
					maxAgeSeconds: 30 * 24 * 60 * 60
				})
			]
		})
	);
} else {
	console.log(`Workbox didn't load`);
}
