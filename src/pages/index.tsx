import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Content } from "@/features/content";
import { fetchAllProjects, ProjectSticker } from "@/entities/project";
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
        {data.projects.map((project) => (
          <ProjectSticker
            key={project.slug}
            title={project.title}
            imageUrl={project.thumbnail}
            path={`/project/${project.slug}`}
          />
        ))}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const projects = await fetchAllProjects();
  const page = await fetchPage('home');

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
