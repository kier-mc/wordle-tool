<template>
  <div class="tabs" ref="element" tabindex="-1">
    <header class="header">
      <button
        v-for="(tab, key) in tabs"
        :key="key"
        class="tab"
        :data-tab="key"
        :data-active="state.tab === key"
        type="button"
        @click="handleClick($event)"
      >
        <div class="tab__label">{{ tab.label }}</div>
      </button>
    </header>
    <div class="content">
      <section
        v-for="(tab, key) in tabs"
        :key="key"
        class="content__section"
        :data-section="`tab-section-${key}`"
        :data-active="state.tab === key"
      >
        <slot :name="tab.id" />
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  overflow-x: hidden;
  border: var(--sz-border-sm) solid var(--cl-tabs-border);
  background-color: var(--cl-tabs-background);
}
.header {
  position: relative;
  background-color: var(--cl-tabs-header);
}
.tab {
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  padding-inline: var(--sz-lg);
  padding-block: var(--sz-sm);
  background-color: var(--cl-tabs-tab-background);
  transition-property: background-color, color;
  transition-timing-function: var(--ef-out-quart);
  transition-duration: 500ms;
  &::before,
  &::after {
    content: "";
    position: absolute;
    opacity: 0;
    transition: opacity 500ms var(--ef-out-quart);
  }
  // Active tab highlight
  &::before {
    inset-inline: 0;
    bottom: 0;
    height: var(--sz-border-lg);
    z-index: 10;
    background-color: var(--cl-tabs-tab-highlight);
  }
  // Hover/focus overlay for active tab
  &::after {
    inset: 0;
    z-index: 5;
    background-color: var(--cl-tabs-tab-highlight);
  }
  &[data-active="true"] {
    background-color: var(--cl-tabs-tab-active-background);
    &::before {
      opacity: 1;
    }
  }
  &[data-active="true"] &__label {
    color: var(--cl-tabs-tab-active-text);
  }
  &__label {
    pointer-events: none;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--cl-tabs-tab-text);
  }
  &:focus,
  &:hover {
    &::after {
      opacity: 0.125;
    }
  }
}
.content {
  --width: v-bind(elementWidth);

  position: relative;
  display: flex;
  width: var(--width);
  transform: v-bind(translationDistance);
  transition: transform 250ms var(--ef-out-quart);
  &__section {
    flex-shrink: 0;
    width: var(--width);
    padding: var(--sz-xs);
  }
}
</style>

<script setup lang="ts">
import type { TabData } from "~/types/components.app";

const props = defineProps({
  tabs: { type: Array as PropType<TabData[]>, default: [] },
});

const { tabs } = toRefs(props);

const element = ref<HTMLDivElement | null>(null);
const state = ref({
  tab: 0,
  width: 0,
});

const elementWidth = computed(() => {
  const { width } = state.value;
  return width ? `${width}px` : "100%";
});

const translationDistance = computed(() => {
  const { width, tab } = state.value;
  return `translateX(-${width * tab}px)`;
});

function handleClick(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  const index = target.getAttribute("data-tab");
  if (!index) return;
  state.value.tab = +index;
}

function setWidth() {
  if (!element.value) return;
  state.value.width = element.value.clientWidth;
}

onMounted(() => {
  window.addEventListener("resize", setWidth);
  setWidth();
});

onUnmounted(() => {
  window.removeEventListener("resize", setWidth);
});
</script>
