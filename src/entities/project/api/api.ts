import { client } from "@/lib/contentful"
import { Project } from "@/entities/project";
import { unpackProject } from "./utils";
import { ProjectSkeleton } from "./types";

export const fetchAllProjects = async (): Promise<Project[]> => {
  const { items: projectEntries } = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
    // @ts-ignore
    order: ['fields.title'],
  });
  
  if (projectEntries) {
    return projectEntries.map(unpackProject);
  }

  console.log(`Error getting Entries for Projects.`);

  return [];
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
