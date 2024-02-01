<template>
  <div>
    <label :for="id" class="$visually-hidden">{{ label }}</label>
    <input
      :id="id"
      :name="id"
      :value="value"
      @input="handleInput($event)"
      autocomplete="off"
      class="$input input"
      type="text"
    />
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/var/global";
.input {
  font-size: var(--sz-text-lg);
  text-transform: uppercase;
}
</style>

<script setup lang="ts">
const props = defineProps({
  id: { type: String as PropType<string> },
  label: { type: String as PropType<string> },
  value: { type: [String, null] as PropType<string | null>, required: true },
});

const { id, label, value } = toRefs(props);

const emits = defineEmits<{
  (event: "update:value", value: string | null): void;
}>();

function emitValue(value: string): void {
  return emits("update:value", value);
}

function emitNull(): void {
  emits("update:value", null);
}

function handleInput(event: Event): void {
  const { value } = event.target as HTMLInputElement;
  const letters = value.toLowerCase();
  if (!value) return emitNull();
  emitValue(letters);
}
</script>
