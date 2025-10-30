import AppShell from '@/components/app-shell';

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
