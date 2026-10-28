import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-blue-950 text-white hover:opacity-90",
    secondary:
      "border border-purple-200 bg-white text-blue-950 hover:bg-blue-50",
  };

  return (
    <button
      type={type}
      className={`rounded-md px-5 py-3 cursor-pointer text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    ></button>
  );
}
