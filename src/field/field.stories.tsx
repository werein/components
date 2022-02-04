import { ComponentMeta, ComponentStory } from "@storybook/react";
import Field from "./field";

export default {
  title: "Molecules/Field",
  component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  caption: "Caption",
  children: <input></input>,
  inline: false,
};
