import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import JsonLd from "@/components/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Ronak Bajracharya — Cybersecurity Professional";
const description = "Dynamic cybersecurity professional specializing in security assessments, vulnerability testing, penetration testing, and digital forensics. Portfolio of CTF writeups, research projects, and security certifications.";
const siteUrl = "https://ronakbajracharya.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Ronak Bajracharya",
  },
  description,
  keywords: [
    "cybersecurity", "penetration testing", "ethical hacking", "CTF writeups",
    "security analyst", "vulnerability assessment", "digital forensics",
    "Ronak Bajracharya", "cyber security portfolio", "Nepal",
  ],
  authors: [{ name: "Ronak Bajracharya" }],
  creator: "Ronak Bajracharya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ronak Bajracharya",
    title,
    description,
    images: [{ url: "/images/ronak-portrait.png", width: 500, height: 600, alt: "Ronak Bajracharya" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/ronak-portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
