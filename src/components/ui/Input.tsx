import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export default function Input({
  hasError = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
    className={`form-input ${hasError ? "form-input-error" : ""} ${className}`}
      {...props}
    />
  );
}
