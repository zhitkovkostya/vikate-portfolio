import { Asset, Entry } from "contentful";
import { Document } from '@contentful/rich-text-types';
import { Project } from "@/entities/project";
import { ProjectSkeleton } from "./types";

const unpackFileUrl = (file: Asset) => {
  return file.fields?.file?.url as string;
};

const unpackFile = (file: Asset) => {
  return {
    title: file.fields?.file?.fileName as string,
    thumbnail: file.fields?.file?.url as string
  };
};

export const unpackProject = (projectEntry: Entry<ProjectSkeleton>): Project => {
  return {
    title: projectEntry.fields.title as string ?? '',
    slug: projectEntry.fields.slug as string ?? '',
    thumbnail: unpackFileUrl(projectEntry.fields.thumbnail as unknown as Asset) ?? '',
    body:  projectEntry.fields.description as Document ?? null,
    // @ts-ignore
    works: projectEntry.fields.gallery.map(unpackFile).filter(Boolean),
  };
}