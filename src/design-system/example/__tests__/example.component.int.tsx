import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { Example } from "../example.component";
import type { ExampleProps } from "../example.types";

describe("<Example />", () => {
  let props: ExampleProps;

  beforeEach(() => {
    props = {
      "data-testid": "example-testid",
    };
  });

  it("should render with content", () => {
    render(<Example {...props} />);

    expect(screen.getByTestId("example-testid")).toBeVisible();
  });
});
