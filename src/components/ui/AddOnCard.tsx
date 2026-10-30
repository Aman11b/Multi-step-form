"use client";

import type { AddOn } from "@/types/add-on";
import type { BillingInterval } from "@/types/plan";
import type { ChangeEvent } from "react";

type AddOnCardProps = {
  addOn: AddOn;
  interval: BillingInterval;
  selected: boolean;
  onToggle: (selected: boolean) => void;
};

export default function AddOnCard({
  addOn,
  interval,
  selected,
  onToggle,
}: AddOnCardProps) {
  const price = interval === "monthly" ? addOn.monthlyPrice : addOn.yearlyPrice;

  const duration = interval === "monthly" ? "mo" : "yr";

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onToggle(event.target.checked);
  }

  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${selected ? "border-purple-600 bg-blue-50" : "border-purple-200 bg-white hover:border-purple-600"}`}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={handleChange}
        aria-label={addOn.name}
        className="focus-visible:outline-2 focus-visible:outline-purple-600 focus:outline-offset-2 size-5 accent-purple-600 shrink-0"
      />
      <span className="flex-1 min-w-0">
        <span className="block font-bold text-blue-950 text-sm">
          {addOn.name}
        </span>
        <span className="block mt-1 text-grey-500 text-xs">
          {addOn.description}
        </span>
      </span>
      <span className="font-medium text-purple-600 text-xs shrink-0">
        +${price}/{duration}
      </span>
    </label>
  );
}
