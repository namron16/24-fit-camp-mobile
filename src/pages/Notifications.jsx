import React, { useState } from "react";
import usePageTransition from "../utils/usePageTransition";
import Loading from "../loading/Loading";
import './notification.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { isPending, showContent } = usePageTransition(100);
  if (!showContent || isPending) return <Loading />;
  return (
    <section className="member-notifications">
      <h1>Notifications</h1>
      {notifications.length > 0 ? (
        <div className="notifications-container">
          <div className="notification">hello, there</div>
        </div>
      ) : (
        <div className="no-notifications">
          <p>No notifications yet</p>
        </div>
      )}
    </section>
  );
};

export default Notifications;
