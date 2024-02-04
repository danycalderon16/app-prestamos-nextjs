"use client";


import React, { createContext, useContext, useState } from "react";

interface LoansContextInterface {
  onToggle:() => void;
  toggle: boolean;
}

const initialState: LoansContextInterface = {
  onToggle: () => {},
  toggle: false,
};

export const LoansContext = createContext(initialState);

const LoansContextProvider = ({ children }: React.PropsWithChildren) => {
  const [toggle, setToggle] = useState<boolean>(false)

  const onToggle = () => {
    setToggle(!toggle)
  }

  return (
    <LoansContext.Provider
      value={{
        onToggle,
        toggle,
      }}
    >
      {children}
    </LoansContext.Provider>
  );
};

export default LoansContextProvider;