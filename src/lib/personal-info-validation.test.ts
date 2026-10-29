import type { PersonalInfoData } from "@/types/personal-info";
import { validatePersonalInfo } from "./personal-info-validation";

describe("validatePersonalInfo", () => {
  const validData: PersonalInfoData = {
    name: "Aman Singh",
    email: "aman@example.com",
    phone: "+91 9876543210",
  };

  it("returns no errors for valid data", () => {
    expect(validatePersonalInfo(validData)).toEqual({});
  });

  it("requires all three fields", () => {
    const emptyData: PersonalInfoData = {
      name: "",
      email: "",
      phone: "",
    };

    expect(validatePersonalInfo(emptyData)).toEqual({
      name: "This field is required",
      email: "This field is required",
      phone: "This field is required",
    });
  });

  it("rejects an invalid email address", () => {
    const data = {
      ...validData,
      email: "not-an-email",
    };

    expect(validatePersonalInfo(data)).toEqual({
      email: "Enter a valid email address",
    });
  });

  it("rejects whitespace-only values", () => {
    const data: PersonalInfoData = {
      name: "   ",
      email: "   ",
      phone: "   ",
    };

    expect(validatePersonalInfo(data)).toEqual({
      name: "This field is required",
      email: "This field is required",
      phone: "This field is required",
    });
  });

  it.each(["+91 9876543210", "9876543210", "+1 (234) 567-8901"])(
    "accepts a phone number with common formatting: %s",
    (phone) => {
      expect(
        validatePersonalInfo({ ...validData, phone }).phone,
      ).toBeUndefined();
    },
  );

  it.each(["123", "abcdefghij", "+-()", "123456789012345678901"])(
    "rejects an invalid phone number: %s",
    (phone) => {
      expect(validatePersonalInfo({ ...validData, phone }).phone).toBe(
        "Enter a valid phone number",
      );
    },
  );
});
