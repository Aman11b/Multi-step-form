import type { ReactNode } from "react";
import StepSidebar from "./StepSidebar";

type FormLayoutProps = {
  children: ReactNode;
};

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <main className="min-h-screen bg-blue-100 p-4 md:flex md:items-center md:justify-center md:p-8">
      <div className="grid w-full max-w-5xl grid-cols-1 rounded-xl bg-white p-6 md:grid-cols-[275px_1fr] md:gap-12 md:p-4">
        <StepSidebar />
        <section className="p-2 md:px-12 md:py-8">{children}</section>
      </div>
    </main>
  );
}
