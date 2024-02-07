import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import ConfigWrapper from "./ConfigWrapper";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
        style={{
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <AntdRegistry>
          <ConfigWrapper>{children}</ConfigWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
