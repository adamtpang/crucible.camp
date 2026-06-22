import type { Metadata } from "next";
import { Archivo, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { event } from "@config";
import { Reveal } from "@/components/Reveal";
import "./globals.css";

// Archivo as a variable font WITH the width axis (wdth), that's how we get the
// expanded display weight. IBM Plex Mono is the instrument/readout voice.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});
// Editorial serif display (approximation of Arc's --font-nav until exact font supplied)
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono-ibm",
});

const title = `${event.name}, a Base + Solana + Bitcoin builder weekend`;

export const metadata: Metadata = {
  metadataBase: new URL(event.seo.url),
  title,
  description: event.seo.description,
  openGraph: {
    type: "website",
    title,
    description: event.seo.description,
    url: event.seo.url,
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: event.seo.description,
    images: ["/og.svg"],
  },
};

export const viewport = { themeColor: "#f4efe6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${fraunces.variable} ${mono.variable}`}>
      <body>
        <a href="#rsvp" className="skip-link">
          Skip to apply
        </a>
        <div className="grain" aria-hidden />
        {children}
        <Reveal />
      </body>
    </html>
  );
}
