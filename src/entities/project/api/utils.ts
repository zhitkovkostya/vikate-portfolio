import { Asset, AssetFile, Entry } from "contentful";
import { Document } from '@contentful/rich-text-types';
import { Project } from "@/entities/project";
import { ProjectSkeleton } from "./types";
import { Image } from "@/types/image";

const unpackImage = (file: AssetFile): Image => ({
  url: `https:${file.url}`,
  title: file.fileName,
  width: file.details.image?.width ?? 0,
  height: file.details.image?.height ?? 0,
});

export const unpackProject = (projectEntry: Entry<ProjectSkeleton>): Project => {  
  return {
    title: projectEntry.fields.title as string ?? '',
    slug: projectEntry.fields.slug as string ?? '',
    // @ts-ignore
    thumbnail: unpackImage(projectEntry.fields.thumbnail.fields.file),
    body:  projectEntry.fields.description as Document ?? null,
    // @ts-ignore
    works: projectEntry.fields.gallery.map(asset => ({
      title: asset.fields.title,
      thumbnail: unpackImage(asset.fields.file),
    })),
  };
}