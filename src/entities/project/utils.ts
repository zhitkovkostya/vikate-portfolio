import { Asset, Entry } from "contentful";
import { Document } from '@contentful/rich-text-types';
import { Project } from "@/types/project";
import { ProjectSkeleton } from "./types";

const unpackFile = (file: Asset) => {
  return file.fields?.file?.url as string;
};

export const unpackProject = (projectEntry: Entry<ProjectSkeleton>): Project => {
  return {
    title: projectEntry.fields.title as string,
    slug: projectEntry.fields.slug as string,
    thumbnail: unpackFile(projectEntry.fields.thumbnail as unknown as Asset),
    body:  projectEntry.fields.description as Document,
    // @ts-ignore
    gallery: projectEntry.fields.gallery.map(unpackFile).filter(Boolean) as string[],
  };
}