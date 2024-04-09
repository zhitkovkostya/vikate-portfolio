import { Inter } from "next/font/google";
import "./globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/features/header";

const inter = Inter({ subsets: ["latin"] });



export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <div className={inter.className}>
      <Header pageTitle={pageProps.data?.title} />
      <Component {...pageProps} />
    </div>
  );
}
