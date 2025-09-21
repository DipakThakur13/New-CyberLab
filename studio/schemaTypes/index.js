// studio/schemas/index.js
import post from "./post";
import author from "./author";
import category from "./category";
import blockContent from "./blockContent";
import seo from "./seo";
import codeBlock from "./codeBlock";
import callout from "./callout";
import embed from "./embed";

export const schemaTypes = [
  post,
  author,
  category,
  blockContent,
  seo,
  codeBlock,
  callout,
  embed
  // add other schemas...
];
