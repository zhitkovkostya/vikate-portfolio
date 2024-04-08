import { TinaMarkdownContent } from "tinacms/dist/rich-text";

export type Project = {
  title: string;
  slug: string;
  thumbnail: string;
  gallery: { image: string; title: string }[];
  body: TinaMarkdownContent | TinaMarkdownContent[];
};
