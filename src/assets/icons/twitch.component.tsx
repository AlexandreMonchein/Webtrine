const Twitch = ({ size = 24, color = "white" }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 439 512.165"
  >
    <g fill={color} fillRule="nonzero">
      <path d="M402.415 237.791l-73.166 73.166h-73.166l-64.021 64.021v-64.021H109.75V36.584h292.665v201.207zM91.458 0L0 91.456v329.251h109.75v91.458l91.458-91.458h73.167L439 256.083V0H91.458z" />
      <path d="M310.958 210.354h36.583v-109.75h-36.583zM210.354 210.354h36.583v-109.75h-36.583z" />
    </g>
  </svg>
);

export default Twitch;
