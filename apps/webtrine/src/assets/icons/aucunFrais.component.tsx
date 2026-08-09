const AucunFrais = ({ size = 24, color = "#8c481b" }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 122.88 122.88"
  >
    {/* Was white in the original SVG */}
    <path
      fillOpacity={0}
      fill={color}
      d="M61.44 12.1A49.34 49.34 0 1 1 12.1 61.44 49.34 49.34 0 0 1 61.44 12.1z"
    />

    {/* Original path had no class; keep same color */}
    <path
      fill={color}
      d="M81.76 28.87 79.05 41.78q-3.94-4-11.49-4a15.42 15.42 0 0 0-12.25 5.43l-.16.2-9-9Q54.74 26 68.24 26a30.1 30.1 0 0 1 13.52 2.85zm-19.13 22H77.1l-1.52 7.21H69.84L62.63 50.9zm-9.94 7.21h-2c0 .72 0 1.62 0 2.73s0 2.18.1 3.35h8.06L66 71.41H51.66a18.35 18.35 0 0 0 3.56 7.8A15.09 15.09 0 0 0 67.28 84.7a20.74 20.74 0 0 0 9.8-2.2l4.39 4.39v6.56a31 31 0 0 1-14 3q-13.5 0-22.21-9.3A31.42 31.42 0 0 1 37.4 71.41H30.48L32 64.19h4.51c0-.74 0-1.52 0-2.34 0-1.43 0-2.66.1-3.74H30.48L32 50.9h5.49a36.1 36.1 0 0 1 1.84-6.15L52.69 58.11z"
    />

    {/* Was red in the original SVG; mapped to `color` */}
    <path
      fill={color}
      d="M61.44 122.88A61.31 61.31 0 1 0 38 118.22a61.29 61.29 0 0 0 23.49 4.66zm40.24-32.88L32.93 21.2a49.44 49.44 0 0 1 47.38-5.34A49.53 49.53 0 0 1 107 42.58a49 49 0 0 1 3.73 18.86h0A48.93 48.93 0 0 1 101.68 90zM24 29.38 93.5 98.92A49.32 49.32 0 0 1 24 29.38z"
    />
  </svg>
);

export default AucunFrais;
