import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Franchise Management System",
  description: "Franchise and office management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
