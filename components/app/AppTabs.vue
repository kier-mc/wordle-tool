<template>
  <div class="tabs" ref="element" tabindex="-1">
    <header class="header">
      <button
        v-if="displayMobileVersion"
        class="header__mobile-nav header__mobile-nav--left"
        type="button"
        :disabled="mobileNav.disablePrevious()"
        aria-hidden="true"
        @click="mobileNav.previous()"
      >
        <AppIcon
          class="header__icon header__icon--left"
          icon="arrow"
          :size="iconSize"
          title="View previous filter set"
        />
      </button>
      <div class="header__tabs">
        <template v-for="(tab, key) in tabs" :key="key">
          <button
            class="tab"
            :disabled="displayMobileVersion"
            :data-tab="key"
            :data-active="state.tab === key"
            aria-hidden="true"
            type="button"
            @click="handleClick($event)"
          >
            <span class="tab__label">{{ tab.label }}</span>
          </button>
          <span class="tab__label tab__label--visually-hidden" :id="`tab-header-${tab.id}`">
            {{ tab.label }}
          </span>
        </template>
      </div>
      <button
        v-if="displayMobileVersion"
        class="header__mobile-nav header__mobile-nav--right"
        type="button"
        :disabled="mobileNav.disableNext()"
        @click="mobileNav.next()"
        aria-hidden="true"
      >
        <AppIcon
          class="header__icon header__icon--right"
          icon="arrow"
          :size="iconSize"
          title="View next filter set"
        />
      </button>
    </header>
    <div class="content">
      <section
        v-for="(tab, key) in tabs"
        :key="key"
        class="content__section"
        :data-section="`tab-section-${key}`"
        :data-active="state.tab === key"
        :aria-labelledby="`tab-header-${tab.id}`"
      >
        <slot :name="tab.id" />
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/var/mixin";
@use "../assets/styles/var/size";
.tabs {
  isolation: isolate;
  overflow-x: hidden;
  border: var(--sz-border-md) solid var(--cl-tabs-border);
  background-color: var(--cl-tabs-background);
}
.header {
  position: relative;
  display: flex;
  background-color: var(--cl-tabs-header);
  &__tabs {
    position: relative;
    display: flex;
    @media (max-width: size.breakpoint("md")) {
      --distance: v-bind(translationDistance);

      transform: var(--distance, 0px);
      transition: transform 250ms var(--ef-out-quart);
    }
  }
  &__mobile-nav {
    --size: v-bind(iconSize);

    all: unset;
    cursor: pointer;
    position: absolute;
    inset-block: 0;
    display: flex;
    justify-content: center;
    height: max-content;
    z-index: 10;
    border-radius: var(--size);
    margin-block: auto;
    clip-path: circle(var(--size));
    &:disabled {
      cursor: not-allowed;
    }
    &:disabled .header__icon {
      opacity: 0.5;
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
      background-color: var(--cl-tabs-tab-background);
      opacity: 1;
    }
    &::after {
      margin: calc(var(--sz-border-lg) * -1);
      z-index: -10;
      background-color: var(--cl-focus-highlight);
      opacity: 0;
      transition: opacity 500ms var(--ef-out-quart);
    }
    &:focus-visible {
      outline: var(--sz-border-md) solid var(--cl-focus-highlight);
      &::after {
        opacity: 1;
      }
    }
    &--left {
      left: 1rem;
    }
    &--right {
      right: 1rem;
    }
  }
  &__icon {
    --size: v-bind(iconSize);

    width: var(--size, var(--sz-icon-sm));
    max-width: var(--size, var(--sz-icon-sm));
    fill: var(--cl-icon);
    &--right {
      transform: rotateZ(180deg);
    }
  }
}
.tab {
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;
  position: relative;
  padding-inline: var(--sz-lg);
  padding-block: var(--sz-sm);
  background-color: var(--cl-tabs-tab-background);
  transition-property: background-color, color;
  transition-timing-function: var(--ef-out-quart);
  transition-duration: 500ms;
  @media (max-width: size.breakpoint("md")) {
    white-space: nowrap;
    min-width: v-bind(elementWidth);
    text-align: center;
  }
  &:disabled {
    cursor: default;
  }
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
    &--visually-hidden {
      @include mixin.visuallyHidden();
    }
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
  width: var(--width, auto);
  transform: v-bind(translationDistance);
  transition: transform 250ms var(--ef-out-quart);
  &__section {
    flex-shrink: 0;
    width: var(--width, auto);
    padding: var(--sz-xs);
  }
}
</style>

<script setup lang="ts">
import { Breakpoints, IconSizes } from "~/utils/enums";
import type { TabData } from "~/types/components.app";

const props = defineProps({
  tabs: { type: Array as PropType<TabData[]>, default: [] },
  activeTab: { type: String as PropType<string> },
});
const { tabs, activeTab } = toRefs(props);

const emits = defineEmits<{
  (event: "update:active-tab", value: string): void;
}>();

function emitActiveTab(): void {
  const { tab } = state.value;
  const active = tabs.value[tab].id;
  emits("update:active-tab", active);
}

const iconSize = IconSizes["sm"];

const nuxtApp = useNuxtApp();
const suspenseResolved = ref<boolean>(false);
nuxtApp.hook("page:loading:end", () => {
  suspenseResolved.value = true;
});

const displayMobileVersion = computed(() => {
  const isMobileScreen = useMediaQuery(`(max-width: ${Breakpoints.md})`);
  return suspenseResolved.value && isMobileScreen.value;
});

const element = ref<HTMLDivElement | null>(null);
const state = ref({ tab: 0, width: 0 });
watch(state, () => emitActiveTab(), { deep: true });

const elementWidth = computed((): string => {
  const { width } = state.value;
  return width ? `${width}px` : "100%";
});

const translationDistance = computed((): string => {
  const { width, tab } = state.value;
  return `translateX(-${width * tab}px)`;
});

const mobileNav = (function () {
  function previous(): void {
    if (state.value.tab === 0) return;
    state.value.tab -= 1;
  }
  function next(): void {
    if (state.value.tab >= tabs.value.length - 1) return;
    state.value.tab += 1;
  }
  function disablePrevious(): boolean {
    return state.value.tab === 0;
  }
  function disableNext(): boolean {
    return state.value.tab === tabs.value.length - 1;
  }

  return { previous, next, disablePrevious, disableNext };
})();

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
