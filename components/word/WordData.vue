<template>
  <li class="word">
    <AppButton class="result" colour="brand" @click="handleClick()">{{ word }}</AppButton>
  </li>
</template>

<style scoped lang="scss">
.word {
  all: unset;
}
.result {
  font-weight: 400;
  width: 100%;
}
</style>

<script setup lang="ts">
import type { ValidWord } from "~/types/unions/api.dataset";

const props = defineProps({
  word: { type: String as PropType<ValidWord>, required: true },
});

const { word } = toRefs(props);

const { getWordMetrics } = useDataset();

function handleClick() {
  const { term, metrics } = getWordMetrics(word)[0];
  console.log(metrics);
}
</script>
