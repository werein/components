import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SIZE } from "baseui/button";
import React from "react";
import { PlusCircle } from "react-feather";
import Button, { ButtonAppearance, ButtonRadius } from "./button";

export default {
  title: "Atoms/Button",
  component: Button,
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
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button",
  disabled: false,
  isLoading: true,
};

export const Icon = Template.bind({});
Icon.args = {
  children: "Button",
  icon: <PlusCircle />,
  disabled: false,
  isLoading: false,
};
