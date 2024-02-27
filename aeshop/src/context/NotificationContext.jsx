import React, { createContext, useEffect, useState } from 'react';

export const NotificationContext = createContext(null);

function NotificationContextProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const setNotification = (messages) => {
    setNotifications((prev) => [...prev, ...messages]);
  };

  const contextValue = {
    notifications,
    setNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
