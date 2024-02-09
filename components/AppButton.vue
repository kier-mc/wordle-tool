<template>
  <button :class="setClass" type="button"><slot /></button>
</template>

<style scoped lang="scss">
.button {
  --border-size: var(--sz-border-sm);
  all: unset;
  cursor: pointer;
  max-width: max-content;
  padding-inline: var(--sz-lg);
  padding-block: var(--sz-sm);
  border: var(--border-size) solid var(--cl-button-border);
  background-color: var(--cl-button-background);
  font-weight: 600;
  text-transform: uppercase;
  color: var(--cl-button-text);
  transition: background-color 500ms var(--ef-out-quart), color 500ms var(--ef-out-quart);
  &--brand {
    border: var(--border-size) solid var(--cl-button-brand-border);
    background-color: var(--cl-button-brand-background);
    color: var(--cl-button-brand-text);
  }
  &--red {
    border: var(--border-size) solid var(--cl-button-red-border);
    background-color: var(--cl-button-red-background);
    color: var(--cl-button-red-text);
  }
  &--yellow {
    border: var(--border-size) solid var(--cl-button-yellow-border);
    background-color: var(--cl-button-yellow-background);
    color: var(--cl-button-yellow-text);
  }
  &--green {
    border: var(--border-size) solid var(--cl-button-green-border);
    background-color: var(--cl-button-green-background);
    color: var(--cl-button-green-text);
  }
}
</style>

<script setup lang="ts">
type ValidStyle = "base" | "brand" | "red" | "yellow" | "green";

const props = defineProps({
  colour: { type: String as PropType<ValidStyle>, default: "base" },
});

const { colour } = toRefs(props);

const setClass = computed(() => {
  switch (colour.value) {
    case "base":
      return "button";
    case "brand":
      return "button button--brand";
    case "red":
      return "button button--red";
    case "yellow":
      return "button button--yellow";
    case "green":
      return "button button--green";
  }
});
</script>
