import { Document } from '@contentful/rich-text-types'
import { Work } from '@/types/work';
import { Image } from '@/types/image';



export type Project = {
  title: string;
  slug: string;
  thumbnail: Image;
  works: Work[];
  body: Document;
};
