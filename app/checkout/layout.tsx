import AppShell from '@/components/app-shell';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
