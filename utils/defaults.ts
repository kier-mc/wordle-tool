import type { FinderState } from "~/types/components.word";
/**
 * Returns the initial (blank) state object used in the useFinder composable.
 */
export const initialFinderState = function (): FinderState {
  return {
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
  };
};
