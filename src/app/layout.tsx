import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import { Header } from "./components/Header";



export const metadata: Metadata = {
  title: "Nagorik Technology Movies",
  description: "Online movies for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
      <Providers>
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </Providers>
    </body>
  </html>
  );
}
