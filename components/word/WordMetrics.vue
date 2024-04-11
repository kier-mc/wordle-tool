<template>
  <article class="metrics">
    <p>
      <span class="metrics__term">"{{ word?.term }}"</span> is
      <template v-if="isPotentialSolution"> a potential solution to Wordle. </template>
      <template v-else> not a solution to Wordle, but it is considered valid input. </template>
      It
      <template v-if="hasDuplicateLetters">
        contains repeat letters ({{ uniqueLetterCount }} are unique)
      </template>
      <template v-else> contains no repeating letters </template>
      and is comprised of {{ consonantCount }} {{ consonantCount > 1 ? "consonants" : "consonant" }} and
      {{ vowelCount }} {{ vowelCount > 1 ? "vowels" : "vowel" }} in total.
    </p>
  </article>
</template>

<style scoped lang="scss">
.metrics {
  &__term {
    text-transform: capitalize;
  }
}
</style>

<script setup lang="ts">
import type { WordData } from "~/types/api.dataset";

const props = defineProps({
  word: { type: [Object, null] as PropType<WordData | null>, default: null, required: true },
});
const { word } = toRefs(props);

const hasDuplicateLetters = computed(() => word.value?.metrics.has_duplicate_letters);
const isPotentialSolution = computed(() => word.value?.metrics.is_potential_solution);
const uniqueLetterCount = computed(() => Object.keys(word.value?.metrics.letter_count ?? []).length);
const consonantCount = computed(() => word?.value?.metrics.consonants ?? 0);
const vowelCount = computed(() => word?.value?.metrics.vowels ?? 0);
</script>
