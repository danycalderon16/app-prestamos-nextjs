import { LoansContext } from "@/context/LoansContext";
import { useContext } from "react";

export default function useLoans(){
  return useContext(LoansContext);
};
