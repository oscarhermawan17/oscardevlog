import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oscardevlog.me"),
  title: {
    default: "oscardevlog.me — Oscar Hermawan",
    template: "%s · oscardevlog.me",
  },
  description:
    "Full-stack JavaScript Engineer by night, absurd content creator and traveler by day. Building scalable web apps since 2018, and making tech less boring one video at a time.",
  openGraph: {
    title: "oscardevlog.me — Oscar Hermawan",
    description:
      "Full-stack JavaScript Engineer by night, absurd content creator and traveler by day.",
    url: "https://oscardevlog.me",
    siteName: "oscardevlog.me",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
