<template>
  <Transition name="fade">
    <section v-if="list.length" class="matches" aria-labelledby="heading-matches">
      <h2 id="heading-matches">Matches</h2>
      <ul class="matches__list" aria-labelledby="heading-matches">
        <WordData v-for="word in list" :key="word.term" :word="word" />
      </ul>
      <div class="matches__controls">
        <AppButton v-if="button.shouldDisplay()" @click="button.showMore()">Show More</AppButton>
      </div>
    </section>
  </Transition>
</template>

<style scoped lang="scss">
.matches {
  display: grid;
  grid-template-rows: repeat(3, auto);
  row-gap: var(--sz-xs);
  &__list {
    all: unset;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12ch, auto));
    gap: var(--sz-xs);
  }
  &__controls {
    margin-top: calc(var(--sz-md) - var(--sz-sm));
    margin-inline: auto;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 350ms var(--ef-out-quart);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import type { WordData } from "~/types/api.dataset";

const matches = useState<WordData[]>("matches");
const localMatches = useState<WordData[]>("local-matches");

watch(matches, () => (pagination.value.index = 0));

const pagination = ref({
  index: 0,
  size: 60 as const,
});

const list = computed(() => {
  const { index, size } = toRefs(pagination.value);
  const [from, to] = [0, index.value + size.value];

  return localMatches.value.slice(from, to);
});

const button = (function () {
  const { index, size } = toRefs(pagination.value);
  const showMore = function () {
    index.value += size.value;
    scrollToPageEnd();
  };
  const shouldDisplay = function () {
    return list.value.length < localMatches.value.length;
  };

  return { showMore, shouldDisplay };
})();

function scrollToPageEnd(): void {
  setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 350);
}
</script>
