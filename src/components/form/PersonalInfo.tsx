"use client";

import { validatePersonalInfo } from "@/lib/personal-info-validation";
import { FIRST_STEP } from "@/lib/steps";
import { PersonalInfoData, PersonalInfoError } from "@/types/personal-info";
import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";
import FormField from "../ui/FormField";
import StepForm from "./StepForm";

type PersonalInfoProps={
  initialValues?:PersonalInfoData
  onSubmit?:(data:PersonalInfoData)=>void
}

export default function PersonalInfo({
  initialValues={name:"",email:"",phone:""},
  onSubmit
}:PersonalInfoProps) {

  const [formData,setFormData]=useState<PersonalInfoData>(initialValues)
  const [error, setError] = useState<PersonalInfoError>({});

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validatePersonalInfo(formData);
    setError(validationError);

    if(Object.keys(validationError).length===0){
      onSubmit?.({
        name:formData.name.trim(),
        email:formData.email.trim(),
        phone:formData.phone.trim()
      })
    }
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const fieldName = name as keyof PersonalInfoData;
    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));
    setError((current) => {
      const updatedError = { ...current };
      delete updatedError[fieldName];
      return updatedError;
    });
  }
  return (
    <StepForm step={FIRST_STEP} onSubmit={handleSubmit}>
      <div className="space-y-5">
        <FormField
          label="Name"
          error={error.name}
          inputProps={{
            id: "name",
            name: "name",
            type: "text",
            placeholder: "e.g Stephen King",
            value: formData.name,
            onChange: handleChange,
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
            onChange: handleChange,
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
            onChange: handleChange,
          }}
        />
      </div>
    </StepForm>

  );
}
