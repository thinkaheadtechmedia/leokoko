import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LEOKOKO — Official Site",
  description:
    "The official website of gospel artist LEOKOKO. Lifting voices. Healing hearts. Glorifying God.",
  keywords: [
    "LEOKOKO",
    "gospel",
    "gospel music",
    "Christian music",
    "worship",
    "African gospel",
  ],
  openGraph: {
    title: "LEOKOKO — Official Site",
    description:
      "Lifting voices. Healing hearts. Glorifying God. Listen to LEOKOKO's gospel music.",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LEOKOKO — Official Gospel Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEOKOKO — Official Site",
    description:
      "Lifting voices. Healing hearts. Glorifying God.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
