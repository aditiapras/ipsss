import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./sessionProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IPSS | Indonesia Plant Scorecard System",
  description: "Indonesia Plant Scorecard System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
