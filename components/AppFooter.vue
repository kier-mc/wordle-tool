<template>
  <footer class="footer">
    <a
      class="link"
      href="https://github.com/kier-mc"
      target="_blank"
      aria-label="Visit Github (opens in new tab)"
    >
      <AppIcon class="icon" :size="iconSize" icon="github" title="Visit Github (opens in new tab)" />
    </a>
  </footer>
</template>

<style scoped lang="scss">
@use "../assets/styles/var/colour";
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--sz-md);
  background-color: var(--cl-footer);
}
.link {
  --size: v-bind(iconSize);

  all: unset;
  display: flex;
  cursor: pointer;
  position: relative;
  aspect-ratio: 1/1;
  border-radius: var(--size);
  clip-path: circle(var(--size));
  transition: outline 500ms var(--ef-out-quart);
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
    background-color: var(--cl-footer);
    opacity: 1;
  }
  &::after {
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
}
.icon {
  fill: var(--cl-icon);
  transition: fill 500ms var(--ef-out-quart);
  &:hover {
    fill: var(--cl-icon-hover);
  }
}
</style>

<script setup lang="ts">
import { IconSizes } from "~/utils/enums";

const iconSize = ref<IconSizes>(IconSizes.md);
</script>
