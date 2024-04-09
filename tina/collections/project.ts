import { Collection } from "tinacms";

export const projectCollection: Collection<false> = {
  name: "project",
  label: "Проекты",
  path: "content/projects",
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
    {
      label: "Обложка",
      name: "thumbnail",
      type: "image",
    },
    {
      label: "Картинки",
      name: "gallery",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        {
          label: "Название",
          name: "title",
          type: "string",
        },
        { label: "Картинка", name: "image", type: "image" },
      ],
    },
  ],
  ui: {
    router: ({ document }) => `/project/${document._sys.filename}`,
  },
};