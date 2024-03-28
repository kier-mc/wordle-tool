<template>
  <article class="filters">
    <h2>Filters</h2>
    <AppTabs :tabs="tabs" v-model:active-tab="activeTab">
      <template v-slot:solution>
        <FormSwitch
          id="switch-potential-solutions"
          label="Accepted Solutions Only"
          :disabled="isDisabled.isPotentialSolution.value"
          v-model:value="flags.isPotentialSolution"
        />
        <FormSwitch
          id="switch-not-potential-solutions"
          label="Valid Input Only"
          :disabled="isDisabled.isNotPotentialSolution.value"
          v-model:value="flags.isNotPotentialSolution"
        />
      </template>
      <template v-slot:composition>
        <FormSwitch
          id="switch-duplicate-letters"
          label="Duplicate Letter Words"
          :disabled="isDisabled.hasDuplicateLetters.value"
          v-model:value="flags.hasDuplicateLetters"
        />
        <FormSwitch
          id="switch-unique-letters"
          label="Unique Letter Words"
          :disabled="isDisabled.hasUniqueLetters.value"
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
  { id: "solution", label: "Solution" },
  { id: "composition", label: "Word Composition" },
];
const activeTab = ref<string>(tabs[0].id);

const isDisabled = {
  isPotentialSolution: computed(() => flags.value.isNotPotentialSolution || activeTab.value !== "solution"),
  isNotPotentialSolution: computed(() => flags.value.isPotentialSolution || activeTab.value !== "solution"),
  hasDuplicateLetters: computed(() => flags.value.hasUniqueLetters || activeTab.value !== "composition"),
  hasUniqueLetters: computed(() => flags.value.hasDuplicateLetters || activeTab.value !== "composition"),
};
</script>
