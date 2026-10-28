export type PersonalInfoData = {
  name: string;
  email: string;
  phone: string;
};

export type PersonalInfoError = Partial<Record<keyof PersonalInfoData, string>>;

// * PersonalInfoErrors allows an error for any field, but doesn't require every field to have one. For example, { email: "Enter a valid email address" } is valid.

// * keyof PersonalInfoData evaluates to "name" | "email" | "phone", so TypeScript restricts error keys to those fields.
