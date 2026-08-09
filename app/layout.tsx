import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FirebaseProvider from "@/components/providers/firebase-provider";

const inter = Inter({ subsets: ["latin"] });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-flap",
});

export const metadata: Metadata = {
  title: "HackMatrix 1.0 — 2-Day Hackathon 2026 | VIIT Visakhapatnam",
  description:
    "HackMatrix 1.0 is a 2-day hackathon organized by the Department of AI & Data Science, VIIT Visakhapatnam, in association with Matrix Club & IEEE CIS Student Branch. 13–14 August 2026. Prize Pool ₹10,000+. Domains: AI/ML, Cloud Computing, Cybersecurity, Robotics.",
  keywords: [
    "HackMatrix",
    "Hackathon",
    "VIIT",
    "Visakhapatnam",
    "AI",
    "ML",
    "Cloud Computing",
    "Cybersecurity",
    "Robotics",
    "2026",
  ],
  openGraph: {
    title: "HackMatrix 1.0 — 2-Day Hackathon 2026",
    description: "Join HackMatrix 1.0 at VIIT Visakhapatnam. Prize Pool ₹10,000+. Register at bit.ly/HackMatrix10",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} ${jetbrainsMono.variable} bg-[#030303] text-white antialiased`}>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
