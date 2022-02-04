import { ComponentMeta, ComponentStory } from "@storybook/react";
import Checkbox from "./checkbox";

export default {
  title: "Atoms/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: true,
  children: "Select me",
};
