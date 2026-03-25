import type { Meta, StoryObj } from "@storybook/react";

import ArrowRightIcon from "../../../assets/icons/arrowRight.component";
import DownloadIcon from "../../../assets/icons/download.component";
import HeartIcon from "../../../assets/icons/heart.component";
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
            icon={<ArrowRightIcon size={24} />}
          />
          <CallToAction
            {...defaultArgs}
            text="Ajouter aux favoris"
            icon={<HeartIcon size={24} />}
            variant="secondary"
          />
          <CallToAction
            {...defaultArgs}
            text="Télécharger"
            icon={<DownloadIcon size={24} />}
            size="large"
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "20px" }}>Position de l'icône</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <CallToAction
            {...defaultArgs}
            text="Icône à gauche"
            icon={<ArrowRightIcon size={24} />}
            iconPosition="left"
          />
          <CallToAction
            {...defaultArgs}
            text="Icône à droite"
            icon={<ArrowRightIcon size={24} />}
            iconPosition="right"
          />
          <CallToAction
            {...defaultArgs}
            text="Par défaut (droite)"
            icon={<HeartIcon size={24} />}
            variant="secondary"
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "20px" }}>Comme lien</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <CallToAction
            text="Voir la page d'accueil"
            href="/"
            icon={<ArrowRightIcon size={24} />}
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
            icon={<ArrowRightIcon size={24} />}
            variant="secondary"
          />
        </div>
      </div>
    </div>
  ),
};
