import type { Meta, StoryObj } from "@storybook/react";

import CallToAction from "./callToAction.component";

const meta: Meta<typeof CallToAction> = {
  title: "Design System/Buttons/CallToAction",
  component: CallToAction,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CallToAction>;

// Args par défaut
const defaultArgs = {
  text: "Découvrir nos services",
  variant: "primary" as const,
  size: "medium" as const,
  shape: "pill" as const,
  onClick: () => alert("Bouton cliqué !"),
};

// Icône SVG exemple
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

/**
 * Vue d'ensemble de tous les cas d'usage du bouton CallToAction
 */
export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <h3 style={{ marginBottom: "20px" }}>Variantes de style</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <CallToAction
            {...defaultArgs}
            variant="primary"
            text="Bouton primaire"
          />
          <CallToAction
            {...defaultArgs}
            variant="secondary"
            text="Bouton secondaire"
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "20px" }}>Tailles</h3>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <CallToAction {...defaultArgs} size="small" text="Petit bouton" />
          <CallToAction {...defaultArgs} size="medium" text="Bouton moyen" />
          <CallToAction {...defaultArgs} size="large" text="Grand bouton" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "20px" }}>Avec icônes</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <CallToAction
            {...defaultArgs}
            text="Continuer"
            icon={<ArrowIcon />}
          />
          <CallToAction
            {...defaultArgs}
            text="Ajouter aux favoris"
            icon={<HeartIcon />}
            variant="secondary"
          />
          <CallToAction
            {...defaultArgs}
            text="Télécharger"
            icon={<DownloadIcon />}
            size="large"
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "20px" }}>Comme lien</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <CallToAction
            text="Voir la page d'accueil"
            href="/"
            icon={<ArrowIcon />}
          />
          <CallToAction
            text="Nous contacter"
            href="/contact"
            variant="secondary"
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "20px" }}>Sans icône</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <CallToAction text="Bouton simple" onClick={defaultArgs.onClick} />
          <CallToAction
            text="Bouton secondaire"
            variant="secondary"
            onClick={defaultArgs.onClick}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "20px" }}>Formes</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <CallToAction {...defaultArgs} text="Forme pill" shape="pill" />
          <CallToAction {...defaultArgs} text="Forme rounded" shape="rounded" />
          <CallToAction
            {...defaultArgs}
            text="Rounded avec icône"
            shape="rounded"
            icon={<ArrowIcon />}
            variant="secondary"
          />
        </div>
      </div>
    </div>
  ),
};
