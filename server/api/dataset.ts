import type { WordData } from "~/types/api.dataset";
import fs from "fs";
import path from "path";

function getDatasetPath() {
  if (process.dev) return path.resolve("./public/assets/data", "dataset.json");
  return "https://wordle-tool-git-dev-kier-mcs-projects.vercel.app/assets/data/dataset.json";
}

export default defineEventHandler(async (event) => {
  const dataset = getDatasetPath();
  console.log(`Using path: ${dataset}`);
  try {
    const response = await $fetch(dataset);
    return response as WordData[];
  } catch (error) {
    console.error("Error fetching JSON file");
    return {
      status: 500,
      body: { error: error },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
});
