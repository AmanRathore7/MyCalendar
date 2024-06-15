export default function swDev(){

  function generateAppServerKey(){
    const vapidPublicKey = "BBvvID0Pogoec1draH3-ZjsNxo_ZK9eQMV0AcCTzSvT9vSfZoZ6opJSifl7lvnux25h5gDXTziPuuNFlPvzhGVE";
    return urlBase64ToUnit8Array(vapidPublicKey);
  }

  function urlBase64ToUnit8Array(base64String){
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for(let i = 0; i < rawData.length ; ++i){
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  let swURL = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swURL).then((response)=>{
    // console.warn('response: ',response);
    response.pushManager.subscribe({
      userVisibleOnly:true,
      applicationServerKey: generateAppServerKey()
    })
  })
}