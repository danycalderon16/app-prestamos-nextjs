"use client";

import React, { createContext, useEffect, useState } from "react";

interface NotificationsContextInterface {
  show: boolean;
  message: string;  
  type: "success"|"error";
  action: { href: string; text: string; } | undefined;
  // snackbar: ({message: string,type:string,time:number}) => void;
  snackBar: ({
    message,
    type,
    time,
  }: {
    message: string;
    type: "success"|"error";
    time: number;
    action?: {
      href: string,
      text: string,
    }
  }) => void;
}

const initialState: NotificationsContextInterface = {
  show: false,
  message:"",
  type:"success",
  action: undefined,
  snackBar: ({ message, type, time, action }) => {},
};

export const NotificationsContext = createContext(initialState);

const NotificationsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"success"|"error">("success");
  const [time, setTime] = useState(3000)
  const [action, setAction] = useState<{ href: string; text: string; } | undefined>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [show, time]);

  const snackBar = ({
    message,
    type,
    time,
    action
  }: {
    message: string;
    type: "success"|"error";
    time: number;
    action?: {
      href: string,
      text: string,
    }
  }) => {    
    setShow(true);
    setTime(time);
    setType(type);
    setMessage(message);  
    setAction(action);
  };

  return (
    <NotificationsContext.Provider
      value={{
        show,
        message,
        type,
        action,
        snackBar,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
