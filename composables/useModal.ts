export const useModal = function () {
  const isVisible = useState<boolean>("modal-visible", () => false);

  function show() {
    isVisible.value = true;
  }

  function hide() {
    isVisible.value = false;
  }

  return { isVisible, show, hide };
};
