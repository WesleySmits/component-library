import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/700.css";

import "../styles/global.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  a11y: {
    element: "#root",
    config: {},
    options: {},
  },
  docs: {
    // Enable web components support in Storybook Docs
    source: { type: "code" },
    extractComponentDescription: (component, { notes }) => {
      // Show a description for web components
      if (typeof component === "string" && component.startsWith("ws-")) {
        return `Native web component: <${component}>`;
      }
      return notes;
    },
  },
};
