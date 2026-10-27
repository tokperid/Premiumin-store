import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Premiumin Ajaaa - Akun Premium Terpercaya',
  description: 'Akun premium streaming & music dengan harga terjangkau. Full garansi & pengiriman manual via WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {children}
      </body>
    </html>
  );
}