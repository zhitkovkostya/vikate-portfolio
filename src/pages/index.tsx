import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ProjectList } from "@/components/project-list";
import client from "../../tina/__generated__/client";
import { Project } from "@/types/project";
import { Content } from "@/features/content";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home(props: Props) {
  const { data } = useTina({
    // @ts-ignore
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

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
          <TinaMarkdown content={data.global.body} />
        </Content>
        <ProjectList projects={props.data.projects} />
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const projectsRes = await client.queries?.projectConnection();
  const projects =
    projectsRes.data.projectConnection.edges?.map((project) => ({
      slug: project?.node?._sys.filename ?? "",
      title: project?.node?.title ?? "",
      thumbnail: project?.node?.thumbnail ?? "",
      body: [],
      gallery: [],
    })) ?? [] as Project[];
  const variables = { relativePath: `global.md` };
  const globalRes = await client.queries?.global(variables);

  const props = {
    data: {
      ...globalRes.data,
      projects,
    },
    query: globalRes.query,
    variables: globalRes.variables,
  };

  return {
    props,
  };
};
