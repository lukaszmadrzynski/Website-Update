// TinaCMS configuration - Updated
import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
          },
          {
            type: "string",
            name: "type",
            label: "Type",
          },
        ],
      },
      {
        name: "data",
        label: "Data Files",
        path: "content/data",
        format: "json",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Type",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
          },
        ],
      },
    ],
  },
});
