<template>
  <component class="icon" :is="useIcon" :title="title" />
</template>

<style scoped lang="scss">
.icon {
  --size: v-bind(setSize);
  --fill: v-bind(setFill);

  aspect-ratio: 1/1;
  width: 100%;
  max-width: var(--size, 3rem);
  fill: var(--fill, currentColor);
}
</style>

<script setup lang="ts">
import { Icons, IconSizes } from "~/utils/enums";

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
  size: { type: String as PropType<IconSizes>, default: "3rem" },
  /**
   * A title that will be passed to the icon to semantically label it.
   * @defaultvalue ""
   */
  title: { type: String as PropType<string>, default: "" },
});

const useIcon = defineAsyncComponent<Component>({
  loader: () => import(`../icons/Icon${Icons[props.icon]}.vue`),
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
