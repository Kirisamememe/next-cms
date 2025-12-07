import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/i18n";
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import BaseLayout from '@/components/base-layout';


export const metadata: Metadata = {
  title: "NextSpace",
  description: "Modern CMS build with Next.js",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <BaseLayout locale={locale as Locale}>
      {children}
    </BaseLayout>
  )
}
