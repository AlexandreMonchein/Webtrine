export type ButtonType = "call" | "redirect";

export interface ToggleButtonProps {
  /**
   * Type of button behavior
   * - "call": Toggles between displayedText and hiddenText
   * - "redirect": Redirects to contact page
   */
  type: ButtonType;
  /** Text shown by default */
  displayedText: string;
  /** Text shown when toggled (only for "call" type) */
  hiddenText: string;
}
