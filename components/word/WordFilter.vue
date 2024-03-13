<template>
  <article class="filters">
    <h2>Filters</h2>
    <AppTabs :tabs="tabs" v-model:active-tab="activeTab">
      <template v-slot:flags>
        <FormSwitch
          id="switch-potential-solutions"
          label="Accepted Solutions Only"
          :disabled="disable.isPotentialSolution.value"
          v-model:value="flags.isPotentialSolution"
        />
        <FormSwitch
          id="switch-potential-solutions"
          label="Valid Input Only"
          :disabled="disable.isNotPotentialSolution.value"
          v-model:value="flags.isNotPotentialSolution"
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
const filters = useFilter().filters;
const { flags } = toRefs(filters.value);

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
</script>
