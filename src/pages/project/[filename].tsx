import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ProjectList } from "@/components/project-list";
import { Project } from "@/types/project";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Content } from "@/features/content";
import { fetchAllProjects, fetchProject } from "@/entities/project";

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
  const projects = await fetchAllProjects();
  const project = await fetchProject(params.filename);

  console.log(projects)

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
