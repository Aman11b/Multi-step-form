export type PlanId = "arcade" | "advanced" | "pro";

export type BillingInterval = "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
};
