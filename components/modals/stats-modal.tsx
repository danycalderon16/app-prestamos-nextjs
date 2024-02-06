"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import useLoans from "@/hooks/useLoans";

interface StatsModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  title,
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const {stats} = useLoans()

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="grid grid-cols-2 gap-2">
          <span>Total a recuperar</span>
          <span className="font-bold">{stats.totalRecuperar.toLocaleString('es-MX',{style:"currency", currency:"MXN"})}</span>
          <span>Total a ganar</span>
          <span className="font-bold">{stats.totalGanar.toLocaleString('es-MX',{style:"currency", currency:"MXN"})}</span>
          <span>Total</span>
          <span className="font-bold">{stats.total.toLocaleString('es-MX',{style:"currency", currency:"MXN"})}</span>
        </div>

        <Button variant="default" onClick={onClose} className="w-full mt-4">
          Cerrar
        </Button>
      </div>
    </Modal>
  );
};
