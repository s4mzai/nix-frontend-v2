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
    /** @type {PushSubscriptionOptions} */
    const options = {
      applicationServerKey:
        "BCOsRaxpJeR0KyIPIg1rHx3pUtWVsGDGOxH65dDkqyU5ycF-CjPJxuqiXF4M0LpUMG_rk_YxSZX34uHbrV5umJQ",
      userVisibleOnly: true,
    };
    console.log("Hello from service worker second time");

    const subscription =
      await service_worker.registration.pushManager.subscribe(options);

    let subscribe_json = subscription.toJSON();
    console.log("Subscription", subscribe_json);

    const body = JSON.stringify(subscribe_json);

    await fetch("https://team-dev.dtutimes.com/api/v1/notification/subscribe", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then(console.log)
      .catch(console.error);
  } catch (err) {
    console.log("Error", err);
  }
});

service_worker.addEventListener("push", function (event) {
  if (event.data) {
    console.log(event.data.text());
    pushNotification("Hi", event.data.text(), service_worker.registration);
  } else {
    console.log("No data!");
  }
});

/**
 * @param title {string}
 * @param body {string}
 * @param swRegistration {ServiceWorkerRegistration}
 */
const pushNotification = (title, body, swRegistration) => {
  const options = {
    body,
  };
  swRegistration.showNotification(title, options);
};
