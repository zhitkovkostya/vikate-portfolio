import { Inter } from "next/font/google";
import "./globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/features/header";
import { Footer } from "@/features/footer";
import { Project } from "@/entities/project";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps<{data: {projects: Project[], global: {title: string}, project: {title: string}}}>) {
  const menuItems = pageProps.data?.projects?.map(({title, slug}) => ({title, path: `/project/${slug}`})) ?? [];

  return (
    <div className={inter.className}>
      <Header menuItems={menuItems} siteTitle={pageProps.data?.global?.title} pageTitle={pageProps.data?.project?.title} />
      <Footer />
      <Component {...pageProps} />
    </div>
  );
}
