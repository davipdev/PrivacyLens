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

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "PrivacyLens — Análise de Privacidade",
  description:
    "Escaneie sites, descubra quais dados eles pedem e receba um score de privacidade com alertas de risco.",
  openGraph: {
    title: "PrivacyLens — Análise de Privacidade",
    description:
      "Escaneie sites, descubra quais dados eles pedem e receba um score de privacidade com alertas de risco.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070a0f] text-zinc-200">
        {children}
      </body>
    </html>
  );
}
