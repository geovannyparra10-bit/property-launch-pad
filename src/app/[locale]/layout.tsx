"use client";

import { NextIntlClientProvider } from "next-intl";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { AuthProvider } from "@/contexts/AuthContext";
import type { Locale } from "@/lib/types";
import enMessages from "@/i18n/messages/en.json";
import esMessages from "@/i18n/messages/es.json";

interface Props {
  children: React.ReactNode;
}

const messages = {
  en: enMessages,
  es: esMessages,
};

export default function LocaleLayout({ children }: Props) {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";

  return (
    <html lang={locale}>
      <head>
        <title>Property Launch Pad - Real Estate Investment Tools</title>
        <meta
          name="description"
          content="Professional calculators and analysis tools for real estate investors. Mortgage calculations, rental yield analysis, stamp duty, and comprehensive deal evaluation."
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages[locale]} locale={locale}>
          <AuthProvider>
            <ToastProvider>
              <Navbar locale={locale} />
              <main>{children}</main>
              <Footer />
            </ToastProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
