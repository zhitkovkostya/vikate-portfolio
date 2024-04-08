import Head from "next/head";
import { useTina } from "tinacms/dist/react";
import { InferGetStaticPropsType } from "next";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../../tina/__generated__/client";
import { ProjectList } from "@/components/project-list";
import { Inter } from "next/font/google";
import probe from "probe-image-size";

const inter = Inter({ subsets: ["latin"] });

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectPage = (props: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <Head>
        <title>{data?.project.title}</title>
      </Head>
      <main
        className={`${inter.className}`}
        id="main"
        style={{ height: "100vh", width: "100vw" }}
      >
        <h1 className="text-3xl m-8 text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {data?.project.title}
        </h1>
        <TinaMarkdown components={components} content={data?.project.body} />
        <ProjectList
          projects={data?.project.gallery.map((item) => ({
            thumbnail: item.image,
            title: item.title,
            slug: item.title,
          }))}
        />
      </main>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  let data = {
    project: {
      gallery: [],
    },
  };
  let query = {};
  let variables = { relativePath: `${params.filename}.md` };
  try {
    const res = await client.queries?.project(variables);

    query = res.query;
    data = res.data;
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

const PageSection = (props) => {
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
