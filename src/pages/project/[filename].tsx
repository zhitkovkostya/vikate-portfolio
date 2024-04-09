import Head from "next/head";
import { useTina } from "tinacms/dist/react";
import { InferGetStaticPropsType } from "next";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../../tina/__generated__/client";
import { ProjectList } from "@/components/project-list";
import { Project } from "@/types/project";
import { Content } from "@/features/content";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectPage = (props: Props) => {
  const { data } = useTina<{project: Project}>({
    // @ts-ignore
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <Head>
        <title>{data?.project.title} | викатэ</title>
      </Head>
      <main>
        <Content>
          <TinaMarkdown components={components} content={data?.project.body} />
        </Content>
        <ProjectList
          projects={data?.project.gallery?.map((item) => ({
            thumbnail: item.image,
            title: item.title,
            slug: item.title,
            gallery: [],
            body: [],
          }))}
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
  let data = {
    project: {
      title: "",
      thumbnail: "",
      slug: "",
      gallery: [],
      body: [],
    } as Project,
  };
  let query = {};
  let variables = { relativePath: `${params.filename}.md` };
  
    const res = await client.queries?.project(variables);

    query = res.query;
    // @ts-ignore
    data = res.data;
    variables = res.variables;
 

  // console.log(data.project.gallery);

  const props = {
    variables: variables,
    data: data,
    query: query,
  };

  return {
    props,
  };
};

export const getStaticPaths = async () => {
  const projectsListData = await client.queries.projectConnection();

  return {
    paths: projectsListData?.data?.projectConnection?.edges?.map((project) => ({
      params: { filename: project?.node?._sys.filename },
    })),
    fallback: false,
  };
};

export default ProjectPage;

const PageSection = (props: { heading: string; content: string }) => {
  return (
    <>
      <h2>{props.heading}</h2>
      <p>{props.content}</p>
    </>
  );
};

const components = {
  PageSection: PageSection,
};
