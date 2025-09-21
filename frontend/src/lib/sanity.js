// src/lib/sanity.js
import sanityClient from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "k6ix4pv9";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2024-06-01";
const useCdn = import.meta.env.VITE_SANITY_USE_CDN === "true";

// if no projectId provided, we fall back to mock mode so the app doesn't crash
export const isMock = !projectId;

// If projectId exists create a real client, otherwise provide a mock-like client
export const client = !isMock
  ? sanityClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      // leave token out for frontend; for preview/drafts you'll use server-side token
    })
  : {
      // simple stub so client.fetch(...) won't throw — returns [] by default
      fetch: async () => {
        console.warn("Sanity client not configured (VITE_SANITY_PROJECT_ID missing). Using mock fallback.");
        return [];
      }
    };
