class Notification {
  static notify = window.Notification;

  public static async requestPermission() {
    if (!Notification.isSupported()) {
      throw new Error("Notification API is not supported");
    }

    const permission = await Notification.notify.requestPermission();
    if (permission !== "granted") {
      throw new Error("Notification permission denied");
    }

    console.log("Notification API permission", permission);
    return permission;
  }

  public static isSupported() {
    return Notification.notify !== undefined;
  }

  public static permissionGranted() {
    return Notification.notify.permission === "granted";
  }
}

class BgService {
  static bg = window.navigator;

  public static isSupported() {
    return (
      BgService.bg !== undefined && BgService.bg.serviceWorker !== undefined
    );
  }

  public static async registerServiceWorker(swPath: string) {
    const registration = await BgService.bg.serviceWorker.register(swPath);
    console.log("Service worker registered", registration);
    return registration;
  }

  public static async unregisterServiceWorker() {
    const registrations = await BgService.getRegistrations();
    registrations.forEach((registration) => registration.unregister());
    return registrations;
  }

  public static async getRegistrations() {
    const registration = await BgService.bg.serviceWorker.getRegistrations();
    console.log("Service worker registered", registration);
    return registration;
  }
}

export function is_supported() {
  return Notification.isSupported() && BgService.isSupported();
}

export async function setup_notification() {
  if (!is_supported()) {
    throw new Error("Notification are not supported");
  }

  await Notification.requestPermission();

  const worker = await BgService.registerServiceWorker(
    "https://team.dtutimes.com/notification-service.js",
  );

  console.log("Service worker registered", worker);
}

export async function disable_notification() {
  await BgService.unregisterServiceWorker();
}

export async function setup_present() {
  const services = await BgService.getRegistrations();
  return Notification.permissionGranted() && services.length > 0;
}
