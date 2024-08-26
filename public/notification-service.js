/// <reference lib="webworker" />

/** @type {ServiceWorkerGlobalScope} */
const service_worker = self;

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  const outputData = outputArray.map((output, index) =>
    rawData.charCodeAt(index),
  );

  return outputData;
}

service_worker.addEventListener("activate", async () => {
  console.log("Hello from service worker");
  try {
    /** @type {PushSubscriptionOptionsInit} */
    const options = {
      applicationServerKey:
        "BCOsRaxpJeR0KyIPIg1rHx3pUtWVsGDGOxH65dDkqyU5ycF-CjPJxuqiXF4M0LpUMG_rk_YxSZX34uHbrV5umJQ",
      userVisibleOnly: true,
    };
    console.log("Hello from service worker second time");

    const subscription =
      await service_worker.registration.pushManager.subscribe(options);

    console.log("Subscription", subscription);
    console.log(JSON.stringify(subscription));
  } catch (err) {
    console.log("Error", err);
  }
});
