import type { BillingInterval, Plan } from "@/types/plan";
import Image from "next/image";

type PlanCardProps = {
  plan: Plan;
  interval: BillingInterval;
  selected: boolean;
  onSelect: (planId: Plan["id"]) => void;
};

export default function PlanCard({
  plan,
  interval,
  selected,
  onSelect,
}: PlanCardProps) {
  const price = interval === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(plan.id)}
      className={`flex min-h-20 w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 md:min-h-44 md:flex-col md:justify-between ${
        selected
          ? "border-purple-600 bg-blue-50"
          : "border-purple-200 bg-white hover:border-purple-600"
      }`}
    >
      <Image
        src={`/images/icon-${plan.id}.svg`}
        alt=""
        width={40}
        height={40}
      />
      <span className="block">
        <span className="block font-bold text-blue-950">{plan.name}</span>
        <span className="block mt-1 text-gray-500 text-sm">
          ${price}/{interval === "monthly" ? "mo" : "yr"}
        </span>
        {interval === "yearly" && (
          <span className="block mt-1 text-blue-950 text-xs">
            2 months free
          </span>
        )}
      </span>
    </button>
  );
}
