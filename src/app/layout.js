import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Cards from "@/components/Cards";
import Footer from "@/components/Footer";
import ExtraOne from "@/components/ExtraOne";
import ExtraTwo from "@/components/ExtraTwo";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@/providers/AuthContext";
import { ThemeProvider } from "@/providers/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault - Innovate together",
  description: "Share and validate cutting-edge startup blueprints.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <AuthProvider>
          <ThemeProvider>
            <Navbar></Navbar>
            {children}
            <ToastContainer />
            <Footer></Footer>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
