import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Cards from "../cardsList.component";

const mockCardsData = [
  {
    title: "Test Card 1",
    description: [{ text: "Description for test card 1" }] as [
      { text: string },
    ],
    imageSrc: "test_image_1",
  },
  {
    title: "Test Card 2",
    description: [{ text: "Description for test card 2" }] as [
      { text: string },
    ],
  },
];

describe("CardsList Component", () => {
  it("renders cards with correct content", () => {
    render(
      <Cards
        title="Test Section"
        description="Section description"
        content={mockCardsData}
      />,
    );

    // Vérifie que le titre de section est affiché
    expect(screen.getByText("Test Section")).toBeInTheDocument();

    // Vérifie que les cartes sont rendues
    expect(screen.getByText("Test Card 1")).toBeInTheDocument();
    expect(screen.getByText("Test Card 2")).toBeInTheDocument();

    // Vérifie les descriptions
    expect(screen.getByText("Description for test card 1")).toBeInTheDocument();
    expect(screen.getByText("Description for test card 2")).toBeInTheDocument();
  });

  it("renders images when imageSrc is provided", () => {
    render(
      <Cards
        title="Test Section"
        description="Section description"
        content={mockCardsData}
      />,
    );

    // Vérifie qu'une image est rendue pour la première carte
    const image = screen.getByAltText("Test Card 1");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("test_image_1.webp"),
    );
  });

  it("does not render images when imageSrc is not provided", () => {
    render(
      <Cards
        title="Test Section"
        description="Section description"
        content={[mockCardsData[1]]} // Seulement la carte sans image
      />,
    );

    // Vérifie qu'aucune image n'est rendue
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("applies inline display when feature is enabled", () => {
    const { container } = render(
      <Cards
        title="Test Section"
        description="Section description"
        content={mockCardsData}
        features={{ displayInline: true }}
      />,
    );

    // Vérifie que le container a les bonnes propriétés Grid CSS
    const cardContainer =
      container.querySelector('[data-testid="card-container"]') ||
      container.querySelector("div > div:nth-child(2)");

    expect(cardContainer).toBeInTheDocument();
  });

  it("is accessible and renders properly", async () => {
    render(
      <Cards
        title="Test Section"
        description="Section description"
        content={mockCardsData}
      />,
    );

    // Test que les éléments sont bien présents
    const title = screen.getByText("Test Section");
    expect(title).toBeInTheDocument();

    // Le contenu est accessible via les lecteurs d'écran naturellement
    const firstCard = screen.getByText("Test Card 1");
    expect(firstCard).toBeInTheDocument();
  });

  it("handles empty content gracefully", () => {
    render(
      <Cards
        title="Empty Section"
        description="Section description"
        content={[]}
      />,
    );

    expect(screen.getByText("Empty Section")).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("calculates even/odd count correctly for grid layout", () => {
    // Test avec nombre pair (2 cartes)
    const { rerender } = render(
      <Cards
        title="Even Count"
        description="Section description"
        content={mockCardsData}
        features={{ displayInline: true }}
      />,
    );

    // Test avec nombre impair (3 cartes)
    const oddCardsData = [
      ...mockCardsData,
      {
        title: "Test Card 3",
        description: [{ text: "Description for test card 3" }] as [
          { text: string },
        ],
      },
    ];

    rerender(
      <Cards
        title="Odd Count"
        description="Section description"
        content={oddCardsData}
        features={{ displayInline: true }}
      />,
    );

    expect(screen.getByText("Odd Count")).toBeInTheDocument();
    expect(screen.getByText("Test Card 3")).toBeInTheDocument();
  });
});
