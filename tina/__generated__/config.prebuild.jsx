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
        match: {
          include: "**/*"
        },
        ui: {
          router: ({ document }) => {
            const filename = document._sys?.filename || "";
            const slug = filename.replace(/\.md$/, "").replace(/^index$/, "/") || "/";
            return slug;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug"
          },
          {
            type: "string",
            name: "type",
            label: "Layout Type",
            options: ["PageLayout", "PostLayout", "PostFeedLayout"]
          },
          // Generic Section
          {
            type: "object",
            name: "genericSection",
            label: "Generic Section (Hero/Intro)",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
              { type: "image", name: "imageUrl", label: "Image URL" },
              { type: "string", name: "imageAlt", label: "Image Alt Text" },
              { type: "string", name: "badgeLabel", label: "Badge Label" },
              { type: "string", name: "button1Label", label: "Button 1 Label" },
              { type: "string", name: "button1Url", label: "Button 1 URL" },
              { type: "string", name: "button2Label", label: "Button 2 Label" },
              { type: "string", name: "button2Url", label: "Button 2 URL" },
              { type: "string", name: "button3Label", label: "Button 3 Label" },
              { type: "string", name: "button3Url", label: "Button 3 URL" },
              { type: "string", name: "colors", label: "Color Theme", options: ["bg-light-fg-dark", "bg-dark-fg-light", "bg-neutral-fg-dark", "bg-primary-fg-light"] }
            ]
          },
          // Featured Items Section
          {
            type: "object",
            name: "featuredSection",
            label: "Featured Items Section",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "variant", label: "Layout", options: ["two-col-grid", "three-col-grid"] },
              { type: "string", name: "colors", label: "Color Theme", options: ["bg-light-fg-dark", "bg-dark-fg-light", "bg-neutral-fg-dark"] }
            ]
          },
          // Featured Item 1
          {
            type: "object",
            name: "featuredItem1",
            label: "Featured Item 1",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "text", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "imageUrl", label: "Image URL" },
              { type: "string", name: "imageAlt", label: "Image Alt Text" }
            ]
          },
          // Featured Item 2
          {
            type: "object",
            name: "featuredItem2",
            label: "Featured Item 2",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "text", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "imageUrl", label: "Image URL" },
              { type: "string", name: "imageAlt", label: "Image Alt Text" }
            ]
          },
          // Featured Item 3
          {
            type: "object",
            name: "featuredItem3",
            label: "Featured Item 3",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "text", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "imageUrl", label: "Image URL" },
              { type: "string", name: "imageAlt", label: "Image Alt Text" }
            ]
          },
          // CTA Section
          {
            type: "object",
            name: "ctaSection",
            label: "Call to Action",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "text", label: "Text" },
              { type: "string", name: "buttonLabel", label: "Button Label" },
              { type: "string", name: "buttonUrl", label: "Button URL" },
              { type: "string", name: "colors", label: "Color Theme", options: ["bg-light-fg-dark", "bg-dark-fg-light", "bg-primary-fg-light"] }
            ]
          },
          // Contact Section
          {
            type: "object",
            name: "contactSection",
            label: "Contact Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "text", label: "Text" },
              { type: "string", name: "buttonLabel", label: "Button Label" },
              { type: "string", name: "buttonUrl", label: "Button URL" }
            ]
          },
          // SEO
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: [
              { type: "string", name: "metaTitle", label: "Meta Title" },
              { type: "string", name: "metaDescription", label: "Meta Description", ui: { component: "textarea" } },
              { type: "boolean", name: "addTitleSuffix", label: "Add Title Suffix" },
              { type: "image", name: "socialImage", label: "Social Image" }
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
        match: {
          include: "**/*"
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "string", name: "slug", label: "URL Slug" },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "author", label: "Author" },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "image", name: "image", label: "Featured Image" },
          { type: "string", name: "body", label: "Body", ui: { component: "textarea" }, isBody: true }
        ]
      },
      {
        name: "data",
        label: "Data Files",
        path: "content/data",
        format: "json",
        match: {
          include: "**/*"
        },
        fields: [
          { type: "string", name: "type", label: "Type" },
          { type: "string", name: "title", label: "Title" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
