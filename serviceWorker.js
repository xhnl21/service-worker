let self = this;
const cacheVersion = 'v2';

const cacheAsset = [
		'index.html'
	];

// Call Install Event
self.addEventListener('install',  e => {
	console.log('Service Worker: Install')
	e.waitUntil(
		caches
			.open(cacheVersion)	
			.then( cache => {
				console.log('Service Worker: Caching Files')
				cache.addAll(cacheAsset)
				// cache.put(cacheAsset, new Response(Math.random()))
			})
			.then( () => self.skipWaiting())
	);
});

// Call Active Event 
self.addEventListener('activate',  e => {
	console.log('Service Worker: Activated')
	e.waitUntil(
		caches.keys()	
			.then( cacheVersions => {
				return Promise.all(
					cacheVersions.map( cache => {
						if(cache !== cacheVersion) {
							console.log('Service Worker: Clearing Old Cache')
							return caches.delete(cache);
						}
					})
				)
			})
			.then( () => self.skipWaiting())
	);	
});