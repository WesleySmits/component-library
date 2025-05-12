import CtaBlock from "./CtaBlock.vue";

export default {
  title: "Blocks/CtaBlock",
  component: CtaBlock,
  argTypes: {
    image: { control: "text" },
    heading: { control: "text" },
    text: { control: "text" },
    buttonLabel: { control: "text" },
    buttonUrl: { control: "text" },
  },
};

const Template = (args) => ({
  components: { CtaBlock },
  setup() {
    return { args };
  },
  template: '<CtaBlock v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  image: "https://via.placeholder.com/200",
  heading: "Join Us Today!",
  text: "Sign up now to get exclusive access.",
  buttonLabel: "Get Started",
  buttonUrl: "https://example.com",
};
