'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { PaymentEntry } from './payments-client';

interface PaymentsContextType {
  payments: PaymentEntry[];
  addPayment: (payment: PaymentEntry) => void;
  updatePayment: (payment: PaymentEntry) => void;
}

const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);

export const PaymentsProvider = ({ children }: { children: ReactNode }) => {
  const [payments, setPayments] = useState<PaymentEntry[]>([]);

  const addPayment = (payment: PaymentEntry) => {
    setPayments(prevPayments => [payment, ...prevPayments]);
  };

  const updatePayment = (updatedPayment: PaymentEntry) => {
    setPayments(prevPayments =>
      prevPayments.map(p => (p.id === updatedPayment.id ? updatedPayment : p))
    );
  };

  return (
    <PaymentsContext.Provider value={{ payments, addPayment, updatePayment }}>
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error('usePayments must be used within a PaymentsProvider');
  }
  return context;
};
