import AppShell from '@/components/app-shell';

export default function GuidanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
