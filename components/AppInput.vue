<template>
  <div class="input">
    <label :class="setLabelClass" :for="id">{{ label }}</label>
    <div class="input__wrapper" aria-hidden="true">
      <!-- Correct or valid input -->
      <input
        v-if="type === 'correct' || type === 'valid'"
        :class="setInputClass"
        :id="id"
        :name="id"
        :value="value"
        @keydown="validateKeypress($event)"
        @input="handleInput($event)"
        autocomplete="off"
        maxlength="1"
        type="text"
      />
      <!-- Absent input -->
      <input
        v-else-if="type === 'absent'"
        :class="setInputClass"
        :id="id"
        :name="id"
        :value="value"
        @keydown="validateKeypress($event)"
        @input="handleInput($event)"
        autocomplete="off"
        type="text"
      />
      <!-- Base (generic) input -->
      <input
        v-else
        :class="setInputClass"
        :id="id"
        :name="id"
        :value="value"
        @input="handleInput($event)"
        type="text"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/var/mixin";
.input {
  display: grid;
  grid-auto-rows: auto;
  &:focus-within {
    .input__wrapper::before {
      opacity: 1;
    }
  }
  &__label {
    &--visually-hidden {
      @include mixin.visuallyHidden();
    }
  }
  &__wrapper {
    position: relative;
    // Generates focused border
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      margin: calc(var(--sz-border-md) * -1);
      z-index: -10;
      background-color: var(--cl-focus-highlight);
      opacity: 0;
      transition: opacity 500ms var(--ef-out-quart);
    }
  }
  &__element {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    padding: var(--sz-xs);
    border: var(--sz-border-md) solid var(--cl-input-border);
    background-color: var(--cl-input-background);
    font-size: var(--sz-text-md);
    color: var(--cl-input-text);
    transition: outline 500ms var(--ef-out-quart);
    &:focus {
      outline: var(--sz-border-md) solid var(--cl-focus-highlight);
    }
    &--correct,
    &--valid {
      aspect-ratio: 1 / 1;
      height: var(--sz-2xl);
      font-size: var(--sz-text-xl);
      text-align: center;
      text-transform: uppercase;
    }
    &--absent {
      font-size: var(--sz-text-lg);
      text-transform: uppercase;
    }
  }
}
</style>

<script setup lang="ts">
import type { ValidInputStyle } from "~/types/components.app";

const props = defineProps({
  id: { type: String as PropType<string>, default: "" },
  label: { type: String as PropType<string>, default: "" },
  value: { type: [String, null] as PropType<string | null>, default: null },
  type: { type: String as PropType<ValidInputStyle>, default: "base" },
});

const { id, label, value, type } = toRefs(props);

const emits = defineEmits<{
  (event: "update:value", value: string | null): void;
}>();

function emitValue(value: string): void {
  emits("update:value", value);
}

function emitNull(): void {
  emits("update:value", null);
}

const setLabelClass = computed((): string => {
  const { value } = type;
  return value === "base" ? "input__label" : "input__label--visually-hidden";
});

const setInputClass = computed((): string => {
  const { value } = type;
  return value === "base" ? "input__element" : `input__element input__element--${value}`;
});

function validateKeypress(event: KeyboardEvent): void {
  const { key } = event;
  const keys = value.value ?? "";
  if (shouldIgnoreKey(key)) return;
  if (isAlphabetical(key) && !keys.includes(key!)) return;
  event.preventDefault();
}

function handleInput(event: Event): void {
  const { value } = event.target as HTMLInputElement;
  const input = value.toLowerCase();
  if (!value) return emitNull();
  emitValue(input);
}
</script>
