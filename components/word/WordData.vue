<template>
  <AppButton class="word" colour="brand">
    {{ word.term }}
  </AppButton>
</template>

<style scoped lang="scss">
.word {
  font-weight: 400;
  width: 100%;
}
</style>

<script setup lang="ts">
import type { WordData } from "~/types/api.dataset";

const props = defineProps({
  word: { type: Object as PropType<WordData>, required: true },
});
const { word } = toRefs(props);
</script>
