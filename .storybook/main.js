module.exports = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx|vue)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  typescript: {
    check: true,
    reactDocgen: false,
  },
};
