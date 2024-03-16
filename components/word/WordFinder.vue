<template>
  <article class="finder">
    <h2>Word Finder</h2>
    <section class="letters letters--correct" aria-labelledby="header-correct">
      <h3 class="letters__header letters__header--correct" id="header-correct">Correct Letters</h3>
      <FormInput
        v-for="(_, index) in correct"
        :key="`correct-${index}`"
        type="correct"
        :id="`input-correct-${index}`"
        :label="`Correct letter ${+index + 1}`"
        v-model:value="correct[index]"
        @keydown="validateLetter($event)"
      />
    </section>
    <section class="letters letters--valid" aria-labelledby="header-valid">
      <h3 class="letters__header letters__header--valid" id="header-valid">Valid Letters</h3>
      <FormInput
        v-for="(_, index) in valid"
        :key="`valid-${index}`"
        type="valid"
        :id="`input-valid-${index}`"
        :label="`Valid letter ${+index + 1}`"
        v-model:value="valid[index]"
        @keydown="validateLetter($event)"
      />
    </section>
    <section class="letters letters--absent" aria-labelledby="header-absent">
      <h3 class="letters__header letters__header--absent" id="header-absent">Absent Letters</h3>
      <FormInput
        type="absent"
        id="input-absent"
        label="Absent letters"
        v-model:value="absent"
        @keydown="validateAbsent($event)"
      />
    </section>
    <section class="controls">
      <AppButton colour="brand" @click="findMatches()">Find Matches</AppButton>
      <AppButton colour="red" @click="resetState()">Clear All</AppButton>
    </section>
  </article>
</template>

<style scoped lang="scss">
@use "../assets/styles/var/size";
.finder {
  display: grid;
  grid-template-rows: repeat(5, auto);
  row-gap: var(--sz-lg);
  margin-inline: auto;
}
.letters {
  display: grid;
  grid-template-rows: repeat(2, auto);
  row-gap: var(--sz-xs);
  justify-content: center;
  &__header {
    &--correct,
    &--valid {
      grid-column: 1 / 6;
    }
  }
}
.letters--correct,
.letters--valid {
  grid-template-columns: repeat(5, auto);
  column-gap: var(--sz-xs);
}
.letters--absent {
  grid-template-columns: repeat(1, 1fr);
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>

<script setup lang="ts">
const { state, findMatches, resetState } = useFinder();
const { correct, valid, absent } = toRefs(state.value);

function validateLetter(event: KeyboardEvent) {
  const { key } = event;
  const prohibited = absent.value;
  if (!prohibited || !prohibited.includes(key)) return;
  event.preventDefault();
}

function validateAbsent(event: KeyboardEvent) {
  const { key } = event;
  const setA = Object.values(correct.value);
  const setB = Object.values(valid.value);
  const prohibited = [...setA, ...setB].filter(Boolean);
  if (!prohibited.includes(key)) return;
  event.preventDefault();
}
</script>
