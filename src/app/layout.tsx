import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Property Launch Pad - Real Estate Investment Tools",
    template: "%s | Property Launch Pad",
  },
  description:
    "Professional calculators and analysis tools for real estate investors. Mortgage calculations, rental yield analysis, stamp duty, and comprehensive deal evaluation.",
  keywords: [
    "real estate",
    "property investment",
    "mortgage calculator",
    "rental yield",
    "stamp duty",
    "deal analyzer",
    "property calculator",
    "investment analysis",
  ],
  authors: [{ name: "Property Launch Pad" }],
  openGraph: {
    type: "website",
    title: "Property Launch Pad - Real Estate Investment Tools",
    description:
      "Professional calculators and analysis tools for real estate investors.",
    siteName: "Property Launch Pad",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Launch Pad - Real Estate Investment Tools",
    description:
      "Professional calculators and analysis tools for real estate investors.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
