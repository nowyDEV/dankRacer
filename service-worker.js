importScripts("/dankRacer/precache-manifest.af975d235e1414a9d3090f54a993dfe0.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable */
workbox.setConfig({
  debug: true
})

workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('https:.*.(css|js)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-cache'
  })
) // external assets

workbox.routing.registerRoute(new RegExp('https:.*api.*'), workbox.strategies.networkFirst()) // api JSON

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerNavigationRoute(
  // Assuming '/index.html' has been precached,
  // look up its corresponding cache key.
  workbox.precaching.getCacheKeyForURL('index.html')
)

