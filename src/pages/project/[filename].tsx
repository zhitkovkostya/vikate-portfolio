import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ProjectList } from "@/components/project-list";
import { Project } from "@/types/project";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Content } from "@/features/content";
import { fetchProjects, fetchProject } from "@/entities/project";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectPage = ({ data }: Props) => {
  return (
    <>
      <Head>
        <title>{data.project?.title} | викатэ</title>
      </Head>
      <main>
        <Content>
          {data.project?.body && documentToReactComponents(data.project?.body)}
        </Content>
        <ProjectList
          projects={data.project?.gallery?.map((image) => ({
            thumbnail: image,
            title: '',
            slug: undefined,
          })) as Project[]}
        />
      </main>
    </>
  );
};

export const getStaticProps = async ({
  params,
}: {
  params: { filename: string };
}) => {
  const project = await fetchProject(params.filename);

  return {
    props: {
      data: {
        project,
        global: {
          title: 'викатэ'
        }
      },
    },
  };
};

export const getStaticPaths = async () => {
  const projects = await fetchProjects();

  return {
    paths: projects?.map((project) => ({
      params: { filename: project.slug },
    })),
    fallback: false,
  };

};

export default ProjectPage;
