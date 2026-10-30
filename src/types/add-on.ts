export type AddOnId =
  | "online-service"
  | "larger-storage"
  | "customizable-profile";

export type AddOn = {
  id: AddOnId;
  name: "Online service" | "Larger storage" | "Customizable profile";
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
};

export type AddOnSelected = {
  id: AddOnId;
};
