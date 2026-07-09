import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { ReduxProvider } from "./shared/providers/ReduxProvider";
import Header from "@/app/shared/components/Header/Header";
import { Toaster } from "sonner";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Petlove",
    template: "%s | Petlove",
  },
  description:
    "Find the perfect pet for your home and discover expert care tips. Explore animal adoption guides and everything you need for a happy, healthy pet.",

  openGraph: {
    title: "Petlove",
    description:
      "Find the perfect pet for your home and discover expert care tips. Explore animal adoption guides and everything you need for a happy, healthy pet.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Petlove — A happy beagle dog with its owners",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Petlove",
    description:
      "Find the perfect pet for your home and discover expert care tips. Explore animal adoption guides and everything you need for a happy, healthy pet.",
    images: [`${baseUrl}/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manropeSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ReduxProvider>
          <Toaster position="top-center" />

          <Header />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
