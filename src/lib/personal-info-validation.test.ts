import type { PersonalInfoData } from "@/types/personal-info";
import { validatePersonalInfo } from "./personal-info-validation";

describe("validatePersonalInfo", () => {
  const validData: PersonalInfoData = {
    name: "Aman Singh",
    email: "aman@example.com",
    phone: "+91 9876543210",
  };

  it("return no error for valid data", () => {
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

  it("reject an invalid emaiul address", () => {
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
});
