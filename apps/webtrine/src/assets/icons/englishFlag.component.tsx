const EnglishFlag = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 900 600"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="s">
      <path d="M0,0 v600 h900 v-600 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M450,300 h450 v300 z v300 h-450 z h-450 v-300 z v-300 h450 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v600 h900 v-600 z" fill="#012169" />
      <path d="M0,0 L900,600 M900,0 L0,600" stroke="#fff" strokeWidth="120" />
      <path
        d="M0,0 L900,600 M900,0 L0,600"
        clipPath="url(#t)"
        stroke="#C8102E"
        strokeWidth="80"
      />
      <path d="M450,0 v600 M0,300 h900" stroke="#fff" strokeWidth="200" />
      <path d="M450,0 v600 M0,300 h900" stroke="#C8102E" strokeWidth="120" />
    </g>
  </svg>
);
export default EnglishFlag;
