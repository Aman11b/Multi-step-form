import type { ReactNode } from "react";
import StepSidebar from "./StepSidebar";

type FormLayoutProps = {
  currentStep:number;
  children: ReactNode;
};

export default function FormLayout({ currentStep,children }: FormLayoutProps) {
  return (
    <main className="md:flex md:justify-center md:items-center bg-blue-100 p-4 md:p-8 min-h-screen">
      <div className="md:gap-12 grid grid-cols-1 md:grid-cols-[275px_1fr] bg-white p-6 md:p-4 rounded-xl w-full max-w-5xl">
        <StepSidebar currentStep={currentStep} />
        <section className="p-2 md:px-12 md:py-8">{children}</section>
      </div>
    </main>
  );
}
