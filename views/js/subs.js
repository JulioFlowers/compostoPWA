
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
    }

const PUBLIC_VAPID_KEY = "BA4RjxcqJAT_rl_a3pKfo8gWG510LLSZJPs_7_6spkDw3XupGFs_xpSU-dj2X2ZOJDFk3OvJshRljB-k1og4J_U"

const subscription = async () => {
// Service Worker

const sw = await navigator.serviceWorker.getRegistration()

// Listen Push Notifications
console.log("Listening Push Notifications");
const subs = await sw.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
});

console.log(subs);

// Send Notification
await fetch('/subs', {
  method: "POST",
  body: JSON.stringify(subs),
  headers: {
    "Content-Type": "application/json"
  }
});
console.log("Subscribed!");
};

subscription()