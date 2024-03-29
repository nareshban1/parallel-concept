"use client";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import DynamicDashboard from "../DynamicDashboard";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  weapons,
  maps,
  agents,
}: {
  children: ReactNode;
  weapons: ReactNode;
  maps: ReactNode;
  agents: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`p-3 ${inter.className}`}>
        <h1 className="text-2xl font-semibold">Parallel Concept</h1>
        {children}
        <section className="w-full ">
          <DynamicDashboard>
            <div key="weapons">{weapons}</div>
            <div key="maps">{maps}</div>
            <div key="agents">{agents}</div>
          </DynamicDashboard>
        </section>{" "}
      </body>
    </html>
  );
}
