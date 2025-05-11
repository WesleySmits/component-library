import Button from "./Button.vue";
import "./BaseButton.vue";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    label: { control: "text" },
    href: { control: "text" },
    variant: { control: { type: "select", options: ["primary", "secondary"] } },
    accessibleLabel: { control: "text" },
    disabled: { control: "boolean" },
  },
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  label: "Primary Button",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary Button",
  variant: "secondary",
};

export const Link = Template.bind({});
Link.args = {
  label: "Button as Link",
  href: "https://example.com",
  variant: "primary",
};
