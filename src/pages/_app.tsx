import { Inter } from "next/font/google";
import "./globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/features/header";
import { Footer } from "@/features/footer";

const inter = Inter({ subsets: ["latin"] });



export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <div className={inter.className}>
      <Header siteTitle={pageProps.data?.global?.title} pageTitle={pageProps.data?.project?.title} />
      <Footer />
      <Component {...pageProps} />
    </div>
  );
}
