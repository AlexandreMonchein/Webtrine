import { ToggleThemeButton } from "./modeTheme.styled";

export const ToggleThemeMode = ({ toggleTheme, theme }) => {
  return (
    <ToggleThemeButton onClick={toggleTheme}>
      <svg
        width="30"
        height="30"
        id="light-icon"
        display={theme === "dark" ? "block" : "none"}
      >
        <circle cx="15" cy="15" r="6" fill="currentColor" />
        <line
          id="ray"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          x1="15"
          y1="1"
          x2="15"
          y2="4"
        />
        <use href="#ray" transform="rotate(45 15 15)" />
        <use href="#ray" transform="rotate(90 15 15)" />
        <use href="#ray" transform="rotate(135 15 15)" />
        <use href="#ray" transform="rotate(180 15 15)" />
        <use href="#ray" transform="rotate(225 15 15)" />
        <use href="#ray" transform="rotate(270 15 15)" />
        <use href="#ray" transform="rotate(315 15 15)" />
      </svg>
      <svg
        width="30"
        height="30"
        id="dark-icon"
        display={theme === "light" ? "block" : "none"}
      >
        <path
          fill="currentColor"
          d="
          M 23, 5
          A 12 12 0 1 0 23, 25
          A 12 12 0 0 1 23, 5"
        />
      </svg>
    </ToggleThemeButton>
  );
};
