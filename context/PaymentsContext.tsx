"use client";

import React, { createContext, useState } from "react";

interface PaymentsContextInterface {
  onToggle: () => void;
  toggle: boolean;
}


const initialState: PaymentsContextInterface = {
  onToggle: () => {},
  toggle: false,
};

export const PaymentsContext = createContext(initialState);

const PaymentsContextProvider = ({ children }: React.PropsWithChildren) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

 
  return (
    <PaymentsContext.Provider
      value={{
        onToggle,
        toggle,
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};

export default PaymentsContextProvider;
