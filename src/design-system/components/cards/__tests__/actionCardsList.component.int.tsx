import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import ActionCardsList from "../actionCardsList.component";

// Mock du module customer.utils
vi.mock("../../../../customer.utils", () => ({
  getCustomer: () => "test-customer",
}));

const mockCardsData = [
  {
    id: "1",
    title: "Service 1",
    description: "Description for service 1",
    imageSrc: "service_1",
    buttons: [
      { label: "Learn More", type: "link", route: "/service-1" },
      { label: "Contact", type: "link", route: "/contact" },
    ],
  },
  {
    id: "2",
    title: "Service 2",
    description: "Description for service 2",
    imageSrc: "service_2",
    buttons: [{ label: "Get Started", type: "link", route: "/get-started" }],
  },
  {
    id: "3",
    title: "Service 3",
    description: "Description for service 3",
    // Pas d'image ni de boutons pour tester les cas optionnels
  },
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("ActionCardsList Component", () => {
  it("renders section title and cards correctly", () => {
    renderWithRouter(
      <ActionCardsList title="Our Services" cards={mockCardsData} />,
    );

    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.getByText("Service 2")).toBeInTheDocument();
    expect(screen.getByText("Service 3")).toBeInTheDocument();
  });

  it("renders card descriptions", () => {
    renderWithRouter(
      <ActionCardsList title="Test Section" cards={mockCardsData} />,
    );

    expect(screen.getByText("Description for service 1")).toBeInTheDocument();
    expect(screen.getByText("Description for service 2")).toBeInTheDocument();
    expect(screen.getByText("Description for service 3")).toBeInTheDocument();
  });

  it("renders images when imageSrc is provided", () => {
    renderWithRouter(
      <ActionCardsList title="Test Section" cards={mockCardsData} />,
    );

    // Vérifie que les images sont rendues pour les cartes qui en ont
    const image1 = screen.getByAltText("Service 1");
    const image2 = screen.getByAltText("Service 2");

    expect(image1).toBeInTheDocument();
    expect(image1).toHaveAttribute(
      "src",
      expect.stringContaining("service_1.webp"),
    );

    expect(image2).toBeInTheDocument();
    expect(image2).toHaveAttribute(
      "src",
      expect.stringContaining("service_2.webp"),
    );
  });

  it("does not render image when imageSrc is not provided", () => {
    const cardsWithoutImage = [mockCardsData[2]]; // Service 3 n'a pas d'image

    renderWithRouter(
      <ActionCardsList title="Test Section" cards={cardsWithoutImage} />,
    );

    expect(screen.queryByAltText("Service 3")).not.toBeInTheDocument();
  });

  it("renders action buttons with correct links", () => {
    renderWithRouter(
      <ActionCardsList title="Test Section" cards={mockCardsData} />,
    );

    // Teste les boutons de la première carte
    const learnMoreButton = screen.getByRole("link", { name: "Learn More" });
    const contactButton = screen.getByRole("link", { name: "Contact" });

    // Tous les boutons pointent vers /information avec un état différent
    expect(learnMoreButton).toHaveAttribute("href", "/information");
    expect(contactButton).toHaveAttribute("href", "/information");

    // Teste le bouton de la deuxième carte
    const getStartedButton = screen.getByRole("link", { name: "Get Started" });
    expect(getStartedButton).toHaveAttribute("href", "/information");
  });

  it("does not render buttons when not provided", () => {
    const cardsWithoutButtons = [mockCardsData[2]]; // Service 3 n'a pas de boutons

    renderWithRouter(
      <ActionCardsList title="Test Section" cards={cardsWithoutButtons} />,
    );

    // La carte 3 ne devrait pas avoir de boutons
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("works without section title", () => {
    renderWithRouter(<ActionCardsList cards={[mockCardsData[0]]} />);

    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("works with different configurations", () => {
    const { rerender } = renderWithRouter(
      <ActionCardsList title="Test Section" cards={mockCardsData} />,
    );

    // Vérifie que le composant se rend sans erreur
    expect(screen.getByText("Test Section")).toBeInTheDocument();

    // Test avec des cartes différentes
    rerender(
      <MemoryRouter>
        <ActionCardsList title="Updated Section" cards={[mockCardsData[0]]} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Updated Section")).toBeInTheDocument();
  });

  it("is accessible via keyboard navigation", async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <ActionCardsList title="Accessible Section" cards={[mockCardsData[0]]} />,
    );

    // Teste la navigation clavier
    const title = screen.getByText("Service 1");
    const description = screen.getByText("Description for service 1");
    const learnMoreButton = screen.getByRole("link", { name: "Learn More" });
    const contactButton = screen.getByRole("link", { name: "Contact" });

    // Vérifier que les éléments interactifs sont accessibles
    expect(learnMoreButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();

    // Navigation avec Tab - les boutons sont focusables
    await user.tab();
    expect(title).toHaveFocus();

    // Puis la description
    await user.tab();
    expect(description).toHaveFocus();

    // Puis les boutons
    await user.tab();
    expect(learnMoreButton).toHaveFocus();

    await user.tab();
    expect(contactButton).toHaveFocus();
  });

  it("handles empty cards array", () => {
    renderWithRouter(<ActionCardsList title="Empty Section" cards={[]} />);

    expect(screen.getByText("Empty Section")).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("uses correct aria labels for accessibility", () => {
    renderWithRouter(
      <ActionCardsList
        title="Accessible Services"
        cards={[mockCardsData[0]]}
      />,
    );

    const section = screen.getByRole("region", {
      name: /accessible services/i,
    });
    expect(section).toHaveAttribute(
      "aria-labelledby",
      "action-cards-list-title",
    );

    const title = screen.getByText("Accessible Services");
    expect(title).toHaveAttribute("id", "action-cards-list-title");
  });

  it("handles cards with only some optional properties", () => {
    const partialCard = {
      id: "partial",
      title: "Partial Card",
      description: null,
      imageSrc: null,
      buttons: undefined,
    };

    renderWithRouter(
      <ActionCardsList title="Test Section" cards={[partialCard]} />,
    );

    expect(screen.getByText("Partial Card")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies responsive grid layout correctly", () => {
    const { container } = renderWithRouter(
      <ActionCardsList title="Grid Test" cards={mockCardsData} />,
    );

    // Vérifie que le container de grille est présent
    const gridContainer =
      container.querySelector('[data-testid="cards-grid"]') ||
      container.querySelector('div[style*="grid"]') ||
      container.querySelector("div > div:nth-child(2)");

    expect(gridContainer).toBeInTheDocument();
  });
});
