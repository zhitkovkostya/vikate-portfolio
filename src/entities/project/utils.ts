import { Asset, Entry } from "contentful";
import { ProjectSkeleton } from "./types";
import { Project } from "@/types/project";

export const unpackProjects = (projects: Entry<ProjectSkeleton>[]): Project[] => {
  return projects.map((projectEntry) => ({
    title: projectEntry.fields.title as string,
    slug: projectEntry.fields.slug as string,
    thumbnail: (projectEntry.fields.thumbnail as unknown as Asset).fields.file?.url as string,
    body: '',
    gallery: [],
  }));
}