import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import DescriptionComponent from "../description.component";

// Mock du module customer.utils
vi.mock("../../../../customer.utils", () => ({
  getCustomer: () => "test-customer",
}));

const createDescriptionProps = (overrides = {}) => ({
  type: "description" as const,
  features: { isReversed: false, isContinious: false },
  title: "Test Title",
  content: [
    { text: "First paragraph of content." },
    { text: "Second paragraph with <strong>formatting</strong>." },
  ],
  image: {
    name: "test_image",
    alt: "Test image description",
    focusable: false,
  },
  ...overrides,
});

const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Description Component", () => {
  it("renders title and content correctly", () => {
    const props = createDescriptionProps();

    renderWithRouter(<DescriptionComponent {...props} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("First paragraph of content.")).toBeInTheDocument();
    expect(screen.getByText(/Second paragraph with/)).toBeInTheDocument();
  });

  it("renders HTML content safely", () => {
    const props = createDescriptionProps({
      content: [
        {
          text: "Content with <strong>bold text</strong> and <em>italic</em>.",
        },
      ],
    });

    renderWithRouter(<DescriptionComponent {...props} />);

    const boldElement = screen.getByText("bold text");
    expect(boldElement.tagName).toBe("STRONG");
  });

  it("renders button links when provided", () => {
    const props = createDescriptionProps({
      content: [
        { text: "Some text content." },
        { button: { label: "Contact Us", to: "/contact" } },
        { text: "More text after button." },
      ],
    });

    renderWithRouter(<DescriptionComponent {...props} />);

    const button = screen.getByRole("link", { name: "Contact Us" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/contact");
  });

  it("renders image when provided", () => {
    const props = createDescriptionProps();

    renderWithRouter(<DescriptionComponent {...props} />);

    const image = screen.getByAltText("Test image description");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("test_image.webp"),
    );
  });

  it("does not render image when not provided", () => {
    const props = createDescriptionProps({ image: undefined });

    renderWithRouter(<DescriptionComponent {...props} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("does not render title when not provided", () => {
    const props = createDescriptionProps({ title: undefined });

    renderWithRouter(<DescriptionComponent {...props} />);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("applies reversed layout when isReversed is true", () => {
    const props = createDescriptionProps({
      features: { isReversed: true, isContinious: false },
    });

    const { container } = renderWithRouter(<DescriptionComponent {...props} />);

    const imageContainer = container.querySelector(".isReversed");
    expect(imageContainer).toBeInTheDocument();
  });

  it("applies continuous layout when isContinious is true", () => {
    const props = createDescriptionProps({
      features: { isReversed: false, isContinious: true },
    });

    const { container } = renderWithRouter(<DescriptionComponent {...props} />);

    const section = container.querySelector(".isContinious");
    expect(section).toBeInTheDocument();
  });

  it("is accessible via keyboard navigation", async () => {
    const user = userEvent.setup();
    const props = createDescriptionProps({
      content: [
        { text: "Text content." },
        { button: { label: "Learn More", to: "/learn" } },
      ],
    });

    renderWithRouter(<DescriptionComponent {...props} />);

    // Test navigation au clavier vers le titre
    const title = screen.getByText("Test Title");
    expect(title).toHaveAttribute("tabindex", "0");

    // Test navigation vers le bouton
    const button = screen.getByRole("link", { name: "Learn More" });
    expect(button).toHaveAttribute("tabindex", "0");
  });

  it("handles mixed content types correctly", () => {
    const props = createDescriptionProps({
      content: [
        { text: "Introduction text." },
        { button: { label: "Primary Action", to: "/action" } },
        { text: "Middle text content." },
        { button: { label: "Secondary Action", to: "/secondary" } },
        { text: "Conclusion text." },
      ],
    });

    renderWithRouter(<DescriptionComponent {...props} />);

    // Vérifie que tous les éléments sont rendus
    expect(screen.getByText("Introduction text.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Primary Action" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Middle text content.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Secondary Action" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Conclusion text.")).toBeInTheDocument();
  });

  it("handles empty content gracefully", () => {
    const props = createDescriptionProps({ content: [] });

    renderWithRouter(<DescriptionComponent {...props} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    // Pas d'erreur même avec un contenu vide
  });
});
