import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { Example } from "../example.component";
import type { ExampleProps } from "../example.types";

describe("<Example />", () => {
  let props: ExampleProps;

  beforeEach(() => {
    props = {
      title: "Test Title",
      description: "Test Description",
    };
  });

  it("should render the component", () => {
    render(<Example {...props} />);
    expect(screen.getByTestId("exampleRoot")).toBeInTheDocument();
  });

  it("should render title when provided", () => {
    render(<Example {...props} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should not render title when not provided", () => {
    render(<Example {...props} title={undefined} />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("should render description when provided", () => {
    render(<Example {...props} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("should not render description when not provided", () => {
    const { container } = render(
      <Example {...props} description={undefined} />,
    );
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  it("should render children", () => {
    render(<Example {...props}>Child content</Example>);
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("should apply primary variant class", () => {
    render(<Example {...props} variant="primary" />);
    const element = screen.getByTestId("exampleRoot");
    expect(element.className).toContain("exampleRootPrimary");
  });

  it("should apply secondary variant class", () => {
    render(<Example {...props} variant="secondary" />);
    const element = screen.getByTestId("exampleRoot");
    expect(element.className).toContain("exampleRootSecondary");
  });

  it("should apply disabled class when disabled", () => {
    render(<Example {...props} disabled />);
    const element = screen.getByTestId("exampleRoot");
    expect(element.className).toContain("exampleRootDisabled");
  });

  it("should have default variant by default", () => {
    render(<Example {...props} />);
    const element = screen.getByTestId("exampleRoot");
    expect(element.className).not.toContain("exampleRootPrimary");
    expect(element.className).not.toContain("exampleRootSecondary");
  });
});
