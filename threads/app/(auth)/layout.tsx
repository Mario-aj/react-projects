import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Threads",
  description: "A Nest.js 14 Meta Threads Application.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          style={{ height: "100vh" }}
          className={`${inter.className} bg-dark-1 flex items-center justify-center`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
