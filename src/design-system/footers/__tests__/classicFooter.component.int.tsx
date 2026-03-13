import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import ClassicFooter from "../classicFooter.component";
import type { ClassicFooterProps } from "../classicFooter.types";

// Mock Redux store
const createMockStore = (overrides = {}) => {
  return configureStore({
    reducer: {
      state: (
        state = {
          client: { name: "showcase" },
          socials: {
            instagram: { link: "https://instagram.com/test", color: "#E4405F" },
            facebook: { link: "https://facebook.com/test", color: "#1877F2" },
          },
          templates: [
            { type: "legals", datas: { type: "mentions-legals" } },
            { type: "legals", datas: { type: "confidentialite" } },
          ],
          ...overrides,
        },
      ) => state,
    },
  });
};

// Helper pour rendre avec tous les providers
const renderWithProviders = (
  ui: React.ReactElement,
  { store = createMockStore(), ...renderOptions } = {},
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
    renderOptions,
  );
};

describe("<ClassicFooter />", () => {
  const defaultProps: ClassicFooterProps = {
    logo: {
      name: "test_logo",
      shape: "square",
      alt: "Test Logo",
      link: "/",
    },
  };

  beforeEach(() => {
    // Mock pour getLogoDimensions si nécessaire
  });

  it("should render footer with data-testid", () => {
    renderWithProviders(<ClassicFooter {...defaultProps} />);
    expect(screen.getByTestId("classicFooterRoot")).toBeInTheDocument();
  });

  it("should render logo when provided", () => {
    renderWithProviders(<ClassicFooter {...defaultProps} />);
    const logo = screen.getByAltText("Test Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining("test_logo.webp"),
    );
  });

  it("should render without logo", () => {
    renderWithProviders(<ClassicFooter />);
    const footer = screen.getByTestId("classicFooterRoot");
    expect(footer).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should render copyright text", () => {
    renderWithProviders(<ClassicFooter {...defaultProps} />);
    expect(
      screen.getByText("Webtrine 2025 - tous droits réservés."),
    ).toBeInTheDocument();
  });

  it("should render copyright link with correct href", () => {
    renderWithProviders(<ClassicFooter {...defaultProps} />);
    const copyrightLink = screen.getByText(
      "Webtrine 2025 - tous droits réservés.",
    );
    expect(copyrightLink).toHaveAttribute("href", "https://www.webtrine.fr");
  });

  it("should render legal links from Redux", () => {
    renderWithProviders(<ClassicFooter {...defaultProps} />);
    expect(screen.getByText("mentions-legals")).toBeInTheDocument();
    expect(screen.getByText("confidentialite")).toBeInTheDocument();
  });

  it("should render social links from Redux", () => {
    renderWithProviders(<ClassicFooter {...defaultProps} />);
    // Les liens sociaux sont rendus dynamiquement, vérifions qu'ils existent
    const socialLinks = screen.getAllByRole("link", {
      name: /instagram|facebook/i,
    });
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it("should not render social links with empty link", () => {
    const storeWithEmptySocial = createMockStore({
      socials: {
        instagram: { link: "", color: "#E4405F" },
        facebook: { link: "https://facebook.com/test", color: "#1877F2" },
      },
    });
    renderWithProviders(<ClassicFooter {...defaultProps} />, {
      store: storeWithEmptySocial,
    });

    // Instagram ne devrait pas être rendu (lien vide)
    expect(screen.queryByLabelText("instagram")).not.toBeInTheDocument();
    // Facebook devrait être rendu
    expect(screen.getByLabelText("facebook")).toBeInTheDocument();
  });

  it("should render with horizontal logo shape", () => {
    const horizontalProps: ClassicFooterProps = {
      logo: {
        name: "horizontal_logo",
        shape: "horizontal",
        alt: "Horizontal Logo",
        link: "/home",
      },
    };
    renderWithProviders(<ClassicFooter {...horizontalProps} />);
    const logo = screen.getByAltText("Horizontal Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should handle empty legals array", () => {
    const storeWithoutLegals = createMockStore({
      templates: [],
    });
    renderWithProviders(<ClassicFooter {...defaultProps} />, {
      store: storeWithoutLegals,
    });

    // Footer devrait toujours être rendu
    expect(screen.getByTestId("classicFooterRoot")).toBeInTheDocument();
    // Mais pas de liens légaux
    expect(screen.queryByText("mentions-legals")).not.toBeInTheDocument();
  });
});
