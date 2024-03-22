export const useModal = function () {
  const state = useState<boolean>("modal-visible", () => false);

  const isVisible = computed(() => state.value);

  function show(): void {
    state.value = true;
  }

  function hide(): void {
    state.value = false;
  }

  return { isVisible, show, hide };
};
