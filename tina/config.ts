// TinaCMS configuration - Complete Schema
import { defineConfig } from "tinacms";

// Tina field definitions for reusable components
const titleBlockFields = {
  type: "object" as const,
  name: "TitleBlock",
  label: "Title Block",
  fields: [
    {
      type: "string" as const,
      name: "text",
      label: "Text",
    },
    {
      type: "string" as const,
      name: "color",
      label: "Color",
      options: ["text-dark", "text-light", "text-primary"],
    },
  ],
};

const imageBlockFields = {
  type: "object" as const,
  name: "ImageBlock",
  label: "Image Block",
  fields: [
    {
      type: "image" as const,
      name: "url",
      label: "Image URL",
    },
    {
      type: "string" as const,
      name: "altText",
      label: "Alt Text",
    },
  ],
};

const badgeFields = {
  type: "object" as const,
  name: "Badge",
  label: "Badge",
  fields: [
    {
      type: "string" as const,
      name: "label",
      label: "Label",
    },
    {
      type: "string" as const,
      name: "color",
      label: "Color",
      options: ["text-dark", "text-light", "text-primary"],
    },
  ],
};

const buttonFields = {
  type: "object" as const,
  name: "Button",
  label: "Button",
  fields: [
    {
      type: "string" as const,
      name: "type",
      label: "Type",
      options: ["Button"],
    },
    {
      type: "string" as const,
      name: "label",
      label: "Label",
    },
    {
      type: "string" as const,
      name: "url",
      label: "URL",
    },
    {
      type: "string" as const,
      name: "style",
      label: "Style",
      options: ["primary", "secondary", "outline"],
    },
  ],
};

const genericSectionFields = {
  type: "object" as const,
  name: "GenericSection",
  label: "Generic Section",
  fields: [
    {
      type: "string" as const,
      name: "type",
      label: "Type",
      options: ["GenericSection"],
    },
    {
      type: "string" as const,
      name: "title",
      label: "Title Text",
    },
    {
      type: "string" as const,
      name: "subtitle",
      label: "Subtitle",
    },
    {
      type: "string" as const,
      name: "text",
      label: "Text Content",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "image" as const,
      name: "imageUrl",
      label: "Image URL",
    },
    {
      type: "string" as const,
      name: "imageAlt",
      label: "Image Alt Text",
    },
    {
      type: "string" as const,
      name: "badgeLabel",
      label: "Badge Label",
    },
    {
      type: "string" as const,
      name: "colors",
      label: "Color Theme",
      options: [
        "bg-light-fg-dark",
        "bg-dark-fg-light",
        "bg-neutral-fg-dark",
        "bg-primary-fg-light",
      ],
    },
  ],
};

const featuredItemFields = {
  type: "object" as const,
  name: "FeaturedItem",
  label: "Featured Item",
  fields: [
    {
      type: "string" as const,
      name: "type",
      label: "Type",
      options: ["FeaturedItem"],
    },
    {
      type: "string" as const,
      name: "title",
      label: "Title",
    },
    {
      type: "string" as const,
      name: "subtitle",
      label: "Subtitle",
    },
    {
      type: "string" as const,
      name: "text",
      label: "Description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "image" as const,
      name: "imageUrl",
      label: "Image URL",
    },
    {
      type: "string" as const,
      name: "imageAlt",
      label: "Image Alt Text",
    },
  ],
};

const featuredItemsSectionFields = {
  type: "object" as const,
  name: "FeaturedItemsSection",
  label: "Featured Items Section",
  fields: [
    {
      type: "string" as const,
      name: "type",
      label: "Type",
      options: ["FeaturedItemsSection"],
    },
    {
      type: "string" as const,
      name: "title",
      label: "Section Title",
    },
    {
      type: "string" as const,
      name: "subtitle",
      label: "Subtitle",
    },
    {
      type: "string" as const,
      name: "variant",
      label: "Layout Variant",
      options: ["two-col-grid", "three-col-grid", "carousel"],
    },
    {
      type: "string" as const,
      name: "colors",
      label: "Color Theme",
      options: [
        "bg-light-fg-dark",
        "bg-dark-fg-light",
        "bg-neutral-fg-dark",
      ],
    },
  ],
};

const seoFields = {
  type: "object" as const,
  name: "Seo",
  label: "SEO",
  fields: [
    {
      type: "string" as const,
      name: "metaTitle",
      label: "Meta Title",
    },
    {
      type: "string" as const,
      name: "metaDescription",
      label: "Meta Description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "boolean" as const,
      name: "addTitleSuffix",
      label: "Add Title Suffix",
    },
    {
      type: "image" as const,
      name: "socialImage",
      label: "Social Image",
    },
  ],
};

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
        ui: {
          router: ({ document }) => {
            // Map document to URL based on filename (slug)
            const filename = document._sys?.filename || '';
            const slug = filename.replace(/\.md$/, '').replace(/^index$/, '/') || '/';
            return slug;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            description: "The URL path for this page (e.g., /about-us)",
          },
          {
            type: "string",
            name: "type",
            label: "Layout Type",
            options: ["PageLayout", "PostLayout", "PostFeedLayout"],
          },
          // Sections - Generic Sections
          {
            type: "object",
            name: "heroSection",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Hero Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Hero Subtitle",
              },
              {
                type: "string",
                name: "text",
                label: "Hero Text",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "imageUrl",
                label: "Hero Image",
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Image Alt Text",
              },
              {
                type: "string",
                name: "badgeLabel",
                label: "Badge Label",
              },
              {
                type: "string",
                name: "button1Label",
                label: "Button 1 Label",
              },
              {
                type: "string",
                name: "button1Url",
                label: "Button 1 URL",
              },
              {
                type: "string",
                name: "button2Label",
                label: "Button 2 Label",
              },
              {
                type: "string",
                name: "button2Url",
                label: "Button 2 URL",
              },
              {
                type: "string",
                name: "button3Label",
                label: "Button 3 Label",
              },
              {
                type: "string",
                name: "button3Url",
                label: "Button 3 URL",
              },
            ],
          },
          {
            type: "object",
            name: "introSection",
            label: "Introduction Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
              },
              {
                type: "string",
                name: "text",
                label: "Section Text",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "imageUrl",
                label: "Section Image",
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Image Alt Text",
              },
            ],
          },
          // Featured Items Section
          {
            type: "object",
            name: "featuredSection",
            label: "Featured Items Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
              },
              {
                type: "string",
                name: "variant",
                label: "Layout",
                options: ["two-col-grid", "three-col-grid"],
              },
              {
                type: "string",
                name: "colors",
                label: "Color Theme",
                options: [
                  "bg-light-fg-dark",
                  "bg-dark-fg-light",
                  "bg-neutral-fg-dark",
                ],
              },
            ],
          },
          // Featured Items (Items 1-3)
          {
            type: "object",
            name: "featuredItem1",
            label: "Featured Item 1",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Item Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Item Subtitle",
              },
              {
                type: "string",
                name: "text",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "imageUrl",
                label: "Image",
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Image Alt Text",
              },
            ],
          },
          {
            type: "object",
            name: "featuredItem2",
            label: "Featured Item 2",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Item Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Item Subtitle",
              },
              {
                type: "string",
                name: "text",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "imageUrl",
                label: "Image",
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Image Alt Text",
              },
            ],
          },
          {
            type: "object",
            name: "featuredItem3",
            label: "Featured Item 3",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Item Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Item Subtitle",
              },
              {
                type: "string",
                name: "text",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "imageUrl",
                label: "Image",
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Image Alt Text",
              },
            ],
          },
          // CTA Section
          {
            type: "object",
            name: "ctaSection",
            label: "Call to Action Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "CTA Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "CTA Subtitle",
              },
              {
                type: "string",
                name: "text",
                label: "CTA Text",
              },
              {
                type: "string",
                name: "buttonLabel",
                label: "Button Label",
              },
              {
                type: "string",
                name: "buttonUrl",
                label: "Button URL",
              },
              {
                type: "string",
                name: "colors",
                label: "Color Theme",
                options: [
                  "bg-light-fg-dark",
                  "bg-dark-fg-light",
                  "bg-primary-fg-light",
                ],
              },
            ],
          },
          // Contact Section
          {
            type: "object",
            name: "contactSection",
            label: "Contact Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
              },
              {
                type: "string",
                name: "text",
                label: "Contact Text",
              },
              {
                type: "string",
                name: "buttonLabel",
                label: "Button Label",
              },
              {
                type: "string",
                name: "buttonUrl",
                label: "Button URL",
              },
            ],
          },
          // SEO Section
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: [
              {
                type: "string",
                name: "metaTitle",
                label: "Meta Title",
              },
              {
                type: "string",
                name: "metaDescription",
                label: "Meta Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "boolean",
                name: "addTitleSuffix",
                label: "Add Site Name to Title",
              },
              {
                type: "image",
                name: "socialImage",
                label: "Social Media Image",
              },
            ],
          },
          {
            type: "boolean",
            name: "isDraft",
            label: "Draft",
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
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
            label: "URL Slug",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "body",
            label: "Body",
            ui: {
              component: "textarea",
            },
            isBody: true,
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
