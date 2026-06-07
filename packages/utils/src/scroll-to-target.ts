/**
 * Smoothly scrolls to a target element with an optional offset.
 * @param targetSelector - CSS selector for the target element
 * @param offset - Optional top offset in pixels (e.g., for fixed headers)
 */
const scrollToTarget = (targetSelector: string, offset: number = 0): void => {
  const targetElement = document.querySelector(targetSelector);

  if (!targetElement) return;

  const { top } = targetElement.getBoundingClientRect();
  const scrollPosition = top + window.scrollY - offset;

  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth',
  });
};

export default scrollToTarget;
