import { Document } from '@contentful/rich-text-types';
import { EntryFieldTypes } from "contentful";

export type PageSkeleton = {
  contentTypeId: "page",
  fields: {
    slug: EntryFieldTypes.Text,
    description: EntryFieldTypes.RichText,
  }
}

export type Page = {
  slug: string;
  body: Document;
}