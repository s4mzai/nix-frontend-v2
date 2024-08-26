import { Spinner } from "@/components/Spinner";
import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";
import { INotification } from "@/types/notification";
import React, { useEffect, useState } from "react";
import {
  setup_notification,
  disable_notification,
  setup_present,
} from "./notification-engine";

interface NotificationCardProps {
  notif: INotification;
}

function NotificationCard({ notif }: NotificationCardProps) {
  const wrap_link = (child: React.ReactNode, link?: string) =>
    link ? (
      <a target="_blank" href={link} rel="noreferrer">
        {child}
      </a>
    ) : (
      child
    );

  return (
    <div
      key={notif._id}
      className="mx-auto bg-gray-50 rounded-md hover:shadow-xl my-4 p-6"
    >
      {wrap_link(
        <>
          <h1 className="text-xl font-semibold text-left">
            {notif.data.title}
          </h1>
          <p className="my-4 text-gray-600">{notif.data.description}</p>
        </>,
        notif.data.link,
      )}

      {notif.data.actions.map((action) => {
        return (
          <a
            target="_blank"
            key={action.action}
            href={action.link}
            className="text-blue-500 underline py-2 mr-2"
            rel="noreferrer"
          >
            {action.action}
          </a>
        );
      })}

      {new Date(notif.updated_at).toLocaleString()}
    </div>
  );
}

export default function NotificationPage() {
  const { setError } = React.useContext(ErrorContext);

  const [notifications, setNotifs] = useState<INotification[]>(null);
  const [status, setStatus] = useState<boolean>(null);

  useEffect(() => {
    setup_present().then(setStatus);

    const notifications = "/notification";
    API.get(notifications)
      .then((response) => {
        const userData = response.data.data;
        setNotifs(userData);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (notifications === null || status === null)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1>Latest Updates</h1>
      <div>
        {status ? (
          <button
            className="ml-2"
            onClick={() => {
              setStatus(null);
              disable_notification().then(setup_present).then(setStatus);
            }}
          >
            Disable Notifications
          </button>
        ) : (
          <button
            className="mr-2"
            onClick={() => {
              setStatus(null);
              setup_notification().then(setup_present).then(setStatus);
            }}
          >
            Get alerts on Notification!
          </button>
        )}
      </div>
      {notifications.map((notif) => {
        return <NotificationCard key={notif._id} notif={notif} />;
      })}
    </div>
  );
}
