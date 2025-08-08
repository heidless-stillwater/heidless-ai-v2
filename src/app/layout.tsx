import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Lato, Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700', '800'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'heidless ai',
  description: 'AI-powered digital agency.',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 3000,
    initialScale: 1.0,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn('font-body antialiased min-h-screen flex flex-col', montserrat.variable, lato.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
