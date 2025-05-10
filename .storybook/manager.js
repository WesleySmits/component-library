import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

const getStoredTheme = () => localStorage.getItem('sb-theme');
const setStoredTheme = (theme) => localStorage.setItem('sb-theme', theme);

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = getStoredTheme() || (prefersDark ? 'dark' : 'light');

addons.setConfig({
  theme: initialTheme === 'dark' ? themes.dark : themes.light,
  toolbar: {
    theme: {
      title: 'Theme',
      icon: initialTheme === 'dark' ? 'circlehollow' : 'circle',
      items: [
        { value: 'light', title: 'Light', icon: 'circle' },
        { value: 'dark', title: 'Dark', icon: 'circlehollow' },
      ],
      dynamicTitle: true,
      onClick: (value) => {
        setStoredTheme(value);
        window.location.reload();
      },
    },
  },
});
