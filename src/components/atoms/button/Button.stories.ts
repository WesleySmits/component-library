import Button from "./Button.vue";
import type { Meta, StoryFn } from "@storybook/vue3";

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
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => ({
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
  href: "/",
  variant: "primary",
};

export const ExternalLink = Template.bind({});
Link.args = {
  label: "Button as Link",
  href: "https://example.com",
  variant: "primary",
};
