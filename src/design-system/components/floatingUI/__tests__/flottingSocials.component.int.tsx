import "@testing-library/jest-dom";

import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getSocials } from "../../../../store/state.selector";
import FloatingSocials from "../floatingSocials.component";

// Mock des icônes
const MockIcon = ({ color }: { color?: string }) => (
  <svg data-testid="social-icon" data-color={color}>
    <rect width="24" height="24" />
  </svg>
);

// Mock du sélecteur Redux
vi.mock("../../../../store/state.selector", () => ({
  getSocials: vi.fn(),
}));

// Récupérer la fonction mockée
const mockGetSocials = vi.mocked(getSocials);

// Mock des imports dynamiques d'icônes
const mockIconImports = {
  "../../../assets/icons/facebook.component.tsx": () =>
    Promise.resolve({ default: MockIcon }),
  "../../../assets/icons/instagram.component.tsx": () =>
    Promise.resolve({ default: MockIcon }),
  "../../../assets/icons/twitter.component.tsx": () =>
    Promise.resolve({ default: MockIcon }),
  "../../../assets/icons/linkedin.component.tsx": () =>
    Promise.resolve({ default: MockIcon }),
};

Object.defineProperty(import.meta, "glob", {
  value: vi.fn(() => mockIconImports),
  configurable: true,
});

const createStore = () => {
  return configureStore({
    reducer: {
      app: (state = {}, action) => state,
    },
  });
};

const renderWithProvider = () => {
  const store = createStore();
  return render(
    <Provider store={store}>
      <FloatingSocials />
    </Provider>,
  );
};

describe("FloatingSocials Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render if no socials are provided", () => {
    // Pas de socials - retourne null
    mockGetSocials.mockReturnValue(null);

    renderWithProvider();

    // Le composant ne devrait pas rendre de container
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("should render the socials when provided", async () => {
    // Configure les socials avec facebook et instagram
    mockGetSocials.mockReturnValue({
      facebook: {
        link: "https://facebook.com/test",
      },
      instagram: {
        link: "https://instagram.com/test",
      },
    });

    renderWithProvider();

    // Le container devrait être présent
    expect(screen.getByRole("complementary")).toBeInTheDocument();
    expect(screen.getByRole("complementary")).toHaveAttribute(
      "aria-label",
      "Liens vers les réseaux sociaux",
    );

    // Attendre que les icônes se chargent - chercher les SVG directement
    await waitFor(() => {
      const svgElements = document.querySelectorAll("svg");
      expect(svgElements.length).toBe(2); // Facebook et Instagram
    });

    // Vérifier que les liens sont présents avec les bonnes URLs
    await waitFor(() => {
      const facebookLink = screen.getByLabelText("facebook");
      const instagramLink = screen.getByLabelText("instagram");

      expect(facebookLink).toBeInTheDocument();
      expect(instagramLink).toBeInTheDocument();
      expect(facebookLink).toHaveAttribute("href", "https://facebook.com/test");
      expect(instagramLink).toHaveAttribute(
        "href",
        "https://instagram.com/test",
      );
    });
  });
});
