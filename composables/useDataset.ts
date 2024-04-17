import type { AsyncDataRequestStatus } from "~/node_modules/nuxt/dist/app/composables/asyncData";
import type { MaybeRef } from "vue";
import type { StatefulWordData } from "~/types/api.dataset";
import type { ValidWord } from "~/types/unions/api.dataset";

/**
 * A composable that provides functions and other properties related with the
 * primary dataset used within the application.
 */
export const useDataset = function () {
  const dataset = useState<StatefulWordData>("dataset");
  /**
   * Computed property that returns the status of the dataset fetch request.
   * This call is made in app.vue when the application is first launched.
   */
  const status = computed(() => {
    const status = useState<AsyncDataRequestStatus>("dataset-status");
    return status.value;
  });
  /**
   * Computed property that returns a boolean based on whether or not the dataset fetch
   * request is complete. Acts as a convenience wrapper for the "status" computed property.
   */
  const isLoading = computed(() => {
    return status.value !== "success";
  });
  /**
   * Attempts to return the complete payload of the dataset with no further
   * formatting or transformations. If the data is not available, returns an
   * empty array.
   */
  function getRawData() {
    if (!dataset.value) return [];
    return dataset.value;
  }
  /**
   * Attempts to return an array comprising all of the valid input terms that
   * are recognised and accepted by the game "Wordle". If the data is not
   * available, returns an empty array.
   */
  function getAllWords(): ValidWord[] {
    if (!dataset.value) return [];
    return dataset.value.map((word) => word.term);
  }
  /**
   * Attempts to return an array comprised of all of the potential solutions
   * (and their related metrics) accepted by the game "Wordle".
   */
  function getPotentialSolutions() {
    if (!dataset.value) return [];
    return dataset.value.filter((word) => word.metrics.is_potential_solution);
  }
  /**
   * Attempts to return an array comprised of all the valid input terms that
   * are recognised and accepted by the game "Wordle" that contain more than
   * one of the same letter at least once. If the data is not available, returns
   * an empty array.
   */
  function getDuplicateLetterWords() {
    if (!dataset.value) return [];
    return dataset.value.filter((word) => word.metrics.has_duplicate_letters);
  }
  /**
   * Attempts to return an array comprised of the data associated with a specific
   * term that is recognised and accepted by the game "Wordle". If the data is not
   * available, returns an empty array. Can accept a primitive or a ref as a value.
   * Designed to be called internally only.
   * @example
   * // Returns [{ term: "apple", metrics: {...} }]
   * useDataset().getWordMetrics("apple")
   * @param predicate
   * A predicate value that will attempt to be matched to the "term" field associated
   * with data from the complete dataset.
   */
  function getWordMetrics(predicate: MaybeRef<ValidWord>) {
    if (!dataset.value) return [];
    const value = unref(predicate);
    return dataset.value.filter((word) => word.term === value);
  }

  return {
    status,
    isLoading,
    getRawData,
    getAllWords,
    getPotentialSolutions,
    getDuplicateLetterWords,
    getWordMetrics,
  };
};
