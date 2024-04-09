import { Collection } from "tinacms";

export const homeCollection: Collection<false> = {
  name: "home",
  label: "Главная",
  path: "content/pages",
  fields: [
    {
      type: "rich-text",
      name: "body",
      label: "Содержание",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === 'home') {
        return '/';
      }
      return undefined;
    },
    allowedActions: {
      create: false,
      delete: false
    }
  },
};