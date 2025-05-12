import Button from "./Button.vue";
import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import { ButtonVariant } from "./Button.type";

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
  variant: ButtonVariant.Primary,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary Button",
  variant: ButtonVariant.Secondary,
};

export const Link = Template.bind({});
Link.args = {
  label: "Button as Link",
  href: "/",
  variant: ButtonVariant.Primary,
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  label: "Button as Link",
  href: "https://example.com",
  variant: ButtonVariant.Primary,
};
