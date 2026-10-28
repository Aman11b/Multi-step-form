"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import { PersonalInfoData, PersonalInfoError } from "@/types/personal-info";
import { validatePersonalInfo } from "@/lib/personal-info-validation";

export default function PersonalInfo() {
  const [formData, setFormData] = useState<PersonalInfoData>({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState<PersonalInfoError>({});

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validatePersonalInfo(formData);
    setError(validationError);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold text-blue-950 text-2xl md:text-3xl">
        Personal info
      </h1>
      <p className="mt-3 text-gray-500 text-base leading-6">
        Please provide your name, email address, and phone number.
      </p>

      <div className="space-y-5 mt-6">
        <FormField
          label="Name"
          error={error.name}
          inputProps={{
            id: "name",
            name: "name",
            type: "text",
            placeholder: "e.g Stephen King",
            value: formData.name,
            onChange: (event) =>
              setFormData((current) => ({
                ...current,
                name: event.target.value,
              })),
          }}
        />
        <FormField
          label="Email Address"
          error={error.email}
          inputProps={{
            type: "email",
            id: "email",
            name: "email",
            placeholder: "e.g StephanKing@lorem.com",
            value: formData.email,
            onChange: (event) =>
              setFormData((current) => ({
                ...current,
                email: event.target.value,
              })),
          }}
        />
        <FormField
          label="Phone Number"
          error={error.phone}
          inputProps={{
            type: "tel",
            id: "phone",
            name: "phone",
            placeholder: "e.g +1 234 567 890",
            value: formData.phone,
            onChange: (event) =>
              setFormData((current) => ({
                ...current,
                phone: event.target.value,
              })),
          }}
        />
        {/* Mentor takeaway: ...props forwards every remaining prop, including children. Explicitly rendering {children} is generally clearer when building reusable UI components. */}
        <div className="flex justify-end mt-20">
          <Button type="submit">Next Step</Button>
        </div>
      </div>
    </form>
  );
}
