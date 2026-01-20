import "./globals.css";
import { Playfair_Display } from "next/font/google";
import BackgroundMusic from "@/components/BackgroundMusic";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata = {
  title: "E-Book Keluarga Eyang Bandan",
  description: "Kenangan Keluarga Besar Eyang Bandan",
  manifest: "/manifest.json",
  icons: {
    apple: "/images/Logo_Eyang.png",
  },
};

export const viewport = {
  themeColor: "#F3E5AB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={playfair.className}>
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
