import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CallToAction from "../callToAction.component";

const TestIcon = () => (
  <svg data-testid="test-icon">
    <path d="M0 0" />
  </svg>
);

describe("<CallToAction />", () => {
  it("should render button with text", () => {
    render(<CallToAction text="Cliquez ici" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Cliquez ici");
  });

  it("should render button with icon", () => {
    render(<CallToAction text="Avec icône" icon={<TestIcon />} />);

    const button = screen.getByTestId("callToActionRoot");
    const icon = screen.getByTestId("test-icon");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<CallToAction text="Cliquez" onClick={handleClick} />);

    const button = screen.getByTestId("callToActionRoot");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render as link when href is provided", () => {
    render(<CallToAction text="Lien" href="/test" />);

    const link = screen.getByTestId("callToActionRoot");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render as button when no href is provided", () => {
    render(<CallToAction text="Bouton" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
  });

  it("should apply primary variant class", () => {
    render(<CallToAction text="Primary" variant="primary" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button.className).toContain("primary");
  });

  it("should apply secondary variant class", () => {
    render(<CallToAction text="Secondary" variant="secondary" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button.className).toContain("secondary");
  });

  it("should apply small size class", () => {
    render(<CallToAction text="Small" size="small" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button.className).toContain("small");
  });

  it("should apply medium size class by default", () => {
    render(<CallToAction text="Medium" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button.className).toContain("medium");
  });

  it("should apply large size class", () => {
    render(<CallToAction text="Large" size="large" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button.className).toContain("large");
  });

  it("should have aria-label attribute", () => {
    render(<CallToAction text="Accessible" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button).toHaveAttribute("aria-label", "Accessible");
  });

  it("should apply pill shape class by default", () => {
    render(<CallToAction text="Pill" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button.className).toContain("pill");
  });

  it("should apply rounded shape class", () => {
    render(<CallToAction text="Rounded" shape="rounded" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button.className).toContain("rounded");
  });

  it("should render without icon when not provided", () => {
    render(<CallToAction text="Sans icône" />);

    const button = screen.getByTestId("callToActionRoot");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).not.toBeInTheDocument();
  });
});
