<template>
  <article class="filters">
    <h2>Filters</h2>
    <AppTabs :tabs="tabs" v-model:active-tab="activeTab">
      <template v-slot:flags>
        <FormSwitch
          id="switch-potential-solutions"
          label="Accepted Solutions Only"
          :disabled="disable.isPotentialSolution.value"
          v-model:value="filters.flags.isPotentialSolution"
        />
        <FormSwitch
          id="switch-potential-solutions"
          label="Valid Input Only"
          :disabled="disable.isNotPotentialSolution.value"
          v-model:value="filters.flags.isNotPotentialSolution"
        />
      </template>
      <template v-slot:composition>
        <FormSwitch
          id="switch-duplicate-letters"
          label="Duplicate Letter Words"
          :disabled="disable.hasDuplicateLetters.value"
          v-model:value="flags.hasDuplicateLetters"
        />
        <FormSwitch
          id="switch-unique-letters"
          label="Unique Letter Words"
          :disabled="disable.hasUniqueLetters.value"
          v-model:value="flags.hasUniqueLetters"
        />
      </template>
    </AppTabs>
  </article>
</template>

<style scoped lang="scss">
.filters {
  display: grid;
  row-gap: var(--sz-xs);
}
.filter {
  display: grid;
  row-gap: var(--sz-xs);
  padding: var(--sz-xs);
  background-color: var(--cl-footer);
}
</style>

<script setup lang="ts">
import type { WordData } from "~/types/api.dataset";
import type { Filters, FilterConditions, FilterPredicate } from "~/types/components.word";

const matches = useState<WordData[]>("matches");
const localMatches = useState<WordData[]>("local-matches");

const tabs = [
  { id: "flags", label: "Solution" },
  { id: "composition", label: "Word Composition" },
];
const activeTab = ref<string>(tabs[0].id);

const disable = (function () {
  const tab = computed(() => activeTab.value);

  const isPotentialSolution = computed(() => {
    return flags.value.isNotPotentialSolution || tab.value !== "flags";
  });
  const isNotPotentialSolution = computed(() => {
    return flags.value.isPotentialSolution || tab.value !== "flags";
  });
  const hasDuplicateLetters = computed(() => {
    return flags.value.hasUniqueLetters || tab.value !== "composition";
  });
  const hasUniqueLetters = computed(() => {
    return flags.value.hasDuplicateLetters || tab.value !== "composition";
  });

  return {
    isPotentialSolution,
    isNotPotentialSolution,
    hasDuplicateLetters,
    hasUniqueLetters,
  };
})();

const filters = ref<Filters>({
  flags: {
    isPotentialSolution: false,
    isNotPotentialSolution: false,
    hasDuplicateLetters: false,
    hasUniqueLetters: false,
  },
  composition: {
    consonants: 0,
    vowels: 0,
  },
});
const { flags } = toRefs(filters.value);

const conditions: FilterConditions = {
  isPotentialSolution: (word) => word.metrics.is_potential_solution,
  isNotPotentialSolution: (word) => !word.metrics.is_potential_solution,
  hasDuplicateLetters: (word) => word.metrics.has_duplicate_letters,
  hasUniqueLetters: (word) => !word.metrics.has_duplicate_letters,
};

function filterFlags(): FilterPredicate[] {
  const predicates: ((word: WordData) => boolean)[] = [];

  Object.entries(filters.value.flags).forEach(([filter, bool]) => {
    if (bool) predicates.push(conditions[filter as keyof Filters["flags"]]);
  });

  return predicates;
}

function filterMatches(): WordData[] {
  const payload = ref<WordData[]>(matches.value);
  const predicates = ref<((word: WordData) => boolean)[]>([]);

  predicates.value = [...filterFlags()];
  const condition = (word: WordData) => predicates.value.every((predicate) => predicate(word));

  if (!predicates.value.length) return matches.value;
  return payload.value.filter(condition);
}

function syncLocalMatches(): void {
  localMatches.value = filterMatches();
}

watch(filters, () => syncLocalMatches(), { deep: true });
watch(matches, () => syncLocalMatches());
</script>
