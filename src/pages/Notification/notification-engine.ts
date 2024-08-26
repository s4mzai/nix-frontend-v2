export class Notification {
  static notify = window.Notification;

  public static isPermissionGranted() {
    if (!Notification.isSupported()) {
      throw new Error("Notification API is not supported");
    }
    return Notification.notify.permission === "granted";
  }

  public static async requestPermission() {
    if (!Notification.isSupported()) {
      throw new Error("Notification API is not supported");
    }
    const permission = await Notification.notify.requestPermission();
    console.log("Notification API permission", permission);
    return permission;
  }

  public static constructNotification(
    title: string,
    options: NotificationOptions,
  ) {
    return new Notification.notify(title, options);
  }

  public static isSupported() {
    return Notification.notify !== undefined;
  }

  public static async displayNotification(
    title: string,
    options: NotificationOptions,
  ) {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      Notification.constructNotification(title, options);
    } else {
      console.error("Permission denied");
    }
  }
}

export class BgService {
  static bg = window.navigator;

  public static isSupported() {
    return BgService.bg !== undefined;
  }

  public static async registerServiceWorker(swPath: string) {
    const registration = await BgService.bg.serviceWorker.register(swPath);
    console.log("Service worker registered", registration);
    return registration;
  }

  public static async unregisterServiceWorker() {
    const registrations = await BgService.bg.serviceWorker.getRegistrations();
    registrations.forEach((registration) => registration.unregister());
  }

  public static async getRegistration() {
    const registration = await BgService.bg.serviceWorker.getRegistration();
    return registration;
  }
}
