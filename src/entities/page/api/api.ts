import { client } from "@/lib/contentful"
import { Page, PageSkeleton } from "../types";
import { unpackPage } from "../utils";

export const fetchPage = async (slug: string): Promise<Page> => {
  const { items: pageEntries } = await client.getEntries<PageSkeleton>({
    content_type: 'page',
    'fields.slug[in]': [slug],
  })
  
  if (pageEntries) {
    return pageEntries.map(unpackPage)[0];
  }
  
  console.log(`Error getting Entries for Pages.`)

  return {
    slug: 'home',
    body: null,
  }
};
