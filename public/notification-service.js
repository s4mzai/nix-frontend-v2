/// <reference lib="webworker" />

/** @type {ServiceWorkerGlobalScope} */
const service_worker = self;

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

    await fetch("https://team.dtutimes.com/api/v1/notification/subscribe", {
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
  const data = event.data.json();
  if (data) {
    pushNotification(
      data.title,
      {
        icon: "https://dtutimes.com/favicon.ico",
        body: data.body,
      },
      service_worker.registration,
    );
  } else {
    console.log("No data!");
  }
});

/**
 * @param title {string}
 * @param options {NotificationOptions}
 * @param swRegistration {ServiceWorkerRegistration}
 */
const pushNotification = (title, options, swRegistration) => {
  console.log("Push Notification", title, options);
  swRegistration.showNotification(title, options);
};

service_worker.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    service_worker.clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (
            client.url === "https://team.dtutimes.com/notification" &&
            "focus" in client
          )
            return client.focus();
        }
        if (service_worker.clients.openWindow)
          return service_worker.clients.openWindow("/notification");
      }),
  );
});
