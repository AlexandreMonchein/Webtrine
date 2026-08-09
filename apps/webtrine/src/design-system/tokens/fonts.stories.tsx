import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import styles from "./tokens.stories.module.css";

// Font Overview Component
const FontOverview = () => {
  const fontFamilies = [
    {
      name: "SK Modernist Mono",
      family: "'SK Modernist Mono', monospace",
      description: "Primary monospace font for APT.235",
      weights: [{ label: "Regular (400)", weight: 400, style: "normal" }],
    },
    {
      name: "IBM Plex Mono",
      family: "'IBM Plex Mono', monospace",
      description: "Code and monospace text",
      weights: [
        { label: "Thin (100)", weight: 100, style: "normal" },
        { label: "Thin Italic (100)", weight: 100, style: "italic" },
        { label: "ExtraLight (200)", weight: 200, style: "normal" },
        { label: "ExtraLight Italic (200)", weight: 200, style: "italic" },
        { label: "Light (300)", weight: 300, style: "normal" },
        { label: "Light Italic (300)", weight: 300, style: "italic" },
        { label: "Regular (400)", weight: 400, style: "normal" },
        { label: "Italic (400)", weight: 400, style: "italic" },
        { label: "Medium (500)", weight: 500, style: "normal" },
        { label: "Medium Italic (500)", weight: 500, style: "italic" },
        { label: "SemiBold (600)", weight: 600, style: "normal" },
        { label: "SemiBold Italic (600)", weight: 600, style: "italic" },
        { label: "Bold (700)", weight: 700, style: "normal" },
        { label: "Bold Italic (700)", weight: 700, style: "italic" },
      ],
    },
    {
      name: "Luciole",
      family: "Luciole, Arial, sans-serif",
      description: "Accessible font for visually impaired users (default)",
      weights: [
        { label: "Regular (400)", weight: 400, style: "normal" },
        { label: "Regular Italic (400)", weight: 400, style: "italic" },
        { label: "Bold (700)", weight: 700, style: "normal" },
        { label: "Bold Italic (700)", weight: 700, style: "italic" },
      ],
    },
  ];

  const sampleText = "The quick brown fox jumps over the lazy dog. 0123456789";
  const pangram =
    "Portez ce vieux whisky au juge blond qui fume sur son île intérieure, à côté de l'alcôve ovoïde, où les bûches se consument dans l'âtre. 0123456789";

  return (
    <div className={styles.fontContainer}>
      <h1 className={styles.fontTitle}>Font System Overview</h1>

      {fontFamilies.map((font) => (
        <div key={font.name} className={styles.fontSection}>
          <div className={styles.fontFamily}>
            <h2 className={styles.fontFamilyName}>{font.name}</h2>
            <div className={styles.fontFamilyInfo}>
              font-family: {font.family}
            </div>
            <p style={{ color: "#666", marginBottom: "24px" }}>
              {font.description}
            </p>

            {/* Sample Text */}
            <div className={styles.fontSampleGrid}>
              <div className={styles.fontSample}>
                <div className={styles.fontSampleLabel}>English Sample</div>
                <div
                  className={styles.fontSampleText}
                  style={{
                    fontFamily: font.family,
                    fontSize: "18px",
                  }}
                >
                  {sampleText}
                </div>
              </div>

              <div className={styles.fontSample}>
                <div className={styles.fontSampleLabel}>French Pangram</div>
                <div
                  className={styles.fontSampleText}
                  style={{
                    fontFamily: font.family,
                    fontSize: "16px",
                  }}
                >
                  {pangram}
                </div>
              </div>
            </div>

            {/* Font Weights */}
            <div style={{ marginTop: "24px" }}>
              <h3 className={styles.fontSectionTitle}>Available Weights</h3>
              {font.weights.map((weight) => (
                <div
                  key={`${weight.weight}-${weight.style}`}
                  className={styles.weightRow}
                >
                  <div className={styles.weightLabel}>{weight.label}</div>
                  <div
                    className={styles.weightSample}
                    style={{
                      fontFamily: font.family,
                      fontWeight: weight.weight,
                      fontStyle: weight.style,
                    }}
                  >
                    {sampleText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Font Playground Component
const FontPlayground = () => {
  const [fontFamily, setFontFamily] = useState(
    "'SK Modernist Mono', monospace",
  );
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(400);
  const [fontStyle, setFontStyle] = useState("normal");
  const [lineHeight, setLineHeight] = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog. Portez ce vieux whisky au juge blond qui fume. 0123456789",
  );

  const fontFamilies = [
    { label: "SK Modernist Mono", value: "'SK Modernist Mono', monospace" },
    { label: "IBM Plex Mono", value: "'IBM Plex Mono', monospace" },
    { label: "Luciole", value: "Luciole, Arial, sans-serif" },
  ];

  const fontWeights = [
    { label: "Thin (100)", value: 100 },
    { label: "ExtraLight (200)", value: 200 },
    { label: "Light (300)", value: 300 },
    { label: "Regular (400)", value: 400 },
    { label: "Medium (500)", value: 500 },
    { label: "SemiBold (600)", value: 600 },
    { label: "Bold (700)", value: 700 },
  ];

  return (
    <div className={styles.playgroundContainer}>
      <h1 className={styles.fontTitle}>Font Playground</h1>

      {/* Preview */}
      <div className={styles.playgroundPreview}>
        <div
          className={styles.playgroundText}
          style={{
            fontFamily,
            fontSize: `${fontSize}px`,
            fontWeight,
            fontStyle,
            lineHeight,
            letterSpacing: `${letterSpacing}px`,
          }}
        >
          {text}
        </div>
      </div>

      {/* Controls */}
      <div className={styles.playgroundControls}>
        <h2 className={styles.playgroundControlsTitle}>Controls</h2>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="text-input">
            Text Content
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
              fontFamily: "monospace",
            }}
          />
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="font-family">
            Font Family
          </label>
          <select
            id="font-family"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
            }}
          >
            {fontFamilies.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="font-size">
            Font Size: {fontSize}px
          </label>
          <input
            id="font-size"
            type="range"
            min="12"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="font-weight">
            Font Weight
          </label>
          <select
            id="font-weight"
            value={fontWeight}
            onChange={(e) => setFontWeight(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
            }}
          >
            {fontWeights.map((weight) => (
              <option key={weight.value} value={weight.value}>
                {weight.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="font-style">
            Font Style
          </label>
          <select
            id="font-style"
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
            }}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="line-height">
            Line Height: {lineHeight.toFixed(1)}
          </label>
          <input
            id="line-height"
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel} htmlFor="letter-spacing">
            Letter Spacing: {letterSpacing}px
          </label>
          <input
            id="letter-spacing"
            type="range"
            min="-2"
            max="10"
            step="0.5"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

// Storybook Meta
const meta = {
  title: "Design System/Tokens/Fonts",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const Overview: Story = {
  render: () => <FontOverview />,
  parameters: {
    docs: {
      description: {
        story:
          "Complete overview of all available font families with their weights, styles, and character sets. This includes SK Modernist Mono (primary for APT.235), IBM Plex Mono, and Luciole (accessible font).",
      },
    },
  },
};

export const Playground: Story = {
  render: () => <FontPlayground />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test and preview different font families, sizes, weights, and styles. Adjust all typography properties in real-time and see how they affect the text rendering.",
      },
    },
  },
};
