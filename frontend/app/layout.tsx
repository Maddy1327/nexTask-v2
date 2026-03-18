import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/providers/UserProvider";
import { Inter } from "next/font/google";
import MiniSidebar from "./Components/MiniSidebar/MiniSidebar";
import Header from "./Components/Header/Header";
import MainContentLayout from "@/providers/MainContentLayout";
import SidebarProvider from "@/providers/SidebarProvider";
import MainLayout from "@/providers/MainLayout";
import GTMInitialiser from "@/providers/GTMInitialiser";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nexTask",
  description: "nexTask by Madhav",
  icons: {
    icon: "/mlogo.png",
    shortcut: "/mlogo.png",
    apple: "/mlogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GTMInitialiser />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"></script>
        <script
          id="usercentrics-cmp"
          src="https://web.cmp.usercentrics.eu/ui/loader.js"
          data-settings-id="2xoCZXjqlKmXrM"
          async
        ></script>
      </head>
      <body className={inter.className}>
        <UserProvider>
          <Toaster position="top-center" />

          <div className="min-h-screen md:h-full flex flex-col md:flex-row overflow-x-hidden md:overflow-hidden">
            <MiniSidebar />
            <div className="flex-1 min-w-0 flex flex-col">
              <Header />
              <MainContentLayout>
                <MainLayout>{children}</MainLayout>
                <SidebarProvider />
              </MainContentLayout>
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
