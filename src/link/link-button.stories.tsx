import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SIZE } from "baseui/button";
import React from "react";
import { PlusCircle } from "react-feather";
import { MemoryRouter } from "react-router";
import { ButtonAppearance, ButtonRadius } from "../button/button";
import LinkButton from "./link-button";

export default {
  title: "Atoms/LinkButton",
  component: LinkButton,
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
        ButtonAppearance.tertiary,
      ],
      control: { type: "radio" },
    },
    radius: {
      options: [ButtonRadius.round, ButtonRadius.square],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = (args) => (
  <MemoryRouter>
    <LinkButton {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  children: "Button",
  disabled: false,
  isLoading: true,
  to: "#",
};

export const Icon = Template.bind({});
Icon.args = {
  children: "Button",
  icon: <PlusCircle />,
  disabled: false,
  isLoading: false,
  to: "#",
};
