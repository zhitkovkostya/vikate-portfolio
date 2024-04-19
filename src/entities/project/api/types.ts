import { Asset, EntryFieldTypes } from "contentful"

export type ProjectSkeleton = {
  contentTypeId: "project",
  fields: {
    slug: EntryFieldTypes.Text,
    title: EntryFieldTypes.Text,
    description: EntryFieldTypes.RichText,
    thumbnail: Asset,
    gallery: Asset[],
  }
}