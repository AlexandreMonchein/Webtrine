export const getLogoDimensions = (shape) => {
  switch (shape) {
    case "vertical":
      return { width: 48, height: 96 }; // Tall logo
    case "horizontal":
      return { width: 96, height: 48 }; // Wider logo
    case "square":
      return { width: 64, height: 64 }; // Square logo
    case "large-square":
      return { width: 96, height: 96 }; // Square logo
    default:
      return { width: 64, height: 64 }; // Default
  }
};
