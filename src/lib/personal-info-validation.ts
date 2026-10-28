import type {
  PersonalInfoData,
  PersonalInfoError,
} from "../types/personal-info";

export function validatePersonalInfo(
  formData: PersonalInfoData,
): PersonalInfoError {
  const errors: PersonalInfoError = {};
  if (!formData.name.trim()) {
    errors.name = "This field is required";
  }

  if (!formData.email.trim()) {
    errors.email = "This field is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!formData.phone.trim()) {
    errors.phone = "This field is required";
  }

  return errors;
}
