import { InputHTMLAttributes } from "react";
import Input from "./Input";

type FormFieldProps = {
  label: string;
  error?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

export default function FormField({
  label,
  error,
  inputProps,
}: FormFieldProps) {
  const { id } = inputProps;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-2 font-bold">
        <label htmlFor={id} className="block font-medium text-blue-950 text-sm">
          {label}
        </label>
        {error && (
          <p id={`${id}-error`} className="text-red-500 text-sm">
            {error}
          </p>
        )}
      </div>
      <Input
        {...inputProps}
        hasError={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </div>
  );
}
