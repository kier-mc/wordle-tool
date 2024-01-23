import type { ValidLetter, ValidWord } from "./unions/api.dataset";
/**
 * Metrics related to the word.
 */
type WordMetrics = {
  /**
   * A boolean indicating whether or not the word contains duplicate letters, or
   * whether or not it is composed solely of unique letters.
   */
  has_duplicate_letters: boolean;
  /**
   * A boolean indicating whether or not the word appears on the actual solution
   * list for valid Wordle answers, or whether it is simply considered valid input.
   */
  is_potential_solution: boolean;
  /**
   * The total number of consonants present in the word.
   */
  consonants: number;
  /**
   * The total number of vowels present in the word.
   */
  vowels: number;
  /**
   * An object where the key is a lowercase letter between a-z and the value
   * is a number that represents the total frequency of which that letter
   * appears in the word.
   */
  letter_count: Record<ValidLetter, number>;
};
/**
 * Represents the expected shape of the data from the API response.
 */
export type WordData = {
  /**
   * A viable word considered valid input by the game "Wordle".
   */
  term: ValidWord;
  /**
   * Metrics related to the word.
   */
  metrics: WordMetrics;
};
/**
 * Represents either a {@link WordData} array or null. For use with
 * {@link https://nuxt.com/docs/api/composables/use-state useState}
 * and other asynchronous functions/composables.
 */
export type StatefulWordData = WordData[] | null;
