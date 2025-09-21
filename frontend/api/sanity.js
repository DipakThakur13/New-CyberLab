// frontend/api/sanity.js
// Vercel / Netlify serverless-style handler (CommonJS)
const sanityClient = require("@sanity/client");

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const apiVersion = process.env.VITE_SANITY_API_VERSION || "2024-06-01";
const token = process.env.SANITY_READ_TOKEN; // <- set this in Vercel (PROJECT SETTINGS -> Environment Variables)

const client = sanityClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

module.exports = async (req, res) => {
  // Allow simple health check
  if (req.method === "GET" && req.query._health) {
    return res.status(200).json({ ok: true });
  }

  // Accept JSON body POST { query, params }
  try {
    const { query, params } = req.method === "POST" ? req.body : req.query;
    if (!query) return res.status(400).json({ error: "Missing query" });

    const data = await client.fetch(query, params || {});
    return res.status(200).json({ result: data });
  } catch (err) {
    console.error("Sanity proxy error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
};
