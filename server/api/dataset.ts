import type { WordData } from "~/types/api.dataset";
import fs from "fs";
import path from "path";

function getDatasetPath() {
  if (process.dev) return path.resolve("./public/assets/data", "dataset.json");
  return path.resolve("./assets/data", "dataset.json");
}

export default defineEventHandler(async (event) => {
  const dataset = getDatasetPath();
  console.log(`Using path: ${dataset}`);
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
