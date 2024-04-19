import { client } from "@/lib/contentful"
import { Project } from "@/types/project";
import { unpackProject } from "./utils";
import { ProjectSkeleton } from "./types";

export const fetchAllProjects = async (): Promise<Project[] | undefined> => {
  const { items: projectEntries } = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
  });
  
  if (projectEntries) {
    return projectEntries.map(unpackProject);
  }
  
  console.log(`Error getting Entries for Projects.`)
};

export const fetchProject = async (slug: string): Promise<Project | undefined> => {
  const { items: projectEntries } = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
    'fields.slug[in]': [slug],
  })
  
  if (projectEntries) {
    return projectEntries.map(unpackProject)[0];
  }
  
  console.log(`Error getting Entries for Projects.`)
};
