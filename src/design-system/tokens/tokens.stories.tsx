import type { Meta, StoryObj } from "@storybook/react";

import styles from "./tokens.stories.module.css";

interface ColorSwatchProps {
  name: string;
  variable: string;
  description?: string;
}

const ColorSwatch = ({ name, variable, description }: ColorSwatchProps) => {
  return (
    <div className={styles.colorSwatch}>
      <div
        className={styles.colorBox}
        style={{
          backgroundColor: `var(${variable})`,
        }}
      />
      <div>
        <div className={styles.colorName}>{name}</div>
        <div className={styles.colorVariable}>{variable}</div>
        {description && (
          <div className={styles.colorDescription}>{description}</div>
        )}
      </div>
    </div>
  );
};

const ColorPalette = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Color System</h1>

      {/* Brand Palette */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Brand Palette</h2>
        <div className={styles.colorGrid}>
          <ColorSwatch name="Primary" variable="--theme-color-primary" />
          <ColorSwatch name="Secondary" variable="--theme-color-secondary" />
          <ColorSwatch name="Tertiary" variable="--theme-color-tertiary" />
          <ColorSwatch name="Quaternary" variable="--theme-color-quaternary" />
          <ColorSwatch name="Quinary" variable="--theme-color-quinary" />
        </div>
      </section>

      {/* Utility Colors */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Utility Colors</h2>
        <div className={styles.colorGrid}>
          <ColorSwatch
            name="Utility 1"
            variable="--theme-color-utility-1"
            description="Red - Error, danger"
          />
          <ColorSwatch
            name="Utility 2"
            variable="--theme-color-utility-2"
            description="Green - Success, valid"
          />
          <ColorSwatch
            name="Utility 3"
            variable="--theme-color-utility-3"
            description="Orange - Warning, alert"
          />
          <ColorSwatch
            name="Utility 4"
            variable="--theme-color-utility-4"
            description="Blue - Info, link"
          />
        </div>
      </section>

      {/* Extended Palette */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Extended Palette</h2>
        <div className={styles.colorGrid}>
          <ColorSwatch
            name="Hover"
            variable="--theme-color-hover"
            description="Hover state"
          />
          <ColorSwatch
            name="Background 1"
            variable="--theme-color-background-1"
            description="Background color 1"
          />
          <ColorSwatch
            name="Background 2"
            variable="--theme-color-background-2"
            description="Background color 2"
          />
        </div>
      </section>

      {/* Typography Sizes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography</h2>
        <div className={styles.typographyList}>
          <div className={styles.typographyItem}>
            <div style={{ fontSize: "var(--navbar-font-size)" }}>
              Navbar Font Size
            </div>
            <code className={styles.typographyCode}>--navbar-font-size</code>
          </div>
          <div className={styles.typographyItem}>
            <div style={{ fontSize: "var(--subtitle-font-size)" }}>
              Subtitle Font Size
            </div>
            <code className={styles.typographyCode}>--subtitle-font-size</code>
          </div>
          <div className={styles.typographyItem}>
            <div style={{ fontSize: "var(--text-font-size)" }}>
              Text Font Size
            </div>
            <code className={styles.typographyCode}>--text-font-size</code>
          </div>
          <div className={styles.typographyItem}>
            <div style={{ fontSize: "var(--description-font-size)" }}>
              Description Font Size
            </div>
            <code className={styles.typographyCode}>
              --description-font-size
            </code>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta = {
  title: "Design System/Tokens",
  component: ColorPalette,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTokens: Story = {};
