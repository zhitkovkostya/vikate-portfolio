import { Work } from '@/types/work';
import { Document } from '@contentful/rich-text-types'

export type Project = {
  title: string;
  slug: string;
  thumbnail: string;
  works: Work[];
  body: Document;
};
