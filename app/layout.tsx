import type { Metadata } from "next";

import { Inter, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mezuniyet | 2026",
  description:
    "Mezuniyet anılarımızı paylaştığımız özel bir alan. Fotoğraflar, videolar ve sınıf arkadaşlarımız.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${dmSans.variable} ${playfairDisplay.variable} h-full antialiased overflow-x-hidden w-full max-w-[100vw]`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white font-(family-name:--font-dmSans) overflow-x-hidden w-full max-w-[100vw]">
        {children}
      </body>
    </html>
  );
}
