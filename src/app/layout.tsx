import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rent & Return - Your Trusted Rental Platform",
    template: "%s | Rent & Return",
  },
  description:
    "Rent & Return is Bangladesh's leading rental marketplace. Easily rent items, equipment, and more from trusted users. Secure payments, location-based search, and hassle-free returns.",
  keywords: [
    "rental",
    "rent items",
    "equipment rental",
    "Bangladesh rental",
    "peer-to-peer rental",
    "rent and return",
    "rental marketplace",
    "borrow items",
    "rental platform",
    "Dhaka rental",
  ],
  authors: [{ name: "Rent & Return Team" }],
  creator: "Rent & Return",
  publisher: "Rent & Return",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rent-and-return.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rent & Return - Your Trusted Rental Platform",
    description:
      "Rent & Return is Bangladesh's leading rental marketplace. Easily rent items, equipment, and more from trusted users.",
    url: "https://rent-and-return.vercel.app/",
    siteName: "Rent & Return",
    images: [
      {
        url: "/logo/main_logo.png",
        width: 1200,
        height: 630,
        alt: "Rent & Return Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code", // Add your Google verification code
  },
  icons: {
    icon: "/logo/favicon.svg",
    shortcut: "/logo/favicon.svg",
    apple: "/logo/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-arp="">
      <Head>
        <link rel="icon" href="/logo/main_logo.png" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rent & Return",
              url: "https://rentandreturn.com",
              logo: "https://rentandreturn.com/logo/main_logo.png",
              description:
                "Bangladesh's leading rental marketplace for renting items, equipment, and more from trusted users.",
              sameAs: [
                "https://facebook.com/rentandreturn", // Add your social links
                "https://twitter.com/rentandreturn",
                "https://instagram.com/rentandreturn",
              ],
            }),
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
