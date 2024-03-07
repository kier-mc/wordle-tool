<template>
  <button :class="setClass" type="button" :disabled="disabled" :aria-disabled="disabled">
    <span class="content"><slot /></span>
  </button>
</template>

<style scoped lang="scss">
.button {
  --border-size: var(--sz-border-sm);

  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  height: max-content;
  padding-inline: var(--sz-lg);
  padding-block: var(--sz-sm);
  border: var(--border-size) solid var(--cl-button-border);
  background-color: var(--cl-button-background);
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: var(--cl-button-text);
  // prettier-ignore
  transition:
    outline 500ms var(--ef-out-quart),
    background-color 500ms var(--ef-out-quart),
    opacity 500ms var(--ef-out-quart),
    color 500ms var(--ef-out-quart);
  // Generates hover overlay
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--cl-button-highlight);
    opacity: 0;
    transition: opacity 500ms var(--ef-out-quart);
  }
  &:hover {
    &::before {
      opacity: 0.125;
    }
    & .content::before {
      transform: scaleX(1);
      opacity: 0.75;
    }
  }
  // Generates focused border
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    margin: calc(var(--sz-border-lg) * -1);
    z-index: -10;
    background-color: var(--cl-focus-highlight);
    opacity: 0;
    transition: opacity 500ms var(--ef-out-quart);
  }
  &:focus {
    outline: var(--sz-border-md) solid var(--cl-focus-highlight);
    &::after {
      opacity: 1;
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    &::before {
      opacity: 0.25;
    }
    & .content::before {
      transform: scaleX(0);
    }
  }
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
.content {
  position: relative;
  // Generates hover underline
  &::before {
    content: "";
    position: absolute;
    inset: calc(var(--sz-text-md) + 25%) 0 0 0;
    height: var(--sz-border-md);
    transform: scaleX(0);
    transform-origin: center;
    background-color: v-bind(setUnderlineColour);
    opacity: 0;
    transition: transform 250ms var(--ef-out-quart), opacity 300ms var(--ef-out-quart);
  }
}
</style>

<script setup lang="ts">
import type { ValidColour } from "~/types/components.app";

const props = defineProps({
  colour: { type: String as PropType<ValidColour>, default: "base" },
  disabled: { type: Boolean as PropType<boolean>, default: false },
});

const { colour, disabled } = toRefs(props);

const setClass = computed(() => {
  const { value } = colour;
  return value === "base" ? "button" : `button button--${value}`;
});

const setUnderlineColour = computed(() => {
  const { value } = colour;
  return value === "base" ? "var(--cl-button-text)" : `var(--cl-button-${value}-text)`;
});
</script>
