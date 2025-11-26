import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Sonar",
  description: "Let's dive into the sea where you like with sonar.",
};

const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <html lang="en" data-cbscriptallow="true">
        <body className={`${montserratFont.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </Suspense>
  );
}
