export const getLogoDimensions = (shape) => {
  switch (shape) {
    case "vertical":
      return { width: 48, height: 96 }; // Vertical logo
    case "horizontal":
      return { width: 96, height: 48 }; // Horizontal logo
    case "horizontal-wide":
      return { width: 128, height: 48 }; // Wider logo
    case "square":
      return { width: 64, height: 64 }; // Square logo
    case "large-square":
      return { width: 96, height: 96 }; // Square logo
    case "xlarge-square":
      return { width: 128, height: 128 }; // Square logo
    case "auto":
      return { width: "auto", height: 48 }; // Auto

    default:
      return { width: "auto", height: "auto" }; // Default
  }
};
