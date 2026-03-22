// TinaCMS configuration - Aligned with sections-based content structure
import { defineConfig } from "tinacms";

// Tina field definitions for reusable components (blocks)
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
    {
      type: "object" as const,
      name: "styles",
      label: "Styles",
      fields: [
        {
          type: "object" as const,
          name: "self",
          label: "Self",
          fields: [
            {
              type: "string" as const,
              name: "textAlign",
              label: "Text Align",
            },
            {
              type: "string" as const,
              name: "fontWeight",
              label: "Font Weight",
            },
          ],
        },
      ],
    },
  ],
};

const imageBlockFields = {
  type: "object" as const,
  name: "ImageBlock",
  label: "Image Block",
  fields: [
    {
      type: "string" as const,
      name: "url",
      label: "Image URL",
    },
    {
      type: "string" as const,
      name: "altText",
      label: "Alt Text",
    },
    {
      type: "string" as const,
      name: "elementId",
      label: "Element ID",
    },
    {
      type: "object" as const,
      name: "styles",
      label: "Styles",
      fields: [
        {
          type: "object" as const,
          name: "self",
          label: "Self",
          fields: [
            {
              type: "string" as const,
              name: "borderRadius",
              label: "Border Radius",
            },
          ],
        },
      ],
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
    },
    {
      type: "string" as const,
      name: "label",
      label: "Label",
    },
    {
      type: "string" as const,
      name: "altText",
      label: "Alt Text",
    },
    {
      type: "string" as const,
      name: "url",
      label: "URL",
    },
    {
      type: "boolean" as const,
      name: "showIcon",
      label: "Show Icon",
    },
    {
      type: "string" as const,
      name: "icon",
      label: "Icon",
    },
    {
      type: "string" as const,
      name: "iconPosition",
      label: "Icon Position",
      options: ["left", "right"],
    },
    {
      type: "string" as const,
      name: "style",
      label: "Style",
      options: ["primary", "secondary", "outline"],
    },
    {
      type: "string" as const,
      name: "elementId",
      label: "Element ID",
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
      name: "title",
      label: "Title",
    },
    {
      type: "string" as const,
      name: "tagline",
      label: "Tagline",
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
      type: "object" as const,
      name: "image",
      label: "Image",
      fields: imageBlockFields.fields,
    },
    {
      type: "array" as const,
      name: "actions",
      label: "Actions (Buttons)",
      of: [{ type: "object", name: "action", fields: buttonFields.fields }],
    },
    {
      type: "string" as const,
      name: "colors",
      label: "Color Theme",
      options: [
        "bg-light-fg-dark",
        "bg-dark-fg-light",
        "bg-neutral-fg-dark",
        "bg-neutralAlt-fg-dark",
      ],
    },
    {
      type: "object" as const,
      name: "styles",
      label: "Styles",
      fields: [
        {
          type: "object" as const,
          name: "self",
          label: "Self",
          fields: [
            {
              type: "string" as const,
              name: "padding",
              label: "Padding",
            },
            {
              type: "string" as const,
              name: "borderRadius",
              label: "Border Radius",
            },
            {
              type: "string" as const,
              name: "flexDirection",
              label: "Flex Direction",
            },
            {
              type: "string" as const,
              name: "justifyContent",
              label: "Justify Content",
            },
            {
              type: "string" as const,
              name: "textAlign",
label: "Text Align",
            },
            {
              type: "string" as const,
              name: "margin",
              label: "Margin",
            },
            {
              type: "string" as const,
              name: "borderColor",
              label: "Border Color",
            },
            {
              type: "string" as const,
              name: "borderWidth",
              label: "Border Width",
            },
            {
              type: "string" as const,
              name: "borderStyle",
              label: "Border Style",
            },
          ],
        },
      ],
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
    },
    {
      type: "object" as const,
      name: "title",
      label: "Title",
      fields: titleBlockFields.fields,
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
      type: "array" as const,
      name: "actions",
      label: "Actions (Buttons)",
      of: [{ type: "object", name: "action", fields: buttonFields.fields }],
    },
    {
      type: "object" as const,
      name: "media",
      label: "Media",
      fields: imageBlockFields.fields,
    },
    {
      type: "object" as const,
      name: "badge",
      label: "Badge",
      fields: badgeFields.fields,
    },
    {
      type: "string" as const,
      name: "elementId",
      label: "Element ID",
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
    {
      type: "object" as const,
      name: "styles",
      label: "Styles",
      fields: [
        {
          type: "object" as const,
          name: "self",
          label: "Self",
          fields: [
            {
              type: "string" as const,
              name: "alignItems",
              label: "Align Items",
            },
            {
              type: "string" as const,
              name: "flexDirection",
              label: "Flex Direction",
            },
            {
              type: "string" as const,
              name: "padding",
              label: "Padding",
            },
            {
              type: "string" as const,
              name: "justifyContent",
              label: "Justify Content",
            },
            {
              type: "string" as const,
              name: "margin",
              label: "Margin",
            },
          ],
        },
        {
          type: "object" as const,
          name: "text",
          label: "Text Styles",
          fields: [
            {
              type: "string" as const,
              name: "textAlign",
              label: "Text Align",
            },
          ],
        },
        {
          type: "object" as const,
          name: "subtitle",
          label: "Subtitle Styles",
          fields: [
            {
              type: "string" as const,
              name: "textAlign",
              label: "Text Align",
            },
            {
              type: "string" as const,
              name: "fontWeight",
              label: "Font Weight",
            },
          ],
        },
      ],
    },
  ],
};

const featuredItemsSectionFields = {
  type: "object" as const,
  name: "FeaturedItemsSection",
  label: "Featured Items Section",
  fields: [
    {
      type: "object" as const,
      name: "title",
      label: "Title",
      fields: titleBlockFields.fields,
    },
    {
      type: "string" as const,
      name: "subtitle",
      label: "Subtitle",
    },
    {
      type: "array" as const,
      name: "items",
      label: "Items",
      of: [{ type: "object", name: "item", fields: featuredItemFields.fields }],
    },
    {
      type: "array" as const,
      name: "actions",
      label: "Section Actions",
      of: [{ type: "object", name: "action", fields: buttonFields.fields }],
    },
    {
      type: "string" as const,
      name: "elementId",
      label: "Element ID",
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
    {
      type: "object" as const,
      name: "styles",
      label: "Styles",
      fields: [
        {
          type: "object" as const,
          name: "self",
          label: "Self",
          fields: [
            {
              type: "string" as const,
              name: "padding",
              label: "Padding",
            },
            {
              type: "string" as const,
              name: "justifyContent",
              label: "Justify Content",
            },
            {
              type: "string" as const,
              name: "margin",
              label: "Margin",
            },
          ],
        },
        {
          type: "object" as const,
          name: "subtitle",
          label: "Subtitle Styles",
          fields: [
            {
              type: "string" as const,
              name: "textAlign",
              label: "Text Align",
            },
            {
              type: "string" as const,
              name: "fontWeight",
              label: "Font Weight",
            },
          ],
        },
      ],
    },
  ],
};

const dividerSectionFields = {
  type: "object" as const,
  name: "DividerSection",
  label: "Divider Section",
  fields: [
    {
      type: "string" as const,
      name: "title",
      label: "Title",
    },
    {
      type: "string" as const,
      name: "elementId",
      label: "Element ID",
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
    {
      type: "object" as const,
      name: "styles",
      label: "Styles",
      fields: [
        {
          type: "object" as const,
          name: "self",
          label: "Self",
          fields: [
            {
              type: "string" as const,
              name: "padding",
              label: "Padding",
            },
          ],
        },
      ],
    },
  ],
};

const carouselSectionFields = {
  type: "object" as const,
  name: "CarouselSection",
  label: "Carousel Section",
  fields: [
    {
      type: "object" as const,
      name: "title",
      label: "Title",
      fields: titleBlockFields.fields,
    },
    {
      type: "string" as const,
      name: "subtitle",
      label: "Subtitle",
    },
    {
      type: "array" as const,
      name: "items",
      label: "Items",
      of: [{ type: "object", name: "item", fields: featuredItemFields.fields }],
    },
    {
      type: "string" as const,
      name: "elementId",
      label: "Element ID",
    },
    {
      type: "string" as const,
      name: "variant",
      label: "Variant",
      options: ["next-prev-nav"],
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
    {
      type: "object" as const,
      name: "styles",
      label: "Styles",
      fields: [
        {
          type: "object" as const,
          name: "self",
          label: "Self",
          fields: [
            {
              type: "string" as const,
              name: "justifyContent",
              label: "Justify Content",
            },
            {
              type: "string" as const,
              name: "padding",
              label: "Padding",
            },
          ],
        },
        {
          type: "object" as const,
          name: "subtitle",
          label: "Subtitle Styles",
          fields: [
            {
              type: "string" as const,
              name: "textAlign",
              label: "Text Align",
            },
            {
              type: "string" as const,
              name: "fontWeight",
              label: "Font Weight",
            },
          ],
        },
      ],
    },
  ],
};

const metaTagFields = {
  type: "object" as const,
  name: "MetaTag",
  label: "Meta Tag",
  fields: [
    {
      type: "string" as const,
      name: "content",
      label: "Content",
    },
    {
      type: "string" as const,
      name: "property",
      label: "Property",
    },
  ],
};

const seoFields = {
  type: "object" as const,
  name: "Seo",
  label: "SEO",
  fields: [
    {
      type: "object" as const,
      name: "title",
      label: "Title Block",
      fields: titleBlockFields.fields,
    },
    {
      type: "string" as const,
      name: "subtitle",
      label: "Subtitle",
    },
    {
      type: "string" as const,
      name: "text",
      label: "Text",
    },
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
      type: "string" as const,
      name: "metaTags",
      label: "Meta Tags",
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

// Section union type for the sections array
const sectionFields = [
  { type: "object", name: "GenericSection", fields: genericSectionFields.fields },
  { type: "object", name: "FeaturedItemsSection", fields: featuredItemsSectionFields.fields },
  { type: "object", name: "DividerSection", fields: dividerSectionFields.fields },
  { type: "object", name: "CarouselSection", fields: carouselSectionFields.fields },
];

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
          // Sections - matches the content structure
          {
            type: "object",
            name: "sections",
            label: "Page Sections",
            fields: sectionFields,
          },
          // SEO Section
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: seoFields.fields,
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
