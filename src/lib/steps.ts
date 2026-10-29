export const STEPS = [
  { number: 1, label: "YOUR INFO" },
  { number: 2, label: "SELECT PLAN" },
  { number: 3, label: "ADD-ONS" },
  { number: 4, label: "SUMMARY" },
] as const;

export type StepNumber = (typeof STEPS)[number]["number"];

export const FIRST_STEP = 1 as const;
export const SELECT_PLAN_STEP = 2 as const;
export const FINAL_STEP = STEPS.length;
export const COMPLETE_STEP = FINAL_STEP + 1;

export const STEP_CONTENT: Record<
  StepNumber,
  { title: string; description: string }
> = {
  1: {
    title: "Personal info",
    description: "Please provide your name, email address, and phone number.",
  },
  2: {
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
  },
  3: {
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
  },
  4: {
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
  },
};
