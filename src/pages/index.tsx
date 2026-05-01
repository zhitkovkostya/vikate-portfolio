import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Body } from "@/features/body";
import { Content } from "@/features/content";
import { fetchAllProjects, ProjectSticker } from "@/entities/project";
import { fetchPage } from "@/entities/page";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ data: { page, projects } }: Props) {
  return (
    <>
      <Head>
        <title>сайт | викатэ</title>
        <meta name="description" content="Проекты Вики Ткачевой" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
        {page?.body && (
          <Content>
            {documentToReactComponents(page.body)}
          </Content>
        )}
        {projects.map((project, i) => (
          <ProjectSticker
            key={project.slug}
            title={project.title}
            image={project.thumbnail}
            path={`/project/${project.slug}`}
          />
        ))}
      </Body>
    </>
  );
}

export const getStaticProps = async () => {
  const allProjects = await fetchAllProjects();
  const page = await fetchPage('home');

  const projects = (allProjects ?? []).filter(
    project => project.body || (project.works && project.works.length > 0)
  );

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
