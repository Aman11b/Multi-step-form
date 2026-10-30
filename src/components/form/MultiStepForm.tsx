"use client";

import {
  COMPLETE_STEP,
  FINAL_STEP,
  FIRST_STEP,
  SELECT_PLAN_STEP,
} from "@/lib/steps";

import type { AddOnId } from "@/types/add-on";
import type { PersonalInfoData } from "@/types/personal-info";
import type { BillingInterval, PlanId } from "@/types/plan";
import { useState } from "react";
import FormLayout from "../layout/FormLayout";
import AddOns from "./AddOns";
import PersonalInfo from "./PersonalInfo";
import SelectPlan from "./SelectPlan";
import StepForm from "./StepForm";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<number>(FIRST_STEP);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    name: "",
    email: "",
    phone: "",
  });

  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);

  const [selectedAddOns, setSelectedAddOns] = useState<AddOnId[]>([]);

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

  function handleAddOnToggle(id: AddOnId, selected: boolean) {
    setSelectedAddOns((current) => {
      if (selected) {
        return current.includes(id) ? current : [...current, id];
      }

      return current.filter((addOnId) => addOnId !== id);
    });
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
      {/* {currentStep > SELECT_PLAN_STEP && currentStep <= FINAL_STEP && (
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
      )} */}
      {currentStep === 3 && (
        <AddOns
          selectedAddOns={selectedAddOns}
          interval={billingInterval}
          onAddOnToggle={handleAddOnToggle}
          onSubmit={goNext}
          onBack={goBack}
        />
      )}
      {currentStep === FINAL_STEP && (
        <StepForm
          step={FINAL_STEP}
          onSubmit={(event) => {
            event.preventDefault();
            goNext();
          }}
        >
          <p>Summary content goes here</p>
        </StepForm>
      )}
      {currentStep === COMPLETE_STEP && <p>Thank You !</p>}
    </FormLayout>
  );
}
