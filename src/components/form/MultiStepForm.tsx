"use client";

import {
  ADD_ONS_STEP,
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
import Summary from "./Summary";
import Image from "next/image";

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

      {currentStep === ADD_ONS_STEP && (
        <AddOns
          selectedAddOns={selectedAddOns}
          interval={billingInterval}
          onAddOnToggle={handleAddOnToggle}
          onSubmit={goNext}
          onBack={goBack}
        />
      )}
      {currentStep === FINAL_STEP && (
        <Summary
          selectedPlan={selectedPlan}
          selectedAddOns={selectedAddOns}
          interval={billingInterval}
          onChangePlan={() => setCurrentStep(SELECT_PLAN_STEP)}
          onSubmit={goNext}
          onBack={goBack}
        />
      )}
      {currentStep === COMPLETE_STEP && (
        <div className="flex flex-col justify-center items-center min-h-100 text-center">
          <Image
            src="/images/icon-thank-you.svg"
            alt=""
            width={56}
            height={56}
          />
          <h2 className="mt-6 font-bold text-blue-950 text-2xl">Thank You!</h2>
          <p className="mt-3 max-w-md text-grey-500">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email
            us.
          </p>
        </div>
      )}
    </FormLayout>
  );
}
