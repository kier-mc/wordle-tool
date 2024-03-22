/**
 * A composable that provides functions and properties associated with the app's modal component.
 */
export const useModal = function () {
  const state = useState<boolean>("modal-visible", () => false);
  /**
   * A computed property indicating the modal's visibility.
   */
  const isVisible = computed(() => state.value);
  /**
   * Displays the app modal and any currently contained content.
   */
  function show(): void {
    state.value = true;
  }
  /**
   * Hides the app modal and any currently contained content.
   */
  function hide(): void {
    state.value = false;
  }

  return { isVisible, show, hide };
};
