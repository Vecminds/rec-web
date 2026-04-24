import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recruitencer — South Asia's tech talent, built for the world",
  description:
    "Recruitencer connects remote-first global tech companies with mid-to-senior software engineers, AI/ML practitioners, and DevOps specialists from Nepal and South Asia.",
  openGraph: {
    title: "Recruitencer",
    description:
      "Mid-to-senior tech talent from Nepal & South Asia for global remote teams.",
    url: "https://recruitencer.com",
    siteName: "Recruitencer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recruitencer — South Asia's tech talent, built for the world",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruitencer",
    description: "South Asia's tech talent. Built for the world.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://recruitencer.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="font-sans antialiased bg-background text-text-primary min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
