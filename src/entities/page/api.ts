import { client } from "@/lib/contentful"
import { Page, PageSkeleton } from "./types";
import { unpackPage } from "./utils";

export const fetchEntry = async (slug: string): Promise<Page | undefined> => {
  const { items: pageEntries } = await client.getEntries<PageSkeleton>({
    content_type: 'page',
    'fields.slug[in]': [slug],
  })
  
  if (pageEntries) {
    return pageEntries.map(unpackPage)[0];
  }
  
  console.log(`Error getting Entries for Pages.`)
};
