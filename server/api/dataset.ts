import type { WordData } from "~/types/api.dataset";
import fs from "fs";
import path from "path";

function getDatasetPath() {
  if (process.dev) return path.resolve("./public/assets/data", "dataset.json");
  return new URL("./assets/data/dataset.json", import.meta.url);
}

export default defineEventHandler(async (event) => {
  const dataset = getDatasetPath();
  try {
    const data = fs.readFileSync(dataset, "utf-8");
    return JSON.parse(data) as WordData[];
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
