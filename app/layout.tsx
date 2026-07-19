import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "@/styles/globals.css";
import { AdminProvider } from "./context/AdminContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({ 
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Agrasen Public School - Nurturing Future Leaders Since 2011",
  description: "CBSE Affiliated School in Noida Extension. Excellence in education.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}>
      {/* ✅ BAS ITNA CHANGE KARO - m-0 p-0 add karo */}
      <body className="font-sans antialiased m-0 p-0">
        <AdminProvider>
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}