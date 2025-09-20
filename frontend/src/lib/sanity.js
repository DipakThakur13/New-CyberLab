import sanityClient from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const client = sanityClient({
  projectId,
  dataset,
  useCdn: true, // set to false if you need fresh content while developing
  apiVersion: "2024-12-01"
});
