export function getColorHexByName(colorName: string): string {
    const colors: { [key: string]: string } = {
      red: "#FF0000",
      green: "#008000",
      blue: "#0000FF",
      black: "#000000",
      white: "#FFFFFF",
      yellow: "#FFFF00",
      purple: "#800080",
      orange: "#FFA500",
      pink: "#FFC0CB",
      brown: "#A52A2A",
      gray: "#808080",
      // Extended list of color names
      cyan: "#00FFFF",
      magenta: "#FF00FF",
      lime: "#00FF00",
      maroon: "#800000",
      navy: "#000080",
      olive: "#808000",
      teal: "#008080",
      violet: "#EE82EE",
      gold: "#FFD700",
      silver: "#C0C0C0",
      coral: "#FF7F50",
      salmon: "#FA8072",
      khaki: "#F0E68C",
      indigo: "#4B0082",
      azure: "#F0FFFF",
      ivory: "#FFFFF0",
      lavender: "#E6E6FA",
      // Add more colors as needed
    };
  
    return colors[colorName.toLowerCase()] || "#000000"; // Default to black if not found
  }
  