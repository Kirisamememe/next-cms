import type { Metadata } from "next";
import React from "react";
import { Locale } from "@/i18n/config";
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
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <BaseLayout locale={locale}>
      {children}
    </BaseLayout>
  )
}
