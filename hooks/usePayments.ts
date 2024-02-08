import React, { useContext } from 'react'
import { PaymentsContext } from '@/context/PaymentsContext';

export default function usePayments() {
  return useContext(PaymentsContext);
}
