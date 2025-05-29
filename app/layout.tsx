import type { Metadata } from "next";
import { Caveat_Brush } from "next/font/google";
import "./globals.css";

const caveat = Caveat_Brush({
  variable: "--font-caveat",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Q-Jam",
  description: "A collaborative music queue app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${caveat.variable} ${caveat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
