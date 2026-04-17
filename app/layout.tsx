import type { Metadata } from "next";
import { DM_Mono, Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "TalkBeta — Train your thinking under pressure",
  description:
    "TalkBeta trains you to hold the structure of your thoughts together when speaking under high-pressure conditions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
      {/* Tally popup embed script — loads after page is interactive */}
      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
    </html>
  );
}
