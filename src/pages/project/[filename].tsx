import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Body } from "@/features/body";
import { Content } from "@/features/content";
import { fetchAllProjects, fetchProject } from "@/entities/project";
import { WorkSticker } from "@/entities/work/work-sticker";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectPage = ({ data }: Props) => (
  <>
    <Head>
      <title>{data.project?.title} | викатэ</title>
    </Head>
    <Body>
      <Content>
        {data.project?.body && documentToReactComponents(data.project?.body)}
      </Content>
      {data.project?.works.map(({ title, thumbnail }) => (
        <WorkSticker title={title} image={thumbnail} key={thumbnail.url ?? ''} />
      ))}
    </Body>
  </>
);

export const getStaticProps = async ({
  params,
}: {
  params: { filename: string };
}) => {
  const projects = await fetchAllProjects();
  const project = await fetchProject(params.filename);

  return {
    props: {
      data: {
        projects,
        project,
        global: {
          title: 'викатэ'
        }
      },
    },
  };
};

export const getStaticPaths = async () => {
  const projects = await fetchAllProjects();

  return {
    paths: projects?.map((project) => ({
      params: { filename: project.slug },
    })),
    fallback: false,
  };

};

export default ProjectPage;
