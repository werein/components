import { lightThemePrimitives } from "baseui";

export const primitives = {
  ...lightThemePrimitives,
  accent: "rgb(48, 123, 247)",
  primary: "rgb(34, 29, 39)",
  primaryA: "rgb(55, 51, 58)",
  primaryB: "rgb(237, 236, 240)",
  negative: "#f18c8e",
  warning: "#f5ab35",
  positive: "#1dbc60",
  primaryFontFamily: '"Montserrat", sans-serif',
};

export const overrides = {
  colors: {
    buttonSecondaryFill: primitives.primaryB,
    buttonTertiaryFill: primitives.accent,
    buttonTertiaryText: primitives.primaryB,
    buttonTertiaryHover: "rgb(33, 88, 158)",
  },
  borders: {
    useRoundedCorners: true,
    buttonBorderRadius: "5rem",
  },
};
