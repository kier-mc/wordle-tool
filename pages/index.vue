<template>
  <WordFinder />
  <WordFilter />
  <WordMatches />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import type { WordData } from "~/types/api.dataset";

const matches = useState<WordData[]>("matches", () => shallowRef([]));
const localMatches = useState<WordData[]>("local-matches", () => shallowRef([]));
/**
 * Synchronises core matches (directly from the finder component) with local matches (intended
 * for filtering, sorting values etc. from the core matches).
 */
function syncLocalMatches(): void {
  if (!matches.value.length) {
    localMatches.value = [];
    return;
  }
  localMatches.value = matches.value;
}
watch(matches, () => syncLocalMatches(), { immediate: true });
</script>
