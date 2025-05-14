import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Corrected: Import GeistSans from geist/font/sans
import './globals.css';
import { Providers } from '@/components/Providers';
import { Toaster } from "@/components/ui/toaster";

// The GeistSans object from 'geist/font/sans' directly provides the .variable property.
// No need to call it as a function like with next/font/google.

export const metadata: Metadata = {
  title: 'StudyVerse Reimagined',
  description: 'Your favorite virtual study hall, back and better than ever.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} antialiased`}>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
