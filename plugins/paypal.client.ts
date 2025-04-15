export default defineNuxtPlugin(() => {
  const PAYPAL_CLIENT_ID = 'AWYVz_gYyrMNpqodbv62TGqfp09WT21lsd_10UPzUuwzWS2DI01eQpANsUNGLXhOSy775nHZzwfiU9Fq'

  if (process.client) {
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=EUR`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
})
