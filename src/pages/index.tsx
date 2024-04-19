import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ProjectList } from "@/components/project-list";
import { Content } from "@/features/content";
import { fetchProjects } from "@/entities/project";
import { fetchPage } from "@/entities/page";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ data }: Props) {
  return (
    <>
      <Head>
        <title>портфолио | викатэ</title>
        <meta name="description" content="Проекты Вики Ткачевой" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Content>
          {data.page?.body && documentToReactComponents(data.page?.body)}
        </Content>
        {data.projects && <ProjectList projects={data.projects} />}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const projects = await fetchProjects();
  const page = await fetchPage('home');

  console.log(projects)

  return {
    props: {
      data: {
        projects,
        page,
        global: {
          title: 'викатэ'
        }
      }
    },
  };
};
