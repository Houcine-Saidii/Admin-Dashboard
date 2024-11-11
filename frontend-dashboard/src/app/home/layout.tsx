"use client";
import { Inter } from "next/font/google";
import Sidebar from "../Components/sidebar";
import Dropdown from "../Components/dropdown";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar toggleMenu={toggleMenu} />
        {children}
        <Dropdown isMenuOpen={isMenuOpen} />
      </body>
    </html>
  );
}
