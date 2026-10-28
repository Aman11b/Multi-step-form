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
      className={`personal-info-input ${hasError ? "personal-info-input-error" : ""} ${className}`}
      {...props}
    />
  );
}
