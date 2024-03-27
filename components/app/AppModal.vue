<template>
  <div :class="setBackdropVisibility">
    <dialog ref="modalElement" class="modal" :aria-hidden="!isVisible" tabindex="-1">
      <header class="modal__header">
        <h2 class="modal__title">{{ title }}</h2>
        <button class="modal__button" type="button" @click="hide()" autofocus>
          <AppIcon class="modal__icon" icon="xmark" :size="iconSize" title="Close modal" />
        </button>
      </header>
      <div class="modal__content">
        <slot />
      </div>
    </dialog>
  </div>
</template>

<style scoped lang="scss">
.backdrop {
  @at-root ::backdrop {
    opacity: 0;
  }
  z-index: 10;
  pointer-events: none;
  position: fixed;
  inset: 0;
  transition-property: background-color, backdrop-filter;
  transition-timing-function: var(--ef-out-quart);
  transition-duration: 350ms;
  &--visible {
    pointer-events: all;
    background-color: var(--cl-modal-backdrop);
    backdrop-filter: blur(var(--sz-xs));
  }
}
.modal {
  position: fixed;
  inset: 0;
  opacity: 0;
  width: 100%;
  max-width: 60ch;
  padding: 0;
  margin-inline: auto;
  margin-top: var(--sz-xl);
  border: var(--sz-border-sm) solid var(--cl-modal-border);
  color: var(--cl-text);
  background-color: var(--cl-modal-background);
  transition: opacity 500ms var(--ef-out-quart);
  &[open] {
    opacity: 1;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--sz-xs);
    background-color: var(--cl-modal-header);
  }
  &__title {
    font-weight: 600;
    text-transform: uppercase;
  }
  &__button {
    --size: v-bind(iconSize);

    all: unset;
    cursor: pointer;
    position: relative;
    aspect-ratio: 1/1;
    clip-path: circle(var(--size));
    &:focus {
      &::after {
        opacity: 1;
      }
    }
    &:hover .modal__icon {
      fill: var(--cl-icon-hover);
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      aspect-ratio: 1/1;
      clip-path: circle();
      border-radius: var(--size);
    }
    &::before {
      z-index: -5;
      background-color: var(--cl-modal-header);
      opacity: 1;
    }
    &::after {
      margin: calc(var(--sz-border-lg) * -1);
      z-index: -10;
      background-color: var(--cl-focus-highlight);
      opacity: 0;
      transition: opacity 500ms var(--ef-out-quart);
    }
  }
  &__icon {
    pointer-events: none;
    fill: var(--cl-icon);
    transition: fill 500ms var(--ef-out-quart);
  }
  &__content {
    padding: var(--sz-xs);
  }
}
</style>

<script setup lang="ts">
import { IconSizes } from "~/utils/enums";

const props = defineProps({
  title: { type: String as PropType<string>, default: "" },
});
const { title } = toRefs(props);

const modalElement = ref<HTMLDialogElement | null>(null);

const iconSize = ref<IconSizes>(IconSizes.sm);

const { isVisible, hide } = useModal();

watch(isVisible, () => {
  if (!modalElement.value) return;
  const modal = modalElement.value;
  isVisible.value ? modal.showModal() : modal.close();
});

const setBackdropVisibility = computed(() => {
  const { value: modalIsVisible } = isVisible;
  return modalIsVisible ? "backdrop backdrop--visible" : "backdrop";
});

function closeOnEscape(event: KeyboardEvent): void {
  if (event.key === "Escape") hide();
}

onMounted(() => window.addEventListener("keydown", closeOnEscape));
onUnmounted(() => window.removeEventListener("keydown", closeOnEscape));
</script>
