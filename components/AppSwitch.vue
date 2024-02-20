<template>
  <div class="switch" @click="toggleCheck()">
    <label class="switch__label" :for="id">{{ label }}</label>
    <input class="switch__input" type="checkbox" ref="input" :id="id" :name="id" />
    <span class="switch__track"></span>
  </div>
</template>

<style scoped lang="scss">
.switch {
  --track-width: 3rem;
  --track-height: calc(var(--track-width) / 2);
  --cursor-inset: calc(var(--track-width) / 12);
  --cursor-size: calc(var(--track-height) - calc(var(--cursor-inset) * 2));

  display: grid;
  grid-template-columns: 1fr max-content;
  column-gap: var(--sz-md);
  &__input {
    &[type="checkbox"] {
      // TODO: don't repeat this code here; use a mixin/refactor for global class
      overflow: hidden;
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      border: 0;
      margin: -1px;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
    &:checked + .switch__track {
      background-color: var(--cl-switch-active-background);
    }
    &:checked + .switch__track::before {
      --position: calc(100% - var(--cursor-size) - var(--cursor-inset));

      inset: 0 0 0 var(--position);
    }
  }
  &__track {
    --inner-radius: calc(var(--cursor-size) / 2);
    --outer-radius: calc(var(--inner-radius) + var(--cursor-inset));

    cursor: pointer;
    position: relative;
    width: var(--track-width);
    height: var(--track-height);
    border-radius: var(--outer-radius);
    background-color: var(--cl-switch-inactive-background);
    transition: background-color 500ms var(--ef-out-quart);
    &::before {
      content: "";
      position: absolute;
      inset: 0 0 0 var(--cursor-inset);
      aspect-ratio: 1/1;
      width: var(--cursor-size);
      border-radius: var(--inner-radius);
      margin-block: auto;
      background-color: var(--cl-text);
      transition: inset 500ms var(--ef-out-quart);
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

function toggleCheck() {
  if (!input.value) return;
  const { checked } = input.value;
  emitValue(!checked);
}
</script>
