import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
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
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono-ibm",
});

const title = `${event.name}, a Base, Solana and Bitcoin hackathon by ${event.host.name}`;

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
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
