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
