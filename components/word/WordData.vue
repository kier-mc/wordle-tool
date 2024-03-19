<template>
  <li class="word">
    <AppButton class="word__button" colour="brand">{{ word.term }}</AppButton>
  </li>
</template>

<style scoped lang="scss">
.word {
  all: unset;
  &__button {
    font-weight: 400;
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import type { WordData } from "~/types/api.dataset";

const props = defineProps({
  word: { type: Object as PropType<WordData>, required: true },
});
const { word } = toRefs(props);
</script>
