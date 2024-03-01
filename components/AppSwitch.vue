<template>
  <div class="switch">
    <label class="switch__label" :id="`${id}-label`" :for="id">{{ label }}</label>
    <input
      class="switch__input"
      type="checkbox"
      ref="input"
      :id="id"
      :name="id"
      :aria-labelledby="`${id}-label`"
      @input="handleCheck()"
    />
    <span class="switch__track" @click="handleClick()" aria-hidden="true"></span>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/var/mixin";
.switch {
  --track-width: var(--sz-xl);
  --track-height: calc(var(--track-width) / 2);
  --cursor-inset: calc(var(--track-width) / 12);
  --cursor-size: calc(var(--track-height) - calc(var(--cursor-inset) * 2));

  all: unset;
  isolation: isolate;
  display: grid;
  grid-template-columns: 1fr max-content;
  column-gap: var(--sz-sm);
  align-items: center;
  padding: var(--sz-xs);
  &:focus-within,
  &:active {
    .switch__track::after {
      opacity: 1;
    }
  }
  &__input {
    transition: outline 500ms var(--ef-out-quart);
    &[type="checkbox"] {
      @include mixin.visuallyHidden();
    }
    &:checked + .switch__track {
      background-color: var(--cl-switch-background-active);
    }
    &:checked + .switch__track::before {
      --position: calc(100% - var(--cursor-size) - var(--cursor-inset));

      inset: 0 0 0 var(--position);
      background-color: var(--cl-switch-handle-active);
    }
    &:focus {
      outline: var(--sz-border-md) solid var(--cl-focus-highlight);
    }
  }
  &__track {
    --inner-radius: calc(var(--cursor-size) / 2);
    --outer-radius: var(--cursor-size);

    cursor: pointer;
    position: relative;
    width: var(--track-width);
    height: var(--track-height);
    border-radius: var(--outer-radius);
    background-color: var(--cl-switch-background);
    transition: background-color 500ms var(--ef-out-quart);
    // Switch handle
    &::before {
      content: "";
      position: absolute;
      inset: 0 0 0 var(--cursor-inset);
      aspect-ratio: 1/1;
      width: var(--cursor-size);
      border-radius: var(--inner-radius);
      margin-block: auto;
      background-color: var(--cl-switch-handle);
      transition: inset 500ms var(--ef-out-quart);
    }
    // Generates focused border
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: var(--outer-radius);
      margin: calc(var(--sz-border-md) * -1);
      z-index: -10;
      background-color: var(--cl-focus-highlight);
      opacity: 0;
      transition: opacity 500ms var(--ef-out-quart);
    }
  }
}
</style>

<script setup lang="ts">
const props = defineProps({
  id: { type: String as PropType<string> },
  label: { type: String as PropType<string> },
  value: { type: Boolean as PropType<boolean>, default: false },
});

const emits = defineEmits<{
  (event: "update:value", value: boolean): void;
}>();

const { id, label, value } = toRefs(props);

const input = ref<HTMLInputElement | null>(null);

function emitValue(value: boolean) {
  if (!input.value) return;
  input.value.checked = value;
  emits("update:value", value);
}

function handleCheck() {
  if (!input.value) return;
  const { checked } = input.value;
  emitValue(checked);
}

function handleClick() {
  if (!input.value) return;
  const { checked } = input.value;
  input.value.focus();
  emitValue(!checked);
}
</script>
