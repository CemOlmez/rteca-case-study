import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "RTECA CRM Dashboard",
  description: "Franchise and office management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased"}
      >
<div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
