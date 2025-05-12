// Button variant enum for type safety and maintainability
export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Danger = "danger",
}

export interface ButtonProps {
  label?: string;
  href?: string;
  accessibleLabel?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  classes?: string | string[] | Record<string, boolean>;
  icon?: string | boolean;
  iconPosition?: "left" | "right";
}

export interface BaseButtonProps extends ButtonProps {
  type?: "button" | "submit" | "reset";
}
