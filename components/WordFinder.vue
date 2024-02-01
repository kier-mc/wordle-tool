<template>
  <article class="finder">
    <section class="section section__correct">
      <h2 class="header">Correct Letters</h2>
      <InputLetter
        v-for="(_, index) in correct"
        :key="`correct-${index}`"
        v-model:value="correct[index]"
      />
    </section>
    <section class="section section__valid">
      <h2 class="header">Valid Letters</h2>
      <InputLetter
        v-for="(_, index) in valid"
        :key="`valid-${index}`"
        v-model:value="valid[index]"
      />
    </section>
    <section class="section section__absent">
      <h2 class="header">Absent Letters</h2>
      <InputAbsent v-model:value="absent" />
    </section>
  </article>
</template>

<style scoped lang="scss">
.finder {
  display: grid;
  grid-template-rows: repeat(3, auto);
  row-gap: var(--sz-lg);
  justify-content: center;
  max-width: 60ch;
  margin-inline: auto;
}
.section {
  display: grid;
  grid-template-rows: repeat(2, auto);
  justify-content: center;
}
.section__correct,
.section__valid {
  grid-template-columns: repeat(5, auto);
  column-gap: var(--sz-xs);
}
.section__absent {
  grid-template-columns: repeat(1, 1fr);
}
.header {
  grid-column: 1 / 6;
}
</style>

<script setup lang="ts">
import type { FinderState } from "~/types/components.word";

const data = ref<FinderState>({
  correct: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  },
  valid: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  },
  absent: null,
});

const { correct, valid, absent } = toRefs(data.value);
</script>
