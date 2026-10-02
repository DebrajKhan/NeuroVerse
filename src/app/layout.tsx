import type { Metadata } from "next";
import { Inter, Bodoni_Moda, DM_Serif_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Neuroverse: Brain Explorer",
  description: "A hyper-premium live biological dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bodoni.variable} ${dmSerif.variable} ${cormorant.variable} antialiased bg-void text-white selection:bg-focus-start/30 font-[family-name:var(--font-inter)]`}
      >
        {children}
      </body>
    </html>
  );
}
