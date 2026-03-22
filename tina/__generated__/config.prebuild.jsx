// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => {
            if (!document._sys?.filename) return "/";
            let slug = document._sys.filename;
            slug = slug.replace(/\.md$/, "");
            if (slug === "index") return "/";
            return "/" + slug;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title"
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug"
          },
          // Sections is complex YAML - exclude from schema (will be stored as-is in the file)
          // Only edit sections by editing the raw markdown files
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: [
              { type: "string", name: "metaTitle", label: "Meta Title" },
              { type: "string", name: "metaDescription", label: "Meta Description" },
              { type: "boolean", name: "addTitleSuffix", label: "Add Title Suffix" }
            ]
          },
          {
            type: "boolean",
            name: "isDraft",
            label: "Draft"
          }
        ]
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "string", name: "slug", label: "URL Slug" },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "author", label: "Author" },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "string", name: "image", label: "Featured Image" },
          { type: "string", name: "body", label: "Body", ui: { component: "textarea" }, isBody: true }
        ]
      },
      {
        name: "blog",
        label: "Blog",
        path: "content/blog",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "string", name: "slug", label: "URL Slug" },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "author", label: "Author" },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "string", name: "image", label: "Featured Image" },
          { type: "string", name: "body", label: "Body", ui: { component: "textarea" }, isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
