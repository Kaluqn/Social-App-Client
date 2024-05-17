import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'SocialApp',
  description: 'Social App'
}

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={poppins.variable}>
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
