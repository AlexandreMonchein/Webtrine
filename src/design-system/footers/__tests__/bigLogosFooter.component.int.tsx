import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it } from "vitest";

import BigLogosFooter from "../bigLogosFooter.component";
import type { BigLogosFooterProps } from "../bigLogosFooter.types";

// Mock Redux store
const createMockStore = (overrides = {}) => {
  return configureStore({
    reducer: {
      state: (
        state = {
          client: { name: "showcase" },
          socials: {
            facebook: { link: "https://facebook.com/test", color: "full" },
            instagram: { link: "https://instagram.com/test", color: "full" },
          },
          ...overrides,
        },
      ) => state,
    },
  });
};

// Helper pour rendre avec providers
const renderWithProviders = (
  ui: React.ReactElement,
  { store = createMockStore(), ...renderOptions } = {},
) => {
  return render(<Provider store={store}>{ui}</Provider>, renderOptions);
};

describe("<BigLogosFooter />", () => {
  const defaultProps: BigLogosFooterProps = {
    menuSection: {
      title: "Navigation",
      links: [
        { label: "Accueil", url: "/" },
        { label: "Contact", url: "/contact" },
      ],
    },
    brandInfo: {
      title: "Notre entreprise",
      description: "<p><strong>Contact : test@example.com</strong></p>",
      additionalText: "Suivez-nous sur les réseaux !",
    },
    logos: [
      { name: "partner1", alt: "Partenaire 1", url: "https://partner1.com" },
      { name: "partner2", alt: "Partenaire 2" },
    ],
  };

  beforeEach(() => {
    // Reset any global state if needed
  });

  it("should render footer with data-testid", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    expect(screen.getByTestId("bigLogosFooterRoot")).toBeInTheDocument();
  });

  it("should render menu section with title and links", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("should render brand section with title and description", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    expect(screen.getByText("Notre entreprise")).toBeInTheDocument();
    expect(screen.getByText("Contact : test@example.com")).toBeInTheDocument();
  });

  it("should render additional text when provided", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    expect(
      screen.getByText("Suivez-nous sur les réseaux !"),
    ).toBeInTheDocument();
  });

  it("should not render additional text when not provided", () => {
    const propsWithoutAdditionalText: BigLogosFooterProps = {
      ...defaultProps,
      brandInfo: {
        ...defaultProps.brandInfo!,
        additionalText: undefined,
      },
    };
    renderWithProviders(<BigLogosFooter {...propsWithoutAdditionalText} />);
    expect(
      screen.queryByText("Suivez-nous sur les réseaux !"),
    ).not.toBeInTheDocument();
  });

  it("should render logos when provided", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    expect(screen.getByAltText("Partenaire 1")).toBeInTheDocument();
    expect(screen.getByAltText("Partenaire 2")).toBeInTheDocument();
  });

  it("should render clickable logo when url is provided", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    const logoLink = screen
      .getByAltText("Partenaire 1")
      .closest("a") as HTMLAnchorElement;
    expect(logoLink).toHaveAttribute("href", "https://partner1.com");
    expect(logoLink).toHaveAttribute("target", "_blank");
    expect(logoLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render non-clickable logo when url is not provided", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    const logo = screen.getByAltText("Partenaire 2");
    expect(logo.closest("a")).not.toBeInTheDocument();
  });

  it("should not render logos section when logos is null", () => {
    const propsWithoutLogos: BigLogosFooterProps = {
      ...defaultProps,
      logos: undefined,
    };
    renderWithProviders(<BigLogosFooter {...propsWithoutLogos} />);
    expect(screen.queryByAltText("Partenaire 1")).not.toBeInTheDocument();
  });

  it("should not render menu section when menuSection is undefined", () => {
    const propsWithoutMenu: BigLogosFooterProps = {
      ...defaultProps,
      menuSection: undefined,
    };
    renderWithProviders(<BigLogosFooter {...propsWithoutMenu} />);
    expect(screen.queryByText("Navigation")).not.toBeInTheDocument();
  });

  it("should not render brand section when brandInfo is undefined", () => {
    const propsWithoutBrand: BigLogosFooterProps = {
      ...defaultProps,
      brandInfo: undefined,
    };
    renderWithProviders(<BigLogosFooter {...propsWithoutBrand} />);
    expect(screen.queryByText("Notre entreprise")).not.toBeInTheDocument();
  });

  it("should render copyright link", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    const copyrightLink = screen.getByText(
      "Webtrine 2025 - tous droits réservés.",
    );
    expect(copyrightLink).toBeInTheDocument();
    expect(copyrightLink).toHaveAttribute("href", "https://www.webtrine.fr");
  });

  it("should render with correct ARIA labels", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    expect(
      screen.getByRole("navigation", { name: "Liens du footer" }),
    ).toBeInTheDocument();
  });

  it("should apply isLogo class when logos are provided", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    const footerGrid = screen
      .getByTestId("bigLogosFooterRoot")
      .querySelector("div > div");
    expect(footerGrid).toHaveClass("isLogo");
  });

  it("should not apply isLogo class when logos are not provided", () => {
    const propsWithoutLogos: BigLogosFooterProps = {
      ...defaultProps,
      logos: undefined,
    };
    renderWithProviders(<BigLogosFooter {...propsWithoutLogos} />);
    const footerGrid = screen
      .getByTestId("bigLogosFooterRoot")
      .querySelector("div > div");
    expect(footerGrid).not.toHaveClass("isLogo");
  });

  it("should handle empty logos array", () => {
    const propsWithEmptyLogos: BigLogosFooterProps = {
      ...defaultProps,
      logos: [],
    };
    renderWithProviders(<BigLogosFooter {...propsWithEmptyLogos} />);
    expect(screen.queryByAltText("Partenaire 1")).not.toBeInTheDocument();
  });

  it("should render menu links with correct href", () => {
    renderWithProviders(<BigLogosFooter {...defaultProps} />);
    const accueilLink = screen.getByText("Accueil");
    expect(accueilLink).toHaveAttribute("href", "/");

    const contactLink = screen.getByText("Contact");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });
});
