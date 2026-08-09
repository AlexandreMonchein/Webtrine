import emailjs from "@emailjs/browser";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { stateReducer } from "../../../../store/state.reducer";
import PetSittingContact from "../petSittingContact.component";

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
        "contact.title": "Contact & Devis",
        "contact.description": "Je suis disponible pour tout renseignement",
        "contact.infoTitle": "Contactez-moi par:",
        "contact.phone": "Téléphone",
        "contact.email": "E-mail",
        "contact.socials": "Réseaux sociaux",
        "contact.requiredAriaLabel": "obligatoire",
        "contact.emailSentSuccess": "Email envoyé avec succès!",
        "contact.emailSentError": "Erreur : L'email n'a pas pu être envoyé.",
        "contact.firstName": "Prénom",
        "contact.firstNamePlaceholder": "Votre prénom",
        "contact.firstNameHint": "Veuillez saisir votre prénom",
        "contact.firstNameAriaLabel": "Prénom, champ obligatoire",
        "contact.lastName": "Nom",
        "contact.lastNamePlaceholder": "Votre nom",
        "contact.lastNameHint": "Veuillez saisir votre nom",
        "contact.lastNameAriaLabel": "Nom de famille, champ obligatoire",
        "contact.emailLabel": "Adresse e-mail",
        "contact.emailPlaceholder": "email@example.com",
        "contact.emailHintFormat": "Format attendu : email@example.com",
        "contact.emailAriaLabel": "Adresse e-mail, champ obligatoire",
        "contact.phoneLabel": "Numéro de téléphone",
        "contact.phonePlaceholder": "0624787442",
        "contact.phoneHintFormat": "Format : 10 chiffres",
        "contact.phoneAriaLabel":
          "Numéro de téléphone, champ obligatoire, format 10 chiffres",
        "contact.address": "Adresse postale",
        "contact.addressPlaceholder": "123 rue Exemple",
        "contact.addressHint": "Adresse complète où se dérouleront les visites",
        "contact.addressAriaLabel":
          "Adresse postale complète, champ obligatoire",
        "contact.cp": "Code postal",
        "contact.cpPlaceholder": "69800",
        "contact.cpHint": "Format : 5 chiffres (ex: 69800)",
        "contact.cpAriaLabel":
          "Code postal, champ obligatoire, format 5 chiffres",
        "contact.city": "Ville",
        "contact.cityPlaceholder": "Lyon",
        "contact.cityHint": "Ville où se dérouleront les visites",
        "contact.cityAriaLabel": "Ville, champ obligatoire",
        "contact.firstVisitDate": "Date du premier passage",
        "contact.firstVisitDateHint": "Sélectionnez la date de début de garde",
        "contact.firstVisitDateAriaLabel":
          "Date du premier passage, champ obligatoire",
        "contact.lastVisitDate": "Date du dernier passage",
        "contact.lastVisitDateHint": "Sélectionnez la date de fin de garde",
        "contact.lastVisitDateAriaLabel":
          "Date du dernier passage, champ obligatoire",
        "contact.preVisitDateTime": "Date et heure de la pré-visite",
        "contact.preVisitDateTimeHint":
          "Sélectionnez une date et heure pour la visite de rencontre",
        "contact.preVisitDateTimeAriaLabel":
          "Date et heure de la pré-visite, champ obligatoire",
        "contact.howKnown": "Comment nous avez-vous connu ?",
        "contact.howKnownHint": "Sélectionnez comment vous avez découvert",
        "contact.howKnownAriaLabel":
          "Comment avez-vous connu le service, champ obligatoire",
        "contact.howKnownSelectOption": "-- Sélectionnez une option --",
        "contact.howKnownSocial": "Réseaux sociaux (Facebook, Instagram)",
        "contact.howKnownWordOfMouth": "Bouche à oreille",
        "contact.howKnownInternet": "Recherche internet",
        "contact.howKnownFlyer": "Flyer / Publicité",
        "contact.howKnownOther": "Autre",
        "contact.visitFrequency": "Fréquence des visites",
        "contact.visitFrequencyHint": "Nombre de passages souhaités par jour",
        "contact.visitFrequencyAriaLabel":
          "Fréquence des visites par jour, champ obligatoire",
        "contact.visitFrequency1PerDay": "1 visite par jour",
        "contact.visitFrequency2PerDay": "2 visites par jour",
        "contact.petType": "Type d'animaux à garder",
        "contact.petTypeHint": "Sélectionnez le type d'animal",
        "contact.petTypeAriaLabel":
          "Type d'animaux à garder, champ obligatoire",
        "contact.petTypeDog": "Chien",
        "contact.petTypeCat": "Chat",
        "contact.petTypeNac": "NAC (Lapin, Furet, etc.)",
        "contact.petTypeMultiple": "Plusieurs types d'animaux",
        "contact.additionalInfo": "Autres informations (facultatif)",
        "contact.additionalInfoHint": "Toute information complémentaire",
        "contact.additionalInfoPlaceholder": "Informations complémentaires...",
        "contact.additionalInfoAriaLabel":
          "Autres informations à transmettre, champ facultatif",
        "contact.submitButton": "Envoyer la demande",
        "contact.submitting": "Envoi en cours...",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock du composant PopUp
vi.mock("../../popup/popUp.component", () => ({
  default: () => <div data-testid="popup">PopUp Component</div>,
}));

// Mock de la carte Leaflet
vi.mock("../../map/moduleLeafletZone.component", () => ({
  MapLeafletZone: () => <div data-testid="map-leaflet-zone">Map Zone</div>,
}));

// Mock du hook de chargement des logos sociaux
vi.mock("../../../utils/useLoadComponents.hook", () => ({
  useLoadComponents: () => [],
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
        logo: "test_logo",
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

const renderWithProviders = () => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <PetSittingContact />
      </MemoryRouter>
    </Provider>,
  );
};

// Date future au format YYYY-MM-DD (les champs date ont un min à aujourd'hui)
const futureDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
};

// Même conversion que le composant pour l'email : YYYY-MM-DD -> DD-MM-YYYY
const toEmailFormat = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");
  return `${day}-${month}-${year}`;
};

const fillRequiredFields = async (
  user: ReturnType<typeof userEvent.setup>,
  dates: { first: string; last: string; pre: string },
) => {
  await user.type(screen.getByLabelText(/^Prénom/), "Jean");
  await user.type(screen.getByLabelText(/Nom de famille/), "Dupont");
  await user.type(screen.getByLabelText(/Adresse e-mail/), "jean@example.com");
  await user.type(screen.getByLabelText(/Numéro de téléphone/), "0612345678");
  await user.type(screen.getByLabelText(/Adresse postale/), "12 rue Exemple");
  await user.type(screen.getByLabelText(/Code postal/), "69800");
  await user.type(screen.getByLabelText(/^Ville/), "Lyon");

  fireEvent.change(screen.getByLabelText(/Date du premier passage/), {
    target: { value: dates.first },
  });
  fireEvent.change(screen.getByLabelText(/Date du dernier passage/), {
    target: { value: dates.last },
  });
  fireEvent.change(screen.getByLabelText(/Date et heure de la pré-visite/), {
    target: { value: dates.pre },
  });

  await user.selectOptions(
    screen.getByLabelText(/Comment avez-vous connu/),
    "flyer",
  );
  await user.selectOptions(
    screen.getByLabelText(/Fréquence des visites/),
    "1-par-jour",
  );
  await user.selectOptions(screen.getByLabelText(/Type d'animaux/), "chien");
};

describe("<PetSittingContact />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the component with title and description", () => {
    renderWithProviders();

    expect(screen.getByText("Contact & Devis")).toBeInTheDocument();
    expect(
      screen.getByText("Je suis disponible pour tout renseignement"),
    ).toBeInTheDocument();
  });

  it("should render contact information", () => {
    renderWithProviders();

    expect(screen.getByText("0123456789")).toBeInTheDocument();
    expect(screen.getByText("contact@test.com")).toBeInTheDocument();
  });

  it("should render PopUp and map zone components", () => {
    renderWithProviders();

    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByTestId("map-leaflet-zone")).toBeInTheDocument();
  });

  it("should display all form fields", () => {
    renderWithProviders();

    expect(screen.getByLabelText(/^Prénom/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom de famille/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Adresse e-mail/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numéro de téléphone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Adresse postale/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Code postal/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Ville/)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Date du premier passage/),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Date du dernier passage/),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Date et heure de la pré-visite/),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Comment avez-vous connu/),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Fréquence des visites/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type d'animaux/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Autres informations/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Envoyer la demande" }),
    ).toBeInTheDocument();
  });

  it("should constrain postal code input to 5 digits", () => {
    renderWithProviders();

    const cpInput = screen.getByLabelText(/Code postal/) as HTMLInputElement;
    expect(cpInput).toHaveAttribute("pattern", "^\\d{5}$");
    expect(cpInput).toHaveAttribute("maxlength", "5");
    expect(cpInput).toHaveAttribute("inputmode", "numeric");
    expect(cpInput).toBeRequired();
  });

  it("should have accessible labels with aria attributes", () => {
    renderWithProviders();

    const cpInput = screen.getByLabelText(/Code postal/);
    expect(cpInput).toHaveAttribute("aria-describedby", "hint-cp");
    expect(cpInput).toHaveAttribute("aria-required", "true");

    const cityInput = screen.getByLabelText(/^Ville/);
    expect(cityInput).toHaveAttribute("aria-describedby", "hint-city");
    expect(cityInput).toHaveAttribute("aria-required", "true");
  });

  it("should display pet type options", () => {
    renderWithProviders();

    const petTypeSelect = screen.getByLabelText(
      /Type d'animaux/,
    ) as HTMLSelectElement;
    const options = petTypeSelect.querySelectorAll("option");
    expect(options).toHaveLength(5); // 1 placeholder + 4 types
    expect(options[1].value).toBe("chien");
    expect(options[2].value).toBe("chat");
    expect(options[3].value).toBe("nac");
    expect(options[4].value).toBe("plusieurs");
  });

  it("should update lastVisitDate min when firstVisitDate changes", () => {
    renderWithProviders();

    const firstVisit = futureDate(10);
    fireEvent.change(screen.getByLabelText(/Date du premier passage/), {
      target: { value: firstVisit },
    });

    expect(screen.getByLabelText(/Date du dernier passage/)).toHaveAttribute(
      "min",
      firstVisit,
    );
    expect(
      screen.getByLabelText(/Date et heure de la pré-visite/),
    ).toHaveAttribute("max", firstVisit);
  });

  it("should send email with form data including postal code and city", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const dates = {
      first: futureDate(10),
      last: futureDate(20),
      pre: futureDate(5),
    };
    await fillRequiredFields(user, dates);

    await user.click(screen.getByRole("button", { name: "Envoyer la demande" }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });

    const [, templateId, payload] = vi.mocked(emailjs.send).mock.calls[0];
    expect(templateId).toBe("template_test123");
    expect(payload).toMatchObject({
      firstName: "Jean",
      lastName: "Dupont",
      emailFrom: "jean@example.com",
      number: "0612345678",
      address: "12 rue Exemple",
      cp: "69800",
      city: "Lyon",
      firstVisit: toEmailFormat(dates.first),
      lastVisit: toEmailFormat(dates.last),
      preVisitDateTime: toEmailFormat(dates.pre),
      howKnown: "flyer",
      visitFrequency: "1-par-jour",
      petType: "chien",
    });
  });

  it("should reset the form after a successful submit", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await fillRequiredFields(user, {
      first: futureDate(10),
      last: futureDate(20),
      pre: futureDate(5),
    });

    await user.click(screen.getByRole("button", { name: "Envoyer la demande" }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(
        (screen.getByLabelText(/^Prénom/) as HTMLInputElement).value,
      ).toBe("");
      expect(
        (screen.getByLabelText(/Code postal/) as HTMLInputElement).value,
      ).toBe("");
    });
  });

  it("should re-enable the submit button after a failed send", async () => {
    vi.mocked(emailjs.send).mockRejectedValueOnce(new Error("network"));
    const user = userEvent.setup();
    renderWithProviders();

    await fillRequiredFields(user, {
      first: futureDate(10),
      last: futureDate(20),
      pre: futureDate(5),
    });

    await user.click(screen.getByRole("button", { name: "Envoyer la demande" }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      const button = screen.getByRole("button", {
        name: "Envoyer la demande",
      });
      expect(button).not.toBeDisabled();
    });
  });
});
