export type ButtonVariant = "primary" | "secondary";

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
