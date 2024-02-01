export function isAlphabetical(input: string): boolean {
  const pattern = /^[a-zA-Z]/;
  return pattern.test(input);
}

export function shouldIgnoreKey(key: string): boolean {
  switch (key) {
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
    case "Backspace":
    case "Delete":
    case "Control":
    case "Shift":
    case "Alt":
    case "Tab":
      return true;
  }
  return false;
}
