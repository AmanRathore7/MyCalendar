let cacheData = "offlineApp";

this.addEventListener("install", (event)=>{

  event.waitUntil(
    caches.open(cacheData).then((cache)=>{
      cache.addAll(
        [
          "/static/js/bundle.js",
          "/index.html",
          "/"
        ]
      )
    })
  )
})

this.addEventListener("fetch", (event)=>{
  
  // event.waitUntil(
  //   this.registration.showNotification("Reminder",{
  //     body: 'Hello guys event start'
  //   })
  // );

  if(!navigator.onLine){
    console.log(event);
    event.respondWith(
      caches.match(event.request).then((result)=>{
        if(result){
          return result;
        }
      })
    )
  }
  
})