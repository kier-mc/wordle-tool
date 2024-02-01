export type FinderState = {
  correct: Record<number, string | null>;
  valid: Record<number, string | null>;
  absent: string | null;
};
