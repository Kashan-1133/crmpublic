import AppShell from '@/components/app-shell';

export default function BrandHuntingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
