import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { initialState, stateReducer } from "../../../store/state.reducer";
import styles from "../classicNavbar.module.css";
import type { ClassicNavbarProps } from "../classicNavbar.types";
import ClassicNavbar from "../src/classicNavbar.component";

// Mock des modules externes
vi.mock("../../../components/calendly/calendlyButton.component", () => ({
  default: () => <div>Calendly Button</div>,
}));

vi.mock("../../../buttons/src/classicButton.component", () => ({
  ToggleButton: () => <div>Toggle Button</div>,
}));

vi.mock("../../../buttons/src/modeTheme.component", () => ({
  ToggleThemeMode: () => <div>Theme Toggle</div>,
}));

// Mock Redux store
const createMockStore = (overrides = {}) => {
  return configureStore({
    reducer: stateReducer,
    preloadedState: {
      ...initialState,
      client: {
        name: "showcase",
        socials: {
          instagram: { link: "https://instagram.com/test" },
          facebook: { link: "https://facebook.com/test" },
        },
      },
      ...overrides,
    } as any,
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

describe("<ClassicNavbar />", () => {
  const defaultProps: ClassicNavbarProps = {
    features: {
      isFixed: false,
      hasHideOnScroll: false,
      trad: false,
      darkMode: false,
      shouldDisplaySocials: false,
    },
    categories: [
      {
        name: "Accueil",
        link: "/",
      },
      {
        name: "Services",
        link: "/services",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
    content: {
      logo: {
        name: "test_logo",
        shape: "square",
      },
    },
  };

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = "";
  });

  it("should render navbar with data-testid", () => {
    renderWithProviders(<ClassicNavbar {...defaultProps} />);
    expect(screen.getByTestId("classicNavbarRoot")).toBeInTheDocument();
  });

  it("should render logo", () => {
    renderWithProviders(<ClassicNavbar {...defaultProps} />);
    const logo = screen.getByAltText("test_logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining("test_logo.webp"),
    );
  });

  it("should render all navigation categories", () => {
    renderWithProviders(<ClassicNavbar {...defaultProps} />);
    expect(screen.getAllByText("Accueil")).toHaveLength(2); // Desktop + mobile
    expect(screen.getAllByText("Services")).toHaveLength(2);
    expect(screen.getAllByText("Contact")).toHaveLength(2);
  });

  it("should render navigation with sub-categories", () => {
    const propsWithSub: ClassicNavbarProps = {
      ...defaultProps,
      categories: [
        {
          name: "Services",
          sub: [
            { name: "Web", link: "/services/web" },
            { name: "Design", link: "/services/design" },
          ],
        },
      ],
    };

    renderWithProviders(<ClassicNavbar {...propsWithSub} />);
    expect(screen.getAllByText("Services")).toHaveLength(2);
    expect(screen.getAllByText("Web")).toHaveLength(2);
    expect(screen.getAllByText("Design")).toHaveLength(2);
  });

  it("should render language switcher when trad is enabled", () => {
    const propsWithTrad: ClassicNavbarProps = {
      ...defaultProps,
      features: { ...defaultProps.features, trad: true },
    };

    renderWithProviders(<ClassicNavbar {...propsWithTrad} />);
    // Should display either FR or EN button depending on current language
    const button = screen.getByRole("button", { name: /FR|EN/ });
    expect(button).toBeInTheDocument();
  });

  it("should render theme toggle when darkMode is enabled", () => {
    const propsWithDarkMode: ClassicNavbarProps = {
      ...defaultProps,
      features: { ...defaultProps.features, darkMode: true },
      toggleTheme: vi.fn(),
      theme: "light",
    };

    renderWithProviders(<ClassicNavbar {...propsWithDarkMode} />);
    expect(screen.getByText("Theme Toggle")).toBeInTheDocument();
  });

  it("should render Calendly button when provided", () => {
    const propsWithCalendly: ClassicNavbarProps = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        calendly: { url: "https://calendly.com/test" },
      },
    };

    renderWithProviders(<ClassicNavbar {...propsWithCalendly} />);
    expect(screen.getByText("Calendly Button")).toBeInTheDocument();
  });

  it("should render action button when provided", () => {
    const propsWithAction: ClassicNavbarProps = {
      ...defaultProps,
      actionButton: {
        type: "call",
        displayedText: "Appeler",
        hiddenText: "+33123456789",
      },
    };

    renderWithProviders(<ClassicNavbar {...propsWithAction} />);
    expect(screen.getByText("Toggle Button")).toBeInTheDocument();
  });

  it("should apply isFixed class when feature is enabled", () => {
    const propsFixed: ClassicNavbarProps = {
      ...defaultProps,
      features: { ...defaultProps.features, isFixed: true },
    };

    renderWithProviders(<ClassicNavbar {...propsFixed} />);
    const navbar = screen.getByTestId("classicNavbarRoot");
    expect(navbar).toHaveClass(styles.isFixed);
  });

  it("should render burger menu buttons", () => {
    renderWithProviders(<ClassicNavbar {...defaultProps} />);
    const burgerButtons = screen.getAllByRole("button", {
      name: /menu déroulant/i,
    });
    expect(burgerButtons).toHaveLength(2); // One for navbar, one for sidebar
  });

  it("should render sidebar", () => {
    renderWithProviders(<ClassicNavbar {...defaultProps} />);
    const sidebar = document.getElementById("sidebar");
    expect(sidebar).toBeInTheDocument();
  });
});
