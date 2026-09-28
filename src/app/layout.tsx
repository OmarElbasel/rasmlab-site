import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono, Noto_Kufi_Arabic } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import "./globals.css";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const arabic = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Rasmlab — Web, App & AI Creative Studio",
  description:
    "Rasmlab is a digital studio that designs and builds websites, mobile apps and AI-powered creative work.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable} ${arabic.variable} antialiased`}
    >
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <Preloader />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
