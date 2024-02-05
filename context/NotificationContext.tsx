"use client";

import React, { createContext, useEffect, useState } from "react";
import { string } from "zod";

interface NotificationsContextInterface {
  show: boolean;
  message: string;  
  type: "success"|"error";
  // snackbar: ({message: string,type:string,time:number}) => void;
  snackBar: ({
    message,
    type,
    time,
  }: {
    message: string;
    type: "success"|"error";
    time: number;
  }) => void;
}

const initialState: NotificationsContextInterface = {
  show: false,
  message:"",
  type:"success",
  snackBar: ({ message, type, time }) => {},
};

export const NotificationsContext = createContext(initialState);

const NotificationsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"success"|"error">("success");
  const [time, setTime] = useState(3000)

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
  }: {
    message: string;
    type: "success"|"error";
    time: number;
  }) => {
    setShow(true);
    setTime(time);
    setType(type);
    setMessage(message);  
  };

  return (
    <NotificationsContext.Provider
      value={{
        show,
        message,
        type,
        snackBar,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
