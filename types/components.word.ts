import type { WordData } from "./api.dataset";

/**
 * A record containing a numeric key and a (default nullable string) value.
 * Accepts a generic type that can be used to alter the default value type.
 */
export type IndexedWord<T = string | null> = Record<number, T>;
/**
 * Represents the state of the word finder component.
 */
export type FinderState = {
  /**
   * A stateful object for letters entered into the "correct" section.
   */
  correct: IndexedWord;
  /**
   * A stateful object for letters entered into the "valid" section.
   */
  valid: IndexedWord;
  /**
   * A nullable string for letters entered into the "absent" section.
   */
  absent: string | null;
};
/**
 * An object containing boolean values that can be tested against the values returned
 * by the API response.
 */
type Flags = {
  /**
   * A boolean indicating whether or not to include matches that are valid solutions only,
   * excluding words that are accepted as input but not as solutions.
   */
  isPotentialSolution: boolean;
  /**
   * A boolean indicating whether or not to include matches that are accepted as input only,
   * excluding words that are valid solutions.
   */
  isNotPotentialSolution: boolean;
  /**
   * A boolean indicating whether or not to include matches that contain one or more duplicate
   * letters.
   */
  hasDuplicateLetters: boolean;
  /**
   * A boolean indicating whether or not to include matches that are comprised solely of unique
   * letters.
   */
  hasUniqueLetters: boolean;
};
/**
 * An object containing numerical data associated with the word's composition.
 */
type Composition = {
  /**
   * A number indicating the amount of consonants present in the word.
   */
  consonants: number;
  /**
   * A number indicating the amount of vowels present in the word.
   */

  vowels: number;
};
/**
 * An object that defines the shape of the word filter component.
 */
export type Filters = {
  /**
   * An object containing boolean values that can be tested against the values returned
   * by the API response.
   */
  flags: Flags;
  /**
   * An object containing numerical data associated with the word's composition.
   */
  composition: Composition;
};
/**
 * A function annotation that defines the shape of expected predicates for the word
 * filter component.
 */
export type FilterPredicate = (word: WordData) => boolean;
/**
 * A record that defines the shape of the filter condition object.
 */
export type FilterConditions = Record<keyof Flags, FilterPredicate>;
