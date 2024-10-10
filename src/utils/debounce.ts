export const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}
