import { clientsClaim, skipWaiting } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST || []);

skipWaiting();
clientsClaim();

self.addEventListener('message', (event) => {
    console.log('message', event.data.coords);
})