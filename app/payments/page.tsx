import { PaymentsClient } from "@/components/payments/payments-client";
import { PaymentsProvider } from "@/components/payments/payments-provider";

export default function PaymentsPage() {
    return (
        <PaymentsProvider>
            <PaymentsClient />
        </PaymentsProvider>
    );
}
