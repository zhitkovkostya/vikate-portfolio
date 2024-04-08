import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
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
      },
    ],
  },
});
