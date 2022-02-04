import { mergeDeepRight } from "ramda";
import { campervanTheme, lightTheme } from "../src/themes";

export const LightTheme = {
  name: "Light Theme",
  primitives: lightTheme.primites,
};

export const LightThemeOverrides = {
  name: "Light Theme (Reset)",
  overrides: lightTheme.overrides,
};

export const CampervanTheme = {
  name: "Campervan Theme",
  primitives: campervanTheme.primitives,
  overrides: campervanTheme.overrides,
};

export const CampervanThemeOverrides = {
  name: "Campervan Theme (Reset)",
  overrides: mergeDeepRight(lightTheme.overrides, campervanTheme.overrides),
};
