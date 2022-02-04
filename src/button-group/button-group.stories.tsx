import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SIZE } from "baseui/button";
import React from "react";
import { ButtonAppearance, ButtonRadius } from "../button/button";
import ButtonGroup from "./button-group";

export default {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
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
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args) => (
  <ButtonGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  buttons: [{ children: "Button" }, { children: "Button 2" }],
};

export const Square = Template.bind({});
Square.args = {
  radius: ButtonRadius.square,
  buttons: [{ children: "Button" }, { children: "Button 2" }],
};

export const Round = Template.bind({});
Round.args = {
  radius: ButtonRadius.round,
  buttons: [{ children: "Button" }, { children: "Button 2" }],
};

export const Single = Template.bind({});
Single.args = {
  buttons: [{ children: "Button" }],
};

export const Long = Template.bind({});
Long.args = {
  buttons: [
    { children: "Button" },
    { children: "Button 2" },
    { children: "Button 3" },
  ],
};
