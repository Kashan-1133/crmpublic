import AppShell from '@/components/app-shell';

export default function MyPostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
