export const TORNADO_FOCUSABLE_ELEMENTS = [
  "a[href]",
  "area[href]",
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  "select:not([disabled]):not([aria-hidden])",
  "textarea:not([disabled]):not([aria-hidden])",
  "button:not([disabled]):not([aria-hidden])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]",
  '[tabindex]:not([tabindex^="-"])',
];
const FOCUSABLE_ELEMENTS = TORNADO_FOCUSABLE_ELEMENTS
  ? [
      ...TORNADO_FOCUSABLE_ELEMENTS.filter(
        (element) =>
          element !==
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])'
      ),
      'label:first-of-type input[type="radio"]',
    ]
  : [];

/*
 * This function is used to trap the focus inside the modal/sideglass based on the modal wrapper element.
 * It traps the focus inside the modal/sideglass when using the tab / shift+tab key(s).
 * It is used in the PlayerFocusTrapProvider to add/remove the keydown listener to the wrapper element.
 * It's based on a list of focusable elements inside the wrapper
 */

export const tabKeyListener = (
  e: KeyboardEvent,
  wrapper: HTMLElement | null
) => {
  if (e.key !== "Tab" || !wrapper) {
    return;
  }

  const focusableElements = wrapper.querySelectorAll(
    FOCUSABLE_ELEMENTS.join(",")
  );

  if (focusableElements.length === 0) {
    return;
  }

  const currentFocus = document.activeElement as HTMLElement;
  const currentIndexFocus = [...focusableElements].indexOf(currentFocus);
  const nextIndexFocus = (currentIndexFocus + 1) % focusableElements.length;
  const previousIndexFocus = [0, -1].includes(currentIndexFocus)
    ? focusableElements.length - 1
    : currentIndexFocus - 1;
  const elementToFocus = focusableElements[
    e.shiftKey ? previousIndexFocus : nextIndexFocus
  ] as HTMLElement;

  elementToFocus.focus();
  e.preventDefault();
};
