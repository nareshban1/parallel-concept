"use client";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`p-3 ${inter.className}`}>
        <section className="w-full ">{children}</section>{" "}
      </body>
    </html>
  );
}
