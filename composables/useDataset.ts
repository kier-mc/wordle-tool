import type { AsyncDataRequestStatus } from "nuxt/dist/app/composables/asyncData";
import type { MaybeRef } from "vue";
import type { StatefulWordData } from "~/types/api.dataset";
import type { ValidWord } from "~/types/unions/api.dataset";

export const useDataset = function () {
  const dataset = useState<StatefulWordData>("dataset");

  const status = computed(() => {
    const status = useState<AsyncDataRequestStatus>("dataset-status");
    return status.value;
  });
  function getRawData() {
    if (!dataset.value) return [];
    return dataset.value;
  }
  function getAllWords() {
    if (!dataset.value) return [];
    return dataset.value.map((word) => word.term);
  }
  function getPotentialSolutions() {
    if (!dataset.value) return [];
    return dataset.value.filter((word) => word.metrics.is_potential_solution);
  }
  function getDuplicateLetterWords() {
    if (!dataset.value) return [];
    return dataset.value.filter((word) => word.metrics.has_duplicate_letters);
  }
  function getWordMetrics(predicate: MaybeRef<ValidWord>) {
    if (!dataset.value) return [];
    const value = unref(predicate);
    return dataset.value.filter((word) => word.term === value);
  }

  return {
    status,
    getRawData,
    getAllWords,
    getPotentialSolutions,
    getDuplicateLetterWords,
    getWordMetrics,
  };
};
