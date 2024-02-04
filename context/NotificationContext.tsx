"use client";

import React, { createContext, useEffect, useState } from "react";

interface NotificationsContextInterface {
  show: boolean;
  snackbar: (message: string) => void;
}

const initialState: NotificationsContextInterface = {
  show: false,
  snackbar: (message: string) => {},
};

export const NotificationsContext = createContext(initialState);

const NotificationsContextProvider = ({ children }: React.PropsWithChildren) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    },3000)
  },[show])

  const snackbar = (message: string) => {
    setShow(true);
  }

  return (
    <NotificationsContext.Provider
      value={{
       show,
       snackbar
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;