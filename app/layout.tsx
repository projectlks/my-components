import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

// import { ViewTransitions } from "next-view-transitions";
import TopBar from "@/comp/topbar/TopBar";
import { ThemeProvider } from "next-themes";
import ThemeToast from "@/comp/ThemeToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ✅ SEO / Metadata */
export const metadata: Metadata = {
  title: {
    default: "Linkar UI – Modern Web Components & Animations",
    template: "%s | Linkar UI",
  },
  description:
    "Linkar UI is a modern web playground for reusable UI components, smooth animations, and clean front-end patterns built with Next.js, React, and Tailwind CSS.",
  keywords: [
    "Linkar UI",
    "Next.js components",
    "React UI components",
    "Tailwind CSS",
    "Frontend development",
    "Web animations",
    "UI design",
  ],
  authors: [{ name: "Mg Linkar" }],
  creator: "Mg Linkar",
  publisher: "Linkar UI",

  openGraph: {
    title: "Linkar UI – Modern Web Components & Animations",
    description:
      "Explore reusable UI components, smooth animations, and modern frontend techniques built with Next.js and Tailwind CSS.",
    type: "website",
    siteName: "Linkar UI",
  },

  twitter: {
    card: "summary_large_image",
    title: "Linkar UI – Modern Web Components & Animations",
    description:
      "A modern frontend playground for reusable components and smooth animations using Next.js & Tailwind CSS.",
  },

  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const savedTheme = localStorage.getItem("theme");


  return (
    // <ViewTransitions>


    <html lang="en" suppressHydrationWarning >
      <head>
        {/* Next.js will automatically inject metadata from export const metadata */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem     disableTransitionOnChange>
          <div className="w-screen h-screen overflow-hidden">

            {/* TOP BAR */}
            <TopBar />

            <div className="h-[calc(100vh-64px)] w-screen fixed bottom-0 mt-16">
              <ThemeToast />
              {children}
            </div>

          </div>



        </ThemeProvider>
         <Analytics />
      </body>
    </html>
    // </ViewTransitions>
  );
}
