import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parallel Concept",
  description: "Parallel Concept Demo",
};

export default function RootLayout({
  children,
  modal,
  weapons,
  maps,
  agents,
}: {
  children: ReactNode;
  modal: ReactNode;
  weapons: ReactNode;
  maps: ReactNode;
  agents: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className="text-2xl font-semibold">Parallel Concept</h1>
        {children}
        {/* {modal} */}
        <section>
          Dynamic Layout System Implementation
          {weapons}
          {maps}
          {agents}
        </section>{" "}
      </body>
    </html>
  );
}
