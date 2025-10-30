'use client';

import { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard,
  Loader2,
  CheckCircle,
  AlertCircle,
  Wallet,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export function PaymentForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [selectedProvider, setSelectedProvider] = useState('card');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('processing');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate a random success or error outcome
    const isSuccess = Math.random() > 0.3;

    if (isSuccess) {
      setStatus('success');
      toast({
        title: 'Payment Successful!',
        description: 'Your payment has been processed.',
        variant: 'default',
      });
    } else {
      setStatus('error');
      toast({
        title: 'Payment Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center space-y-4 min-h-[250px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Processing your payment...</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center space-y-4 min-h-[250px]">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="text-xl font-semibold">Payment Successful</h3>
            <p className="text-muted-foreground text-center">
              A receipt has been sent to your email.
            </p>
            <Button onClick={() => setStatus('idle')}>Make Another Payment</Button>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center space-y-4 min-h-[250px]">
            <AlertCircle className="h-16 w-16 text-destructive" />
            <h3 className="text-xl font-semibold">Payment Failed</h3>
            <p className="text-muted-foreground text-center">
              We were unable to process your payment. Please check your details and try
              again.
            </p>
            <Button onClick={() => setStatus('idle')}>Try Again</Button>
          </div>
        );
      case 'idle':
      default:
        return (
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <Tabs
                defaultValue="card"
                className="w-full"
                onValueChange={setSelectedProvider}
              >
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  <TabsTrigger value="stripe">Stripe</TabsTrigger>
                  <TabsTrigger value="easypaisa">Easypaisa</TabsTrigger>
                  <TabsTrigger value="jazzcash">JazzCash</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-holder">Cardholder Name</Label>
                    <Input
                      id="card-holder"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="card-number"
                        placeholder="•••• •••• •••• ••••"
                        required
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry</Label>
                      <Input id="expiry-date" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="•••" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zip">ZIP</Label>
                        <Input id="zip" placeholder="12345" required />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="paypal" className="mt-6">
                  <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <p>You will be redirected to PayPal to complete your payment.</p>
                  </div>
                </TabsContent>
                <TabsContent value="stripe" className="mt-6">
                  <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                     <p>You will be redirected to Stripe to complete your payment.</p>
                  </div>
                </TabsContent>
                <TabsContent value="easypaisa" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="easypaisa-phone">Easypaisa Account Number</Label>
                     <div className="relative">
                        <Input id="easypaisa-phone" placeholder="03xxxxxxxxx" required />
                        <Wallet className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="jazzcash" className="mt-6 space-y-4">
                   <div className="space-y-2">
                    <Label htmlFor="jazzcash-phone">JazzCash Account Number</Label>
                     <div className="relative">
                        <Input id="jazzcash-phone" placeholder="03xxxxxxxxx" required />
                        <Wallet className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay $25.00
              </Button>
            </CardFooter>
          </form>
        );
    }
  };

  return (
    <div className="space-y-6">
         <div>
          <h1 className="text-3xl font-bold tracking-tight">Secure Checkout</h1>
          <p className="text-muted-foreground">Select a payment method to complete your transaction.</p>
      </div>
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>
                Choose your preferred payment method and enter your details.
            </CardDescription>
            </CardHeader>
            {renderContent()}
        </Card>
    </div>
  );
}
