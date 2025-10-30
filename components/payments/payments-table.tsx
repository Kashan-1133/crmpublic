'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import type { PaymentEntry, PaymentStatus } from './payments-client';
import { usePayments } from './payments-provider';

interface PaymentsTableProps {
    onEditClick: (payment: PaymentEntry) => void;
}

const statusVariantMap: Record<PaymentStatus, { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
    'Pending': { variant: 'secondary', className: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' },
    'Advance Received': { variant: 'secondary', className: 'bg-blue-600/20 text-blue-400 border-blue-600/30' },
    'Mini Remain': { variant: 'secondary', className: 'bg-orange-600/20 text-orange-400 border-orange-600/30' },
    'Completed': { variant: 'secondary', className: 'bg-green-600/20 text-green-400 border-green-600/30' },
};


export function PaymentsTable({ onEditClick }: PaymentsTableProps) {
  const { payments, updatePayment } = usePayments();

  const markAsCompleted = (payment: PaymentEntry) => {
    updatePayment({ ...payment, status: 'Completed', remainingAmount: 0 });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>
          View and manage all campaign-related transactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Brand Name</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                        No payment records found.
                    </TableCell>
                </TableRow>
            ) : (
                payments.map((payment) => {
                    const statusInfo = statusVariantMap[payment.status];
                    return (
                        <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.userName}</TableCell>
                            <TableCell>{payment.brandName}</TableCell>
                            <TableCell>${payment.totalAmount.toLocaleString()}</TableCell>
                            <TableCell>${payment.advanceAmount.toLocaleString()}</TableCell>
                            <TableCell>${payment.remainingAmount.toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge
                                variant={statusInfo.variant}
                                className={cn(statusInfo.className)}
                                >
                                {payment.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{payment.dueDate}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => onEditClick(payment)}>View Details</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => markAsCompleted(payment)}>Mark as Complete</DropdownMenuItem>
                                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    );
                })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
