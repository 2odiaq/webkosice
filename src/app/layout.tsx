import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WebKosice — Custom Web Development",
    template: "%s · WebKosice",
  },
  icons: {
    icon: [
      {
        url: "/logo_md.png",
        type: "image/png",
        sizes: "1254x1254",
      },
    ],
    apple: [
      {
        url: "/logo_md.png",
        type: "image/png",
        sizes: "1254x1254",
      },
    ],
    shortcut: ["/logo_md.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sk"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
