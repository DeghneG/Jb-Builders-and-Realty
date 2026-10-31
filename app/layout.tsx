import type { Metadata } from "next";
import { Jost, Manrope } from "next/font/google";
import "./globals.css";

const display = Jost({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display-face",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-body-face" });

export const metadata: Metadata = {
  title: "JB Builders and Realty | Design, Build & Develop in Quezon",
  description:
    "Architectural design, construction and real estate development in Lucena City and Tayabas City, Quezon Province. Building homes, commercial and public projects since 2017.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
