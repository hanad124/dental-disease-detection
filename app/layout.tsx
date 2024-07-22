import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import AppBg from "@/public/assets/app-bg.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dental Diseases Detection",
  description:
    "Detect dental diseases in X-ray images with the help of machine learning models. This tool helps to identify the presence of diseases in the teeth.",

  // open graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dental-disease-detection.vercel.app/",
    images: [
      {
        url: AppBg.src,
        width: 512,
        height: 512,
        alt: "Dental Diseases Detection",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
