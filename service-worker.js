importScripts("/dankRacer/precache-manifest.bbdae5e35ceac1e8dbf4b7b1f9d675a3.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable */
workbox.setConfig({
  debug: true
})

workbox.core.skipWaiting()
workbox.core.clientsClaim()
console.log('ehere2')

workbox.routing.registerRoute(
  new RegExp('https:.*.(css|js)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-cache'
  })
) // external assets
console.log('ehere3')

workbox.routing.registerRoute(new RegExp('https:.*api.*'), workbox.strategies.networkFirst()) // api JSON
console.log('ehere4')

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
console.log('ehere5')

console.log(workbox.precaching.getCacheKeyForURL('/index.html'))

workbox.routing.registerNavigationRoute(
  // Assuming '/index.html' has been precached,
  // look up its corresponding cache key.
  workbox.precaching.getCacheKeyForURL('/index.html')
)

