<template>
  <div class="tabs" ref="element">
    <header class="header">
      <button
        v-for="(tab, key) in tabs"
        :key="key"
        class="header__tab"
        :data-tab="key"
        :data-active="state.tab === key"
        type="button"
        @click="handleClick($event)"
      >
        {{ tab.label }}
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
  &__tab {
    all: unset;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    padding-inline: var(--sz-lg);
    padding-block: var(--sz-sm);
    background-color: var(--cl-tabs-tab-background);
    font-weight: 600;
    text-transform: uppercase;
    color: var(--cl-tabs-tab-text);
    transition-property: background-color, color;
    transition-timing-function: var(--ef-out-quart);
    transition-duration: 500ms;
    &::before {
      content: "";
      position: absolute;
      inset-inline: 0;
      bottom: 0;
      height: var(--sz-border-lg);
      background-color: var(--cl-tabs-tab-highlight);
      opacity: 0;
      transition: opacity 500ms var(--ef-out-quart);
    }
    &[data-active="true"] {
      background-color: var(--cl-tabs-tab-active-background);
      color: var(--cl-tabs-tab-active-text);
    }
    &[data-active="true"]::before {
      opacity: 1;
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
