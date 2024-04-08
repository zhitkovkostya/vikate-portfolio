import Head from "next/head";
import { useTina } from "tinacms/dist/react";
import { InferGetStaticPropsType } from "next";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../../tina/__generated__/client";
import { ProjectList } from "@/components/project-list";
import { Inter } from "next/font/google";
import { Project } from "@/types/project";

const inter = Inter({ subsets: ["latin"] });

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectPage = (props: Props) => {
  const { data } = useTina<Project>({
    // @ts-ignore
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <Head>
        <title>{data?.title}</title>
      </Head>
      <main
        className={`${inter.className}`}
        id="main"
        style={{ height: "100vh", width: "100vw" }}
      >
        <h1 className="text-3xl m-8 text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {data?.title}
        </h1>
        <TinaMarkdown components={components} content={data?.body} />
        <ProjectList
          projects={data?.gallery.map((item) => ({
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
    title: "",
    thumbnail: "",
    slug: "",
    gallery: [],
    body: [],
  } as Project;
  let query = {};
  let variables = { relativePath: `${params.filename}.md` };
  try {
    const res = await client.queries?.project(variables);

    query = res.query;
    // @ts-ignore
    data = res.data.project;
    variables = res.variables;
  } catch (e) {
    // swallow errors related to document creation
  }

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
