import { Collection } from "tinacms";

export const globalCollection: Collection<false> = {
  name: "global",
  label: "Настройки",
  path: "content/global",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Название",
      isTitle: true,
      required: true,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Описание",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => `/index.html`,
    allowedActions: {
      create: false,
      delete: false
    }
  },
}