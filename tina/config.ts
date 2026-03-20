import { defineConfig } from "tinacms";

// Your Client ID from TinaCloud
const clientId = "d6a4676e-a84e-45d2-93b0-2c3d3eac86e3";

export default defineConfig({
  branch: "main",
  clientId: clientId,
  token: process.env.TINA_TOKEN,
  build: {
    outputPath: ".next",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Date",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
