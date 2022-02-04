import { withThemes } from "@react-theming/storybook-addon";
import { BaseProvider, createTheme } from "baseui";
import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import {
  CampervanTheme,
  CampervanThemeOverrides,
  LightTheme,
  LightThemeOverrides,
} from "./themes";

const engine = new Styletron();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

const providerFn = ({ theme, children }) => {
  const baseTheme = createTheme(theme.primitives, theme.overrides || {});
  return <BaseProvider theme={baseTheme}>{children}</BaseProvider>;
};

export const decorators = [
  withThemes(
    null,
    [LightTheme, CampervanTheme, LightThemeOverrides, CampervanThemeOverrides],
    { providerFn }
  ),
  (Story) => (
    <StyletronProvider value={engine} debugAfterHydration>
      <Story />
    </StyletronProvider>
  ),
];
