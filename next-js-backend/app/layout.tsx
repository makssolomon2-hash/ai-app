import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

import { Inter, Sora, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js AI Demo",
  description: "A personal AI chat demo powered by Google Gemini.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full min-w-0 bg-white text-[#10151F]">
        <NavBar/>
        {children}
        
      </body>
    </html>
  );
}
