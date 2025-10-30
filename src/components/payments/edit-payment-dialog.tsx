'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PaymentEntry } from './payments-client';
import { usePayments } from './payments-provider';

interface EditPaymentDialogProps {
  payment: PaymentEntry | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function EditPaymentDialog({
  payment,
  isOpen,
  onOpenChange,
}: EditPaymentDialogProps) {
  const { updatePayment, addPayment } = usePayments();
  const [secondPayment, setSecondPayment] = useState<number | ''>('');

  useEffect(() => {
    // Reset second payment when a new payment is selected
    setSecondPayment('');
  }, [payment]);

  const newRemainingAmount = useMemo(() => {
    if (!payment) return 0;
    const currentRemaining = payment.remainingAmount;
    const second = typeof secondPayment === 'number' ? secondPayment : 0;
    return currentRemaining - second;
  }, [payment, secondPayment]);
  
  const handleUpdatePayment = () => {
    if (payment) {
      const updatedPayment: PaymentEntry = {
        ...payment,
        remainingAmount: newRemainingAmount,
        advanceAmount: payment.advanceAmount + (typeof secondPayment === 'number' ? secondPayment : 0),
      };

      if (updatedPayment.remainingAmount <= 0) {
        updatedPayment.status = 'Completed';
        updatedPayment.remainingAmount = 0;
      } else if (updatedPayment.remainingAmount < 5000) {
        updatedPayment.status = 'Mini Remain';
      } else {
        updatedPayment.status = 'Pending';
      }
      
      updatePayment(updatedPayment);
      onOpenChange(false);
    }
  };

  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Payment for {payment.userName}</DialogTitle>
          <DialogDescription>
            Update the payment details for the campaign with {payment.brandName}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="remaining-amount">Current Remaining Amount</Label>
            <Input
              id="remaining-amount"
              type="number"
              value={payment.remainingAmount.toFixed(2)}
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="second-payment">Second Payment Received</Label>
            <Input
              id="second-payment"
              type="number"
              value={secondPayment}
              onChange={(e) => setSecondPayment(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g., 1000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-remaining">New Remaining Amount</Label>
            <Input
              id="new-remaining"
              type="number"
              value={newRemainingAmount.toFixed(2)}
              readOnly
              disabled
              className="bg-muted font-bold"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleUpdatePayment}>Update Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
