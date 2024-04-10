import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ProjectList } from "@/components/project-list";
import { Content } from "@/features/content";
import { fetchEntries } from "@/entities/project";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ projects }: Props) {
  return (
    <>
      <Head>
        <title>портфолио | викатэ</title>
        <meta name="description" content="Проекты Вики Ткачевой" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Content>
          {/* <TinaMarkdown content={data.home.body} /> */}
        </Content>
        {projects && <ProjectList projects={projects} />}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const projects = await fetchEntries();

  return {
    props: {
      projects,
    },
  };
};
