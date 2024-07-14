import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Topbar } from "@/components/shared/top-bar";
import { LeftSidebar } from "@/components/shared/left-sidebar";
import { Bottombar } from "@/components/shared/bottom-bar";
import { RightSidebar } from "@/components/shared/right-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Nest.js 14 Meta Threads Application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

          <main>
            <LeftSidebar />

            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>

            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
