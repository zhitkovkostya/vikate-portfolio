import { client } from "@/lib/contentful"
import { Project } from "@/types/project";
import { ProjectSkeleton } from "./types";
import { unpackProjects } from "./utils";

export const fetchEntries = async (): Promise<Project[] | undefined> => {
  const { items: projectEntries } = await client.getEntries<ProjectSkeleton>({
    content_type: 'project',
  });
  
  if (projectEntries) {
    return unpackProjects(projectEntries)
  }
  
  console.log(`Error getting Entries for Projects.`)
};
