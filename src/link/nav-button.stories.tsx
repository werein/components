import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SIZE } from "baseui/button";
import React from "react";
import { MemoryRouter } from "react-router";
import { ButtonAppearance, ButtonRadius } from "../button/button";
import NavButton from "./nav-button";

export default {
  title: "Atoms/NavButton",
  component: NavButton,
  argTypes: {
    size: {
      options: [SIZE.compact, SIZE.default, SIZE.large, SIZE.mini],
      control: { type: "radio" },
    },
    appearance: {
      options: [
        ButtonAppearance.minimal,
        ButtonAppearance.outline,
        ButtonAppearance.primary,
        ButtonAppearance.secondary,
      ],
      control: { type: "radio" },
    },
    radius: {
      options: [ButtonRadius.round, ButtonRadius.square],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof NavButton>;

const Template: ComponentStory<typeof NavButton> = (args) => (
  <MemoryRouter>
    <NavButton {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  children: "Button",
  isLoading: false,
  to: "#",
};
