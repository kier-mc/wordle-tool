<template>
  <article class="finder">
    <section class="section section__correct">
      <h2 class="header header__correct">Correct Letters</h2>
      <InputLetter
        v-for="(_, index) in correct"
        :key="`correct-${index}`"
        v-model:value="correct[index]"
        @keydown="validateLetter($event)"
      />
    </section>
    <section class="section section__valid">
      <h2 class="header header__valid">Valid Letters</h2>
      <InputLetter
        v-for="(_, index) in valid"
        :key="`valid-${index}`"
        v-model:value="valid[index]"
        @keydown="validateLetter($event)"
      />
    </section>
    <section class="section section__absent">
      <h2 class="header header__absent">Absent Letters</h2>
      <InputAbsent v-model:value="absent" @keydown="validateAbsent($event)" />
    </section>
    <section class="controls">
      <AppButton colour="brand" @click="handleClick()">Find Matches</AppButton>
      <AppButton colour="red" @click="resetState()">Clear All</AppButton>
    </section>
  </article>
</template>

<style scoped lang="scss">
@use "../assets/styles/var/size";
.finder {
  display: grid;
  grid-template-rows: repeat(4, auto);
  row-gap: var(--sz-lg);
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
  grid-template-columns: repeat(1, auto);
}
.controls {
  display: flex;
  justify-content: space-between;
}
.header {
  &__correct,
  &__valid {
    grid-column: 1 / 6;
  }
}
</style>

<script setup lang="ts">
import type { WordData } from "~/types/api.dataset";
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

const { findMatches } = useFinder(data);
const matches = useState<WordData[]>("matches");

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

function handleClick() {
  matches.value = findMatches().value;
}

function resetState() {
  correct.value = Object.values(correct.value).map((value) => (value = null));
  valid.value = Object.values(valid.value).map((value) => (value = null));
  absent.value = null;
  matches.value = [];
}
</script>
