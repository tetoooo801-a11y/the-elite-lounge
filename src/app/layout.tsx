import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600"],
});

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ibm-plex",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "The Elite Lounge - The Ritual of Refinement",
  description: "An exploration of masculinity, craft, and the quiet luxury of meticulous grooming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${cairo.variable} ${ibmPlex.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background selection:bg-primary selection:text-background">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
