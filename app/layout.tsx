import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { MusicProvider } from "./context/MusicContext";
import ShellLayout from "./components/ShellLayout";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Musafir Cafe",
  description: "A nostalgic digital cafe for music, books, thoughts, and community.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased suppressHydrationWarning`}>
      <body className="min-h-full flex flex-col m-0 p-0">
        <ThemeProvider>
          <MusicProvider>
            <ShellLayout>{children}</ShellLayout>
          </MusicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
