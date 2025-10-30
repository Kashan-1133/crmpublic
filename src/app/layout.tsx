import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';
import { CustomThemeProvider } from '@/components/custom-theme-provider';
import { PostsProvider } from '@/components/posts/posts-provider';

export const metadata: Metadata = {
  title: 'Creator Collaboration Manager',
  description: 'Manage your TikTok collaborations seamlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <CustomThemeProvider>
          <PostsProvider>
            {children}
            <Toaster />
          </PostsProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
