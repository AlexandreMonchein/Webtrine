const Tiktok = ({ size = 24, color = "white" }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 447 512.57"
  >
    <path
      fill={color}
      fillRule="nonzero"
      d="M380.23 102.74c-27.61-18-47.53-46.81-53.75-80.38-1.34-7.25-2.09-14.72-2.09-22.36h-88.12l-.14 353.16c-1.48 39.55-34.03 71.29-73.93 71.29-12.4 0-24.08-3.1-34.36-8.51-23.58-12.41-39.72-37.12-39.72-65.56 0-40.85 33.24-74.08 74.07-74.08 7.63 0 14.94 1.26 21.86 3.42v-89.96c-7.16-.98-14.44-1.58-21.86-1.58C72.76 188.18 0 260.93 0 350.38c0 54.87 27.41 103.43 69.25 132.8 26.34 18.5 58.39 29.39 92.95 29.39 89.44 0 162.2-72.76 162.2-162.19l-.01-179.09c34.56 24.81 76.92 39.42 122.61 39.42v-88.12c-24.61 0-47.53-7.31-66.77-19.85z"
    />
  </svg>
);

export default Tiktok;
