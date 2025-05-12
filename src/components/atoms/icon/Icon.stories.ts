import Icon from "./Icon.vue";
import type { Meta, StoryFn } from "@storybook/vue3";
import type { IconProps } from "./Icon.type";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    icon: { control: "text" },
    size: { control: "text" },
  },
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args: IconProps) => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: '<Icon v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  icon: "up-right-from-square",
  size: "1x",
};

export const Large = Template.bind({});
Large.args = {
  icon: "check",
  size: "2x",
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  icon: "external",
  size: "lg",
};
