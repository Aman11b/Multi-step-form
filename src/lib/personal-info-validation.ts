import type {
  PersonalInfoData,
  PersonalInfoError,
} from "../types/personal-info";

const REQUIRED_MESSAGE = "This field is required";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\d{10}$/;

export function validatePersonalInfo(
  formData: PersonalInfoData,
): PersonalInfoError {
  const errors: PersonalInfoError = {};

  if (!formData.name.trim()) {
    errors.name = REQUIRED_MESSAGE;
  }

  if (!formData.email.trim()) {
    errors.email = REQUIRED_MESSAGE
  } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!formData.phone.trim()) {
    errors.phone = "This field is required";
  }else if (!PHONE_PATTERN.test(formData.phone.trim())){
    errors.phone = "Enter a valid 10-digit phone number";
  }

  return errors;
}
