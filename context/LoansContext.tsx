"use client";

import { UserLoan } from "@/interfaces/userLoan";
import React, { createContext, useState } from "react";
import { number } from "zod";

interface LoansContextInterface {
  onToggle: () => void;
  toggle: boolean;
  id: string;
  saveId: (id: string) => void;
  // loans: number;
  // countLoans: (quantity: number) => void;
  stats: UserLoan;
  saveStats: (stats: UserLoan) => void;
}

const INITIALSTATESTATS = {
  email: "",
  id: "",
  total: 0,
  nombre: "",
  totalCompletado: 0,
  totalRecuperar: 0,
  totalGanar: 0,
}

const initialState: LoansContextInterface = {
  onToggle: () => {},
  toggle: false,
  saveId: () => {},
  id: "",
  // loans: 0,
  // countLoans: () => {},
  stats: INITIALSTATESTATS,
  saveStats: (stats) => {},
};

export const LoansContext = createContext(initialState);

const LoansContextProvider = ({ children }: React.PropsWithChildren) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [loans, setLoans] = useState<number>(0);
  const [stats, setStats] = useState<UserLoan>(INITIALSTATESTATS);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const saveId = (id: string) => {
    setId(id);
  };

  // const countLoans = (quantity: number) => {
  //   setLoans(quantity);
  // };

  const saveStats = (stats: UserLoan) => {
    setStats(stats);
  };
  return (
    <LoansContext.Provider
      value={{
        onToggle,
        toggle,
        saveId,
        id,
        // loans,
        // countLoans,
        stats,
        saveStats,
      }}
    >
      {children}
    </LoansContext.Provider>
  );
};

export default LoansContextProvider;
