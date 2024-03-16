import type { FinderState, IndexedWord } from "~/types/components.word";
import type { WordData } from "~/types/api.dataset";
/**
 * A helper function that iterates over an {@link IndexedWord} object and
 * returns a boolean based on whether or not any values are populated.
 * @param object {IndexedWord}
 * An {@link IndexedWord} object to check for the presence of non-null values.
 */
function hasValues(object: MaybeRef<IndexedWord>): boolean {
  const state = unref(object);
  return Object.values(state).some((value) => value !== null);
}
/**
 * A helper function that iterates over an {@link IndexedWord} object and
 * filters out any null values, returning an array that contains only
 * populated values.
 * @param object {IndexedWord}
 * An {@link IndexedWord} object to be filtered for non-null values.
 */
function filterValidValues(object: IndexedWord): string[] {
  const state = unref(object);
  return Object.values(state).filter((value) => value !== null) as string[];
}
/**
 * A helper function that iterates over an {@link IndexedWord} object and
 * filters out any null values, returning a new object that contains only
 * populated values.
 * @param object {IndexedWord}
 * An {@link IndexedWord} object to be filtered for non-null values.
 */
function filterPermittedValues(object: MaybeRef<IndexedWord>): IndexedWord<string> {
  const state = unref(object);
  function callback(clone: IndexedWord, key: string) {
    const index = parseInt(key);
    if (state[index] !== null) clone[index] = state[index];
    return clone as IndexedWord<string>;
  }
  const keys = Object.keys(object);
  return keys.reduce((clone, key) => callback(clone, key), {});
}
/**
 * Tests a string array containing prohibited values against a {@link WordData} array
 * and returns the filtered array of results.
 * @param prohibited {string[]}
 * A string array containing letters to be tested.
 * @param list {MaybeRef<ValidWord[]>}
 * A {@link WordData} array to be filtered by term. Can be static or reactive.
 */
function filterAbsentWords(prohibited: string[], list: MaybeRef<WordData[]>): WordData[] {
  const matches = unref(list);
  return matches.filter((word) => {
    return !prohibited.some((letter) => word.term.includes(letter));
  });
}
/**
 * Tests a string array containing permitted values against a {@link WordData} array
 * and returns the filtered array of results. Checks for the presence of any predicate
 * letter anywhere in the tested word; one or more matches will result in the word being
 * included as part of the return list. Strictly filters matches that contain duplicate letters.
 * @example
 * // Returns ["apple", "apnea"]
 * permitted = ["p"]
 * matches = ["apple", "apnea", "catch"]
 * filterValidWords(permitted, matches)
 *
 * // Returns ["apple"]
 * permitted = ["p", "p"]
 * matches = ["apple", "apnea", "catch"]
 * filterValidWords(permitted, matches)
 * @param permitted {string[]}
 * A string array containing letters to be tested.
 * @param list {MaybeRef<ValidWord[]>}
 * A {@link WordData} array to be filtered by term. Can be static or reactive.
 */
function filterValidWords(permitted: string[], list: MaybeRef<WordData[]>): WordData[] {
  const matches = unref(list);
  return matches.filter((word) => {
    const letters = [...word.term];
    return permitted.every((letter) => {
      const index = letters.indexOf(letter);
      if (index === -1) return false;
      letters.splice(index, 1);
      return true;
    });
  });
}
/**
 * Tests an {@link IndexedWord} object containing permitted values against a {@link WordData}
 * array and returns the array of filtered results. Considerate of index positions (indicated
 * by the key of the IndexedWord object) and will only return words where the index position
 * of the matching letter is equal to the key.
 * @param permitted {IndexedWord<string>}
 * An {@link IndexedWord} object containing indices/letters to be tested.
 * @param list {MaybeRef<ValidWord[]>}
 * A {@link WordData} array to be filtered by term. Can be static or reactive.
 */
function filterCorrectWords(permitted: IndexedWord<string>, list: MaybeRef<WordData[]>): WordData[] {
  const matches = unref(list);
  return matches.filter((word) => {
    return Object.entries(permitted).every(([position, letter]) => {
      const index = parseInt(position);
      return word.term[index] === letter;
    });
  });
}
/**
 * A composable that provides functions and other properties related to the word finding
 * capability of the app.
 */
export const useFinder = function () {
  const { getRawData } = useDataset();
  const matches = useState<WordData[]>("matches", () => shallowRef([]));
  const state = useState<FinderState>("finder-state", () => ({
    correct: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
    },
    valid: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
    },
    absent: null,
  }));
  /**
   * Filters the complete dataset against data entered into the composable state.
   */
  function findMatches() {
    const { correct, valid, absent } = state.value;
    matches.value = getRawData();
    if (absent) {
      const prohibited = [...absent];
      matches.value = filterAbsentWords(prohibited, matches);
    }
    if (hasValues(valid)) {
      const permitted = filterValidValues(valid);
      matches.value = filterValidWords(permitted, matches);
    }
    if (hasValues(correct)) {
      const permitted = filterPermittedValues(correct);
      matches.value = filterCorrectWords(permitted, matches);
    }
  }
  /**
   * Resets the current state back to the initial (default).
   */
  function resetState() {
    const { value: currentState } = state;
    Object.assign(currentState, initialFinderState());
    matches.value = [];
  }

  return {
    state,
    findMatches,
    resetState,
  };
};
