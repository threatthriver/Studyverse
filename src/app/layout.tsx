import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Studyverse',
  description: 'Your space to study and chill.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} antialiased dark`} suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
