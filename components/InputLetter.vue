<template>
  <label :for="props.id" class="$visually-hidden">{{ label }}</label>
  <input
    :id="props.id"
    :name="props.id"
    :value="letter"
    @input="handleInput($event)"
    autocomplete="off"
    class="$input input"
    maxlength="1"
    type="text"
  />
</template>

<style scoped lang="scss">
@use "../assets/styles/var/global";
.input {
  --text-size: var(--sz-text-xl);
  aspect-ratio: 1/1;
  max-width: var(--text-size);
  font-size: var(--text-size);
  text-align: center;
  text-transform: capitalize;
}
</style>

<script setup lang="ts">
const props = defineProps({
  id: { type: String as PropType<string> },
  label: { type: String as PropType<string> },
});

const letter = defineModel<string | null>("letter", { required: true });

function handleInput(event: Event): void {
  const { value } = event.target as HTMLInputElement;
  if (!value) {
    letter.value = null;
    return;
  }
  letter.value = value.toLowerCase();
}
</script>
