'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaymentsTable } from './payments-table';
import { PlusCircle, Trash2, CreditCard } from 'lucide-react';
import { usePayments } from './payments-provider';
import { EditPaymentDialog } from './edit-payment-dialog';

export type PaymentStatus = 'Pending' | 'Completed' | 'Mini Remain' | 'Advance Received';

export type PaymentEntry = {
    id: string;
    userName: string;
    brandName: string;
    totalAmount: number;
    advanceAmount: number;
    remainingAmount: number;
    dueDate: string;
    status: PaymentStatus;
};

const savedCardsData = [
    { id: 'card-1', brand: 'Visa', last4: '4242', expiry: '12/25' },
    { id: 'card-2', brand: 'Mastercard', last4: '5555', expiry: '08/26' },
];

export function PaymentsClient() {
  const { payments, addPayment } = usePayments();
  const [userName, setUserName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [totalAmount, setTotalAmount] = useState<number | ''>('');
  const [advanceAmount, setAdvanceAmount] = useState<number | ''>('');
  const [dueDate, setDueDate] = useState('');
  const [savedCards, setSavedCards] = useState(savedCardsData);
  
  const [selectedPayment, setSelectedPayment] = useState<PaymentEntry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const remainingAmount = useMemo(() => {
    const total = typeof totalAmount === 'number' ? totalAmount : 0;
    const advance = typeof advanceAmount === 'number' ? advanceAmount : 0;
    return total - advance;
  }, [totalAmount, advanceAmount]);

  const handleSavePayment = () => {
    if (userName && brandName && totalAmount && dueDate) {
      let status: PaymentStatus = 'Pending';
      if (remainingAmount <= 0) {
        status = 'Completed';
      } else if (advanceAmount > 0) {
        status = 'Advance Received';
      }

      const newPayment: PaymentEntry = {
        id: `pay-${Date.now()}`,
        userName,
        brandName,
        totalAmount: typeof totalAmount === 'number' ? totalAmount : 0,
        advanceAmount: typeof advanceAmount === 'number' ? advanceAmount : 0,
        remainingAmount,
        dueDate,
        status,
      };
      addPayment(newPayment);

      // Reset form
      setUserName('');
      setBrandName('');
      setTotalAmount('');
      setAdvanceAmount('');
      setDueDate('');
    }
  };

  const removeCard = (cardId: string) => {
    setSavedCards(cards => cards.filter(card => card.id !== cardId));
  }

  const handleEditClick = (payment: PaymentEntry) => {
    setSelectedPayment(payment);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Manage your transactions and payment methods.</p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Manage Saved Cards</CardTitle>
          <CardDescription>Add or remove your saved payment methods for quick and easy transactions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {savedCards.map(card => (
                <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">{card.brand} ending in {card.last4}</p>
                            <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeCard(card.id)}>
                        <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                </div>
            ))}
             <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Card
            </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Payment</CardTitle>
          <CardDescription>Enter the details for a new payment record.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="user-name">User Name</Label>
              <Input id="user-name" value={userName} onChange={e => setUserName(e.target.value)} placeholder="e.g., Charli D'Amelio" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input id="brand-name" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g., Nike" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total-amount">Total Amount</Label>
              <Input id="total-amount" type="number" value={totalAmount} onChange={e => setTotalAmount(Number(e.target.value))} placeholder="$5000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="advance-amount">Advance Received Amount</Label>
              <Input id="advance-amount" type="number" value={advanceAmount} onChange={e => setAdvanceAmount(Number(e.target.value))} placeholder="$2500" />
            </div>
          </div>
           <div className="space-y-2">
              <Label htmlFor="remaining-amount">Remaining Amount</Label>
              <Input id="remaining-amount" type="number" value={remainingAmount} readOnly disabled className="bg-muted" />
            </div>
          <div className="space-y-4 pt-4">
             <h4 className="font-semibold">Enter the date by which you expect your client to complete the payment.</h4>
             <div className="space-y-2">
                <Label htmlFor="due-date">Date</Label>
                <Input id="due-date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
             </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSavePayment}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Save Payment
          </Button>
        </CardFooter>
      </Card>

      <PaymentsTable onEditClick={handleEditClick} />
      <EditPaymentDialog
        payment={selectedPayment}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
}
