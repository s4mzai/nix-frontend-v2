export type Update = "Added" | "Removed" | "Modified" | "Unchanged" | "Inherit";

export interface TabUpdate {
  title: string;
  data: DataUpdate[];
  update: Update;
}

export interface LinkNodeUpdate {
  title: string;
  link: Link;
  update: Update;
}

export interface DataUpdate {
  title: string;
  link?: Link;
  children: LinkNodeUpdate[];
  date?: string;
  update: Update;
}

export type InformationUpdate = TabUpdate[];

type Link = string;

export interface INotification {
  _id: string;
  data: ClientNotification;
  updated_at: string;
}

export interface ClientNotification {
  title: string;
  description: string;
  actions: ClientNotificationAction[];
  link?: string;
}

export interface ClientNotificationAction {
  action: string;
  link: string;
}
