import { type PropsWithChildren } from "react";

export type ExampleVariant = "default" | "primary" | "secondary";

export type ExampleProps = PropsWithChildren<{
  title?: string;
  description?: string;
  variant?: ExampleVariant;
  disabled?: boolean;
}>;
