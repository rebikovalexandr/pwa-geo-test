if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/pwa-geo-test/sw.js', { scope: '/pwa-geo-test/' })})}