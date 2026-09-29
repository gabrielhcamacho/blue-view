import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Blueview Imóveis | Imóveis em Itapema e Região",
    template: "%s | Blueview Imóveis",
  },
  description:
    "Transformando oportunidades do mercado imobiliário em patrimônio. Imóveis de médio e alto padrão em Itapema, Porto Belo, Balneário Camboriú e Praia Brava.",
  metadataBase: new URL("https://blueviewimoveis.com.br"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
