import { AddOnId } from "@/types/add-on";
import { BillingInterval } from "@/types/plan";
import type { SubmitEvent } from "react";
import StepForm from "./StepForm";
import { ADD_ONS } from "@/lib/add-ons";
import AddOnCard from "../ui/AddOnCard";

type AddOnsProps = {
  selectedAddOns: AddOnId[];
  interval: BillingInterval;
  onAddOnToggle: (id: AddOnId, selected: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
};

export default function AddOns({
  selectedAddOns,
  interval,
  onAddOnToggle,
  onSubmit,
  onBack,
}: AddOnsProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }
  return (
    <StepForm step={3} onSubmit={handleSubmit} onBack={onBack}>
      <div className="flex flex-col gap-4">
        {ADD_ONS.map((addOn) => (
          <AddOnCard
            key={addOn.id}
            addOn={addOn}
            interval={interval}
            selected={selectedAddOns.includes(addOn.id)}
            onToggle={(selected) => onAddOnToggle(addOn.id, selected)}
          />
        ))}
      </div>
    </StepForm>
  );
}
