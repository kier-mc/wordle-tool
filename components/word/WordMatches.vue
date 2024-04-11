<template>
  <Transition name="fade">
    <section v-if="list.length" class="matches" aria-labelledby="heading-matches">
      <h2 id="heading-matches">Matches</h2>
      <ul class="matches__list" aria-labelledby="heading-matches">
        <li v-for="word in list" :key="word.term" class="matches__match">
          <WordData :word="word" @click="selectWord(word)" />
        </li>
      </ul>
      <div class="matches__controls">
        <AppButton v-if="button.shouldDisplay()" @click="button.showMore()">Show More</AppButton>
      </div>
    </section>
  </Transition>
  <Teleport to="body">
    <AppModal :title="`Information for ${selectedWord?.term}`">
      <WordMetrics :word="selectedWord" />
    </AppModal>
  </Teleport>
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
  &__match {
    all: unset;
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

const pagination = ref({
  index: 0,
  size: 60 as const,
});

watch(matches, () => (pagination.value.index = 0));

const list = computed(() => {
  const { index, size } = toRefs(pagination.value);
  const [from, to] = [0, index.value + size.value];

  return localMatches.value.slice(from, to);
});

const selectedWord = ref<WordData | null>(null);
/**
 * Sets the selectedWord reactive variable to the currently selected word and opens the modal.
 * @param word
 * A complete WordData object to be passed to the modal.
 */
function selectWord(word: WordData) {
  const { show: showModal } = useModal();
  selectedWord.value = word;
  showModal();
}
const button = (function () {
  const { index, size } = toRefs(pagination.value);
  /**
   * Increments the pagination index by the defined size to display more results and scrolls to
   * the bottom of the page.
   */
  const showMore = function () {
    index.value += size.value;
    scrollToPageEnd();
  };
  /**
   * Determines if the paginated list length is less than the filtered matches, and therefore if
   * the button to display more results should be displayed or not.
   */
  const shouldDisplay = function () {
    return list.value.length < localMatches.value.length;
  };

  return { showMore, shouldDisplay };
})();
/**
 * Helper function that scrolls to the bottom of the page after a given delay.
 * @param delay
 * The delay (in ms) to apply before scrolling.
 * @default 350ms
 */
function scrollToPageEnd(delay: number = 350): void {
  setTimeout(() => window.scrollTo(0, document.body.scrollHeight), delay);
}
</script>
