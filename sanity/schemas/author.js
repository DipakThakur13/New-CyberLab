import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./schemas";

export default defineConfig({
  title: "CyberLab Studio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [deskTool()],
  schema: {
    types: schemas
  }
});
