import { Collection } from "tinacms";

export const globalCollection: Collection<false> = {
  name: "global",
  label: "Настройки",
  path: "content/global",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Логотип",
      isTitle: true,
      required: true,
    },
  ],
  ui: {
    allowedActions: {
      create: false,
      delete: false
    }
  },
}
