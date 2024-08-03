import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Theory Playground",
  authors: [{ name: "Samuel Perrone", url: "https://github.com/samperrone25" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
