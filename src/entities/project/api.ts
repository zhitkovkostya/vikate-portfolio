import { client } from "@/lib/contentful"
import { Project } from "@/types/project";
import { ProjectSkeleton } from "./types";
import { unpackProject } from "./utils";

export const fetchEntries = async (): Promise<Project[] | undefined> => {
  const { items: projectEntries } = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
  });
  
  if (projectEntries) {
    return projectEntries.map(unpackProject);
  }
  
  console.log(`Error getting Entries for Projects.`)
};

export const fetchEntry = async (slug: string): Promise<Project | undefined> => {
  const { items: projectEntries } = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
    'fields.slug[in]': [slug],
  })
  
  if (projectEntries) {
    return projectEntries.map(unpackProject)[0];
  }
  
  console.log(`Error getting Entries for Projects.`)
};
