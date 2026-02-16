import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { stateReducer } from "../../../../store/state.reducer";
import TattooContact from "../tattooContact.component";
import type { Artist } from "../tattooContact.types";

// Mock d'emailjs
vi.mock("@emailjs/browser", () => ({
  default: {
    init: vi.fn(),
    send: vi.fn(() => Promise.resolve({ status: 200, text: "OK" })),
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
        "contact.tattoo.title": "Demande de tatouage",
        "contact.tattoo.description":
          "Sélectionnez un artiste et remplissez le formulaire",
        "contact.tattoo.selectArtist": "Choisissez votre artiste",
        "contact.tattoo.selectArtistLabel": "Sélectionner l'artiste",
        "contact.tattoo.artistLabel": "Nom de l'artiste",
        "contact.tattoo.artistPlaceholder": "Sélectionnez un artiste",
        "contact.tattoo.artistHint":
          "Choisissez l'artiste avec qui vous souhaitez travailler",
        "contact.tattoo.selectedArtist": "Artiste sélectionné",
        "contact.tattoo.change": "Changer",
        "contact.tattoo.changeArtist": "Changer d'artiste",
        "contact.tattoo.noMailMessage": "Cet artiste n'a pas d'email configuré",
        "contact.tattoo.openMail": "Ouvrir l'application mail",
        "contact.tattoo.openMailApp": "Ouvrir l'application mail",
        "contact.tattoo.mailSubject": "Demande de tatouage pour",
        "contact.email": "E-mail",
        "contact.emailHint": "Votre adresse e-mail",
        "contact.emailPlaceholder": "email@example.com",
        "contact.name": "Nom complet",
        "contact.nameHint": "Votre nom complet",
        "contact.namePlaceholder": "John Doe",
        "contact.phone": "Téléphone",
        "contact.phoneHint": "Votre numéro de téléphone",
        "contact.phonePlaceholder": "0123456789",
        "contact.tattoo.object": "Objet",
        "contact.tattoo.objectHint": "L'objet de votre demande",
        "contact.tattoo.objectPlaceholder": "Nouveau tatouage",
        "contact.content": "Description",
        "contact.tattoo.descriptionHint": "Décrivez votre projet",
        "contact.tattoo.descriptionPlaceholder": "Je souhaite...",
        "contact.tattoo.size": "Taille",
        "contact.tattoo.sizeHint": "Taille en centimètres",
        "contact.tattoo.sizePlaceholder": "10x10",
        "contact.tattoo.zone": "Zone du tatouage",
        "contact.tattoo.zoneHint": "Partie du corps",
        "contact.tattoo.zonePlaceholder": "Avant-bras",
        "contact.tattoo.availability": "Disponibilité",
        "contact.tattoo.availabilityHint": "Vos disponibilités",
        "contact.tattoo.availabilityPlaceholder": "Semaine prochaine",
        "contact.tattoo.budget": "Budget",
        "contact.tattoo.budgetHint": "Budget estimé (optionnel)",
        "contact.tattoo.budgetPlaceholder": "500€",
        "contact.tattoo.photos": "Photos",
        "contact.tattoo.photosHint":
          "Ajoutez jusqu'à 5 photos (max 2MB chacune)",
        "contact.tattoo.errorNotImage": "n'est pas une image",
        "contact.tattoo.errorTooLarge": "est trop volumineux",
        "contact.tattoo.errorMaxFiles": "Maximum 5 photos",
        "contact.tattoo.removePhoto": "Supprimer la photo",
        "contact.send": "Envoyer",
        "contact.sending": "Envoi en cours...",
        "contact.emailSentSuccess": "Email envoyé avec succès",
        "contact.emailSentError": "Erreur lors de l'envoi",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock du composant PopUp
vi.mock("../popup/popUp.component", () => ({
  default: () => <div data-testid="popup">PopUp Component</div>,
}));

const createMockStore = () => {
  return configureStore({
    reducer: stateReducer as any,
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

const mockArtists: Artist[] = [
  { artistName: "John Doe", mail: "john@example.com" },
  { artistName: "Jane Smith", mail: "jane@example.com" },
  { artistName: "Mike Johnson", mail: null },
];

const createContactProps = (overrides = {}) => ({
  datas: {
    artists: mockArtists,
    serviceId: "service_test",
    templateId: "template_test",
    replyTo: "reply@example.com",
    ...overrides,
  },
});

const renderWithProviders = (props = {}) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <TattooContact {...createContactProps(props)} />
      </MemoryRouter>
    </Provider>,
  );
};

describe("<TattooContact />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the component with title and description", () => {
    renderWithProviders();

    expect(screen.getByText("Demande de tatouage")).toBeInTheDocument();
    expect(
      screen.getByText("Sélectionnez un artiste et remplissez le formulaire"),
    ).toBeInTheDocument();
  });

  it("should display artist selection initially", () => {
    renderWithProviders();

    expect(screen.getByText("Choisissez votre artiste")).toBeInTheDocument();

    // Check that the artist select exists
    const artistSelect = screen.getByLabelText(
      /Nom de l'artiste/i,
    ) as HTMLSelectElement;
    expect(artistSelect).toBeInTheDocument();
    expect(artistSelect.tagName).toBe("SELECT");

    // Check that select has correct options (including placeholder)
    const options = artistSelect.querySelectorAll("option");
    expect(options).toHaveLength(4); // 1 placeholder + 3 artists
    expect(options[0].value).toBe("");
    expect(options[0].textContent).toBe("Sélectionnez un artiste");
    expect(options[1].value).toBe("John Doe");
    expect(options[2].value).toBe("Jane Smith");
    expect(options[3].value).toBe("Mike Johnson");
  });

  it("should show form when artist with email is selected", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    // Select artist from the dropdown
    const artistSelect = screen.getByLabelText(/Nom de l'artiste/i);
    await user.selectOptions(artistSelect, "John Doe");

    await waitFor(() => {
      expect(screen.getByText("Artiste sélectionné:")).toBeInTheDocument();
      expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Nom complet/i)).toBeInTheDocument();
    });
  });

  it("should show mailto button when artist without email is selected", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    // Select artist from the dropdown
    const artistSelect = screen.getByLabelText(/Nom de l'artiste/i);
    await user.selectOptions(artistSelect, "Mike Johnson");

    await waitFor(() => {
      expect(
        screen.getByText("Cet artiste n'a pas d'email configuré"),
      ).toBeInTheDocument();
      expect(screen.getByText("Ouvrir l'application mail")).toBeInTheDocument();
    });
  });

  it("should allow changing selected artist", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    // Select first artist
    const artistSelect = screen.getByLabelText(/Nom de l'artiste/i);
    await user.selectOptions(artistSelect, "John Doe");

    await waitFor(() => {
      expect(screen.getByText("Artiste sélectionné:")).toBeInTheDocument();
    });

    // Change artist
    const changeButton = screen.getByText("Changer");
    await user.click(changeButton);

    await waitFor(() => {
      expect(screen.getByText("Choisissez votre artiste")).toBeInTheDocument();
      expect(
        (screen.getByLabelText(/Nom de l'artiste/i) as HTMLSelectElement).value,
      ).toBe("");
    });
  });

  it("should display all required form fields", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    // Select artist from the dropdown
    const artistSelect = screen.getByLabelText(/Nom de l'artiste/i);
    await user.selectOptions(artistSelect, "John Doe");

    await waitFor(() => {
      expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Nom complet/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Téléphone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Objet/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Taille/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Zone du tatouage/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Disponibilité/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Photos/i)).toBeInTheDocument();
    });
  });

  it("should handle photo upload", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    // Select artist from the dropdown
    const artistSelect = screen.getByLabelText(/Nom de l'artiste/i);
    await user.selectOptions(artistSelect, "John Doe");

    await waitFor(() => {
      expect(screen.getByLabelText(/Photos/i)).toBeInTheDocument();
    });

    const file = new File(["photo"], "photo.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/Photos/i) as HTMLInputElement;

    await user.upload(fileInput, file);

    await waitFor(() => {
      expect(screen.getByText("photo.jpg")).toBeInTheDocument();
    });
  });

  it("should display submit button", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    // Select artist from the dropdown
    const artistSelect = screen.getByLabelText(/Nom de l'artiste/i);
    await user.selectOptions(artistSelect, "John Doe");

    await waitFor(() => {
      expect(screen.getByText("Envoyer")).toBeInTheDocument();
    });
  });

  it("should have accessible labels with aria attributes", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    // Select artist from the dropdown
    const artistSelect = screen.getByLabelText(/Nom de l'artiste/i);
    await user.selectOptions(artistSelect, "John Doe");

    await waitFor(() => {
      const emailInput = screen.getByLabelText(/E-mail/i);
      expect(emailInput).toHaveAttribute("aria-describedby", "hint-email");
      expect(emailInput).toHaveAttribute("aria-required", "true");
    });
  });
});
