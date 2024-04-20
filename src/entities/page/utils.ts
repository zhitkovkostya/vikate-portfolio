import { Entry } from "contentful";
import { Document } from '@contentful/rich-text-types';
import { Page, PageSkeleton } from "./types";

export const unpackPage = (projectEntry: Entry<PageSkeleton>): Page => {
  return {
    slug: projectEntry.fields.slug as string,
    body:  projectEntry.fields.description as Document ?? null,
  };
}