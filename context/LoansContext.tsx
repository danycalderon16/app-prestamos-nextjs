"use client";

import React, { createContext, useState } from "react";

interface LoansContextInterface {
  onToggle:() => void;
  toggle: boolean;
  id:string;
  saveId: (id:string) => void
}

const initialState: LoansContextInterface = {
  onToggle: () => {},
  toggle: false,
  saveId: () => {},
  id:""
};

export const LoansContext = createContext(initialState);

const LoansContextProvider = ({ children }: React.PropsWithChildren) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  
  const onToggle = () => {
    setToggle(!toggle)
  }

  const saveId = (id:string) => {
    setId(id);
  }

  return (
    <LoansContext.Provider
      value={{
        onToggle,
        toggle,
        saveId,
        id
      }}
    >
      {children}
    </LoansContext.Provider>
  );
};

export default LoansContextProvider;