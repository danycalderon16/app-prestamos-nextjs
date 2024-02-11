"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { UserLoan } from "@/interfaces/userLoan";
import { getStats } from "@/actions/get-Stats";
import useLoans from "@/hooks/useLoans";

interface StatsModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const INITIALSTATESTATS = {
  email: "",
  id: "",
  total: 0,
  nombre: "",
  totalCompletado: 0,
  totalRecuperar: 0,
  totalGanar: 0,
};

export const StatsModal: React.FC<StatsModalProps> = ({
  title,
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { id } = useLoans();

  const [stats, setstats] = useState<UserLoan>(INITIALSTATESTATS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    getStats(id)
      .then((res) => {
        setstats(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-2">
            <span>Total a recuperar</span>
            <span className="font-bold">
              {stats.totalRecuperar.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </span>
            <span>Total a ganar</span>
            <span className="font-bold">
              {stats.totalGanar.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </span>
            <span>Total</span>
            <span className="font-bold">
              {stats.total.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </span>
          </div>

          <Button variant="default" onClick={onClose} className="w-full mt-4">
            Cerrar
          </Button>
        </div>
      )}
    </Modal>
  );
};
