import { LightThemeMove, lightThemePrimitives } from "baseui";

export const primitives = {
  ...lightThemePrimitives,
};

export const overrides = {
  colors: {},
  borders: {
    useRoundedCorners: true,
    buttonBorderRadius: LightThemeMove.borders.radius300,
    radius500: "5rem",
  },
};
