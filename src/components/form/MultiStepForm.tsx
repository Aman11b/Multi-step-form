"use client";

import {
  COMPLETE_STEP,
  FINAL_STEP,
  FIRST_STEP,
  SELECT_PLAN_STEP,
  type StepNumber,
} from "@/lib/steps";

import type { PersonalInfoData } from "@/types/personal-info";
import { useState } from "react";
import FormLayout from "../layout/FormLayout";
import PersonalInfo from "./PersonalInfo";
import StepForm from "./StepForm";
import type { BillingInterval, PlanId } from "@/types/plan";
import SelectPlan from "./SelectPlan";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<number>(FIRST_STEP);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    name: "",
    email: "",
    phone: "",
  });

  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);

  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("monthly");

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, COMPLETE_STEP));
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, FIRST_STEP));
  }

  function handlePersonalInfoSubmit(data: PersonalInfoData) {
    setPersonalInfo(data);
    goNext();
  }

  return (
    <FormLayout currentStep={currentStep}>
      {currentStep === FIRST_STEP && (
        <PersonalInfo
          initialValues={personalInfo}
          onSubmit={handlePersonalInfoSubmit}
        />
      )}
      {currentStep === SELECT_PLAN_STEP && (
        <SelectPlan
          selectedPlan={selectedPlan}
          interval={billingInterval}
          onPlanChange={setSelectedPlan}
          onIntervalChange={setBillingInterval}
          onSubmit={goNext}
          onBack={goBack}
        />
      )}
      {currentStep > SELECT_PLAN_STEP && currentStep <= FINAL_STEP && (
        <StepForm
          step={currentStep as StepNumber}
          onSubmit={(event) => {
            event.preventDefault();
            goNext();
          }}
          onBack={goBack}
        >
          <p>Step {currentStep} content goes here</p>
        </StepForm>
      )}
      {currentStep === COMPLETE_STEP && <p>Thank You !</p>}
    </FormLayout>
  );
}
