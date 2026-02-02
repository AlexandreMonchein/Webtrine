import { type PropsWithChildren } from "react";

export type ExampleVariant = "default" | "primary" | "secondary";

export type ExampleProps = PropsWithChildren<{
  /** Optional title for the component */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Visual variant of the component */
  variant?: ExampleVariant;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Test ID for testing */
  "data-testid"?: string;
}>;
