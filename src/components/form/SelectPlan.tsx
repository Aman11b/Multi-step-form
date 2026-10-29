import { PLANSDATA } from "@/lib/plans";
import { SELECT_PLAN_STEP } from "@/lib/steps";
import { BillingInterval, PlanId } from "@/types/plan";
import { SubmitEvent, useState } from "react";
import PlanCard from "../ui/PlanCard";
import StepForm from "./StepForm";

type SelectedPlanProps = {
  selectedPlan: PlanId | null;
  interval: BillingInterval;
  onPlanChange: (planId: PlanId) => void;
  onIntervalChange: (interval: BillingInterval) => void;
  onSubmit: () => void;
  onBack: () => void;
};
export default function SelectPlan({
  selectedPlan,
  interval,
  onPlanChange,
  onIntervalChange,
  onSubmit,
  onBack,
}: SelectedPlanProps) {
  const [error, setError] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPlan) {
      setError("Please select a plan");
      return;
    }

    setError("");
    onSubmit();
  }
  function handleIntervalChange() {
    onIntervalChange(interval === "monthly" ? "yearly" : "monthly");
  }
  return (
    <StepForm step={SELECT_PLAN_STEP} onSubmit={handleSubmit} onBack={onBack}>
      <div>
        <div className="gap-3 grid grid-cols-1 md:grid-cols-3">
          {PLANSDATA.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              interval={interval}
              selected={selectedPlan === plan.id}
              onSelect={(planId) => {
                onPlanChange(planId);
                setError("");
              }}
            />
          ))}
        </div>

        {error && (
          <p role="alert" className="mt-3 text-red-500 text-sm">
            {error}
          </p>
        )}

        <div className="flex justify-center items-center gap-6 bg-blue-50 mt-8 p-4 rounded-lg font-bold text-sm">
          <span
            className={
              interval === "monthly" ? "text-blue-950" : "text-grey-500"
            }
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={interval === "yearly"}
            aria-label="Yearly billing"
            onClick={handleIntervalChange}
            className="relative bg-blue-950 rounded-full focus-visible:outline-2 focus-visible:outline-purple-600 focus-visible:outline-offset-2 w-10 h-5 shrink-0"
          >
            <span
              className={`absolute left-1 top-1 size-3 rounded-full bg-white transition-transform ${
                interval === "yearly" ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>

          <span
            className={
              interval === "yearly" ? "text-blue-950" : "text-grey-500"
            }
          >
            Yearly
          </span>
        </div>
      </div>
    </StepForm>
  );
}
