import { Analytics } from "@/components/dashboard/analytics";
import { Pipeline } from "@/components/dashboard/pipeline";
import { RecentPosts } from "@/components/dashboard/recent-posts";
import { BrandCampaigns } from "@/components/dashboard/brand-campaigns";
import { PaymentsProvider } from "@/components/payments/payments-provider";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Your central hub for a complete overview of your creator activities.
        </p>
      </div>
      <RecentPosts />
      <BrandCampaigns />
      <PaymentsProvider>
        <Analytics />
      </PaymentsProvider>
      <Pipeline />
    </div>
  );
}
