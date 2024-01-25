<template>
  <component class="icon" :is="useIcon" />
</template>

<style scoped lang="scss">
.icon {
  aspect-ratio: 1/1;
  width: 100%;
  max-width: v-bind(setSize);
  fill: v-bind(setFill);
}
</style>

<script setup lang="ts">
import { Icons } from "~/utils/enums";

const props = defineProps({
  /**
   * The name of the icon to be rendered.
   */
  icon: { type: String as PropType<keyof typeof Icons>, required: true },
  /**
   * The fill colour of the rendered icon.
   * @defaultvalue currentColor
   */
  fill: { type: String as PropType<string>, default: "currentColor" },
  /**
   * The size of the rendered icon.
   * @defaultvalue 3rem
   */
  size: { type: String as PropType<string>, default: "3rem" },
});

const useIcon = defineAsyncComponent<Component>({
  loader: () => import(`./icons/Icon${Icons[props.icon]}.vue`),
});

const setFill = computed((): string => {
  const fill = props.fill;
  return fill;
});

const setSize = computed((): string => {
  const size = props.size;
  return size;
});
</script>
