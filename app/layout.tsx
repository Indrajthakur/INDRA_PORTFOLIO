import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indraraj Singh Thakur — Full-Stack Web Developer",
  description: "Full-Stack Web Developer & CSE student from Rehli, Sagar. Projects, experience and open source activity.",
};
export const viewport: Viewport = { themeColor: "#0A0A0A", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
