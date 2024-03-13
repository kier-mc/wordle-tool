import type { WordData } from "~/types/api.dataset";
import type { Filters, FilterConditions, FilterPredicate } from "~/types/components.word";

/**
 * A composable that provides functions and properties associated with filtering matches based
 * on initial user input.
 */
export const useFilter = function () {
  const matches = useState<WordData[]>("matches");
  const localMatches = useState<WordData[]>("local-matches");

  const filters = useState<Filters>("filters", () => ({
    flags: {
      isPotentialSolution: false,
      isNotPotentialSolution: false,
      hasDuplicateLetters: false,
      hasUniqueLetters: false,
    },
    composition: {
      consonants: 0,
      vowels: 0,
    },
  }));
  /**
   * An object containing predicate callbacks to be passed to an
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter Array.prototype.filter()}
   * called by {@link filterMatches()}. Items must match the {@link FilterConditions} type.
   */
  const conditions: FilterConditions = {
    isPotentialSolution: (word) => word.metrics.is_potential_solution,
    isNotPotentialSolution: (word) => !word.metrics.is_potential_solution,
    hasDuplicateLetters: (word) => word.metrics.has_duplicate_letters,
    hasUniqueLetters: (word) => !word.metrics.has_duplicate_letters,
  };

  /**
   * A lambda function invoked by two watchers that synchronises the localMatches state with the
   * user's input whenever a filter is changed or the finder is executed.
   */
  const sync = () => (localMatches.value = filterMatches());
  watch(filters, () => sync(), { deep: true });
  watch(matches, () => sync());

  /**
   * A function that iterates over predicates assigned as "flags".
   */
  function filterFlags(): FilterPredicate[] {
    const predicates: ((word: WordData) => boolean)[] = [];
    Object.entries(filters.value.flags).forEach(([filter, bool]) => {
      if (bool) predicates.push(conditions[filter as keyof Filters["flags"]]);
    });
    return predicates;
  }
  /**
   * A function that iterates over the global matches state, applies any user-activated
   * filters and returns the resulting array. If no filters are selected when the watcher
   * calls this function, it will exit early and pass the matches through instead.
   */
  function filterMatches(): WordData[] {
    const payload = ref<WordData[]>(matches.value);
    const predicates = ref<((word: WordData) => boolean)[]>([]);

    predicates.value = [...filterFlags()];
    const condition = (word: WordData) => predicates.value.every((predicate) => predicate(word));

    if (!predicates.value.length) return matches.value;
    return payload.value.filter(condition);
  }

  return { filters, filterMatches };
};
