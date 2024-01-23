import type { WordData } from "~/types/api.dataset";

export default defineEventHandler(async (event) => {
  const response = await useStorage<WordData[]>("assets:data").getItem(
    "dataset.json"
  );
  return response;
});
