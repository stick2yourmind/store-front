import type { Metadata } from 'next';
import './globals.css';
import { brunoAceSc } from '@/lib/fonts';
import TanStackProvider from '@/lib/tan-stack-provider';
import Toast from '@/lib/toast';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Edge store',
  description: 'Fashion accessories for women and men',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${brunoAceSc.className} relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 lg:px-8`}
      >
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          <Toast />
        </TanStackProvider>
      </body>
    </html>
  );
}
