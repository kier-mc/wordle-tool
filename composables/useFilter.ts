import type { WordData } from "~/types/api.dataset";
import type { Filters, FilterConditions, FilterPredicate } from "~/types/components.word";

const conditions: FilterConditions = {
  isPotentialSolution: (word) => word.metrics.is_potential_solution,
  isNotPotentialSolution: (word) => !word.metrics.is_potential_solution,
  hasDuplicateLetters: (word) => word.metrics.has_duplicate_letters,
  hasUniqueLetters: (word) => !word.metrics.has_duplicate_letters,
};

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

  const sync = () => (localMatches.value = filterMatches());
  watch(filters, () => sync(), { deep: true });
  watch(matches, () => sync());

  function filterFlags(): FilterPredicate[] {
    const predicates: ((word: WordData) => boolean)[] = [];

    Object.entries(filters.value.flags).forEach(([filter, bool]) => {
      if (bool) predicates.push(conditions[filter as keyof Filters["flags"]]);
    });

    return predicates;
  }

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
