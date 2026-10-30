import { ADD_ONS } from "@/lib/add-ons";
import { PLANSDATA } from "@/lib/plans";
import { AddOnId } from "@/types/add-on";
import type { BillingInterval, PlanId } from "@/types/plan";
import type { SubmitEvent } from "react";
import StepForm from "./StepForm";
import { FINAL_STEP } from "@/lib/steps";

type SummaryProps = {
  selectedPlan: PlanId | null;
  selectedAddOns: AddOnId[];
  interval: BillingInterval;
  onChangePlan: () => void;
  onSubmit: () => void;
  onBack: () => void;
};

export default function Summary({
  selectedPlan,
  selectedAddOns,
  interval,
  onChangePlan,
  onSubmit,
  onBack,
}: SummaryProps) {
  const plan = PLANSDATA.find((item) => item.id === selectedPlan);

  const selectedAddOnDetails = ADD_ONS.filter((addOn) =>
    selectedAddOns.includes(addOn.id),
  );

  const planPrice =
    interval === "monthly"
      ? (plan?.monthlyPrice ?? 0)
      : (plan?.yearlyPrice ?? 0);

  const addOnsTotal = selectedAddOnDetails.reduce(
    (total, addOn) =>
      total + (interval === "monthly" ? addOn.monthlyPrice : addOn.yearlyPrice),
    0,
  );
  const total = planPrice + addOnsTotal;

  const duration = interval === "monthly" ? "mo" : "yr";

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <StepForm step={FINAL_STEP} onSubmit={handleSubmit} onBack={onBack}>
      <div className="bg-blue-50 p-5 rounded-lg">
        <div className="flex justify-between items-center pb-4 border-purple-200 border-b">
          <div>
            <p className="font-bold text-blue-950">
              {plan?.name ?? "No plan selected"}
              {interval === "monthly" ? "Monthly" : "Yearly"}
            </p>
            <button
              type="button"
              onClick={onChangePlan}
              className="mt-1 text-gray-500 hover:text-purple-600 text-sm underline"
            >
              Change
            </button>
          </div>

          <p className="font-bold text-blue-950">
            ${planPrice}/{duration}
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          {selectedAddOnDetails.map((addOn) => {
            const price =
              interval === "monthly" ? addOn.monthlyPrice : addOn.yearlyPrice;

            return (
              <div
                key={addOn.id}
                className="flex justify-between items-center gap-4 text-sm"
              >
                <span className="text-grey-500">{addOn.name}</span>
                <span className="text-blue-950">
                  ${price}/{duration}
                </span>
              </div>
            );
          })}

          {selectedAddOnDetails.length === 0 && (
            <p className="text-grey-500 text-sm"> No Add-ons selected</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center p-5">
        <span className="text-grey-500 text-sm">
          Total (per {interval === "monthly" ? "month" : "year"})
        </span>

        <span className="font-bold text-purple-600 text-lg">
          +${total}/{duration}
        </span>
      </div>
    </StepForm>
  );
}
