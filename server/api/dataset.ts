import dataset from "~/public/assets/data/dataset.json";
import type { WordData } from "~/types/api.dataset";

export default defineEventHandler(async (event) => {
  return dataset as WordData[];
});
