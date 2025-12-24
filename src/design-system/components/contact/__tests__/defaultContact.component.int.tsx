import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { stateReducer } from "../../../../store/state.reducer";
import DefaultContact from "../defaultContact.component";

// Mock d'emailjs - utiliser directement vi.fn() dans le mock
vi.mock("@emailjs/browser", () => ({
  default: {
    init: vi.fn(),
    send: vi.fn(),
  },
}));

// Mock du module customer.utils
vi.mock("../../../../customer.utils", () => ({
  getCustomer: () => "test-customer",
}));

// Mock de react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "contact.title": "Contact & Devis",
        "contact.description":
          "Contactez-nous pour un renseignement ou un devis",
        "contact.infoTitle": "Informations du contact",
        "contact.phone": "Téléphone",
        "contact.email": "E-mail",
        "contact.name": "Nom",
        "contact.namePlaceholder": "Entrez votre nom",
        "contact.nameHint": "Exemple : John Doe",
        "contact.emailPlaceholder": "Entrez votre e-mail",
        "contact.emailHint": "Exemple : john.doe@example.com",
        "contact.phonePlaceholder": "Entrez votre numéro de téléphone",
        "contact.phoneHint": "Exemple : 0123456789",
        "contact.company": "Entreprise",
        "contact.companyPlaceholder": "Entrez le nom de votre entreprise",
        "contact.content": "Contenu du message",
        "contact.contentHint": "Rédigez votre message ici",
        "contact.contentPlaceholder": "Décrivez votre message",
        "contact.send": "Envoyer",
        "contact.sending": "Envoi en cours...",
        "contact.required": "(Obligatoire)",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock du composant MapLeaflet
vi.mock("../map/moduleLeafletMap.component", () => ({
  MapLeaflet: vi.fn(() => <div data-testid="map-leaflet">Map Component</div>),
}));

// Mock du composant PopUp
vi.mock("../popup/popUp.component", () => ({
  default: () => <div data-testid="popup">PopUp Component</div>,
}));

const createMockStore = () => {
  return configureStore({
    reducer: stateReducer,
    preloadedState: {
      client: {
        contact: {
          phone: "0123456789",
          email: "contact@test.com",
          mailTemplate: "template_test123",
        },
      },
      layout: {
        templates: [],
      },
      popUp: {
        showPopUp: false,
        type: null,
        message: null,
        error: null,
      },
      modal: {
        type: null,
        active: false,
      },
    },
  });
};

const createContactProps = (overrides = {}) => ({
  datas: {
    map: null,
  },
  ...overrides,
});

const renderWithProviders = (
  component: React.ReactNode,
  store = createMockStore(),
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe("DefaultContact Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders contact form with all fields", () => {
    const props = createContactProps();
    renderWithProviders(<DefaultContact {...props} />);

    // Vérifie que tous les champs de formulaire sont présents
    expect(screen.getByLabelText(/Nom/)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Téléphone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Entreprise/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contenu du message/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Envoyer" })).toBeInTheDocument();
  });

  it("renders map when map data is provided", () => {
    const props = createContactProps();
    renderWithProviders(<DefaultContact {...props} />);

    // Vérifie que le composant de carte est rendu
    expect(screen.getByTestId("map-leaflet")).toBeInTheDocument();
  });

  it("does not render map when map data is not provided", () => {
    const props = createContactProps({ datas: {} });
    renderWithProviders(<DefaultContact {...props} />);

    // Vérifie que le composant de carte n'est pas rendu
    expect(screen.queryByTestId("map-leaflet")).not.toBeInTheDocument();
  });

  it("shows all required field indicators", () => {
    const props = createContactProps();
    renderWithProviders(<DefaultContact {...props} />);

    // Vérifie les indicateurs de champs obligatoires
    const requiredIndicators = screen.getAllByText("(Obligatoire)");
    expect(requiredIndicators.length).toBeGreaterThan(0);
  });

  it("renders PopUp component", () => {
    const props = createContactProps();
    renderWithProviders(<DefaultContact {...props} />);

    // Vérifie que le composant PopUp est rendu
    expect(screen.getByTestId("popup")).toBeInTheDocument();
  });

  it("renders contact information", () => {
    const props = createContactProps();
    const store = createMockStore();
    renderWithProviders(<DefaultContact {...props} />, store);

    // Vérifie que les informations de contact sont affichées
    expect(screen.getByText("0123456789")).toBeInTheDocument();
    expect(screen.getByText("contact@test.com")).toBeInTheDocument();
  });
});
