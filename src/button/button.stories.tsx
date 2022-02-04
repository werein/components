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
        ButtonAppearance.tertiary,
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
  isLoading: false,
};

export const Icon = Template.bind({});
Icon.args = {
  children: "Button",
  icon: <PlusCircle />,
  disabled: false,
  isLoading: false,
};

export const StartEnhancer = Template.bind({});
StartEnhancer.args = {
  children: "Button",
  startEnhancer: <PlusCircle />,
  disabled: false,
  isLoading: false,
};

export const EndEnhancer = Template.bind({});
EndEnhancer.args = {
  children: "Button",
  endEnhancer: <PlusCircle />,
  disabled: false,
  isLoading: false,
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  children: "Button",
  icon: <PlusCircle />,
  disabled: false,
  isLoading: false,
  style: { width: "250px" },
};

export const CustomWidthStartEnhancer = Template.bind({});
CustomWidthStartEnhancer.args = {
  children: "Button",
  startEnhancer: <PlusCircle />,
  disabled: false,
  isLoading: false,
  style: { width: "250px" },
};
