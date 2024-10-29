import "@/app/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Locale } from "@/i18n/config";
import { Toaster } from "@/components/ui/toaster"
import { getMessages } from 'next-intl/server';
import ResultToaster from '@/components/result-toaster';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type Props = {
  children: ReactNode
  locale: Locale
}

export default async function BaseLayout({
  children,
  locale,
}: Props) {

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <main className="flex flex-col min-h-dvh">
              {children}
              <ResultToaster />
            </main>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
