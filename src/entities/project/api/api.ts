import { client } from "@/lib/contentful"
import { Project } from "@/entities/project";
import { unpackProject } from "./utils";
import { ProjectSkeleton } from "./types";

export const fetchAllProjects = async (): Promise<Project[]> => {
  if (!client) {
    console.log('client is null');
    return [];
  }

  console.log('client ok, fetching...');
  
  const response = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
    // @ts-ignore
    order: ['fields.title'],
  });

  console.log('response:', JSON.stringify(response, null, 2));
  console.log('items:', response?.items);

  const { items: projectEntries } = response;
  
  return projectEntries ? projectEntries.map(unpackProject) : [];
};

export const fetchProject = async (slug: string): Promise<Project | undefined> => {
  const { items: projectEntries } = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
    'fields.slug[in]': [slug],
  })
  
  if (projectEntries) {
    return projectEntries.map(unpackProject)[0];
  }
  
  console.log(`Error getting Entries for Projects.`);
};
