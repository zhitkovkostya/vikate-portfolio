import { Document } from '@contentful/rich-text-types'

export type Project = {
  title: string;
  slug?: string;
  thumbnail: string;
  gallery: string[];
  body: Document;
};
