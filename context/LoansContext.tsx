"use client";

import { Loan } from "@/interfaces/loans";
import { UserLoan } from "@/interfaces/userLoan";
import React, { createContext, useState } from "react";
import { number } from "zod";

interface LoansContextInterface {
  onToggle: () => void;
  toggle: boolean;
  id: string;
  saveId: (id: string) => void;
  currentLoan:Loan
  saveLoan: (loan: Loan) => void;
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

const  INITIALSTATELOAN:Loan = {
  abonado:0,
  abonos:0,
  cantidadPrestada:0,
  fecha:"",
  id:0,
  monto:0,
  nombre:"",
  plazos:0,
  saldo:0,
  tipo: "Quincenal",
}

const initialState: LoansContextInterface = {
  onToggle: () => {},
  toggle: false,
  saveId: () => {},
  id: "",
  stats: INITIALSTATESTATS,
  saveStats: (stats) => {},
  currentLoan: INITIALSTATELOAN,
  saveLoan: (loan) => {},
};

export const LoansContext = createContext(initialState);

const LoansContextProvider = ({ children }: React.PropsWithChildren) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [stats, setStats] = useState<UserLoan>(INITIALSTATESTATS);
  const [currentLoan, setCurrentLoan] = useState<Loan>(INITIALSTATELOAN);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const saveId = (id: string) => {
    setId(id);
  };

  const saveLoan = (loan: Loan) => {
    setCurrentLoan(loan);
  }

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
        stats,
        saveStats,
        currentLoan,
        saveLoan
      }}
    >
      {children}
    </LoansContext.Provider>
  );
};

export default LoansContextProvider;
