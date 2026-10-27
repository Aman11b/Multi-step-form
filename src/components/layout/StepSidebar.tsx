const steps = [
  { number: 1, label: "YOUR INFO" },
  { number: 2, label: "SELECT PLAN" },
  { number: 3, label: "ADD-ONS" },
  { number: 4, label: "SUMMARY" },
];

export default function StepSidebar() {
  return (
    <aside className="relative min-h-43 overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat px-6 py-8 md:min-h-142 md:px-8 bg-[url('/images/bg-sidebar-mobile.svg')] md:bg-[url('/images/bg-sidebar-desktop.svg')]  ">
      <ol className="relative z-10 flex justify-center gap-4 md:flex-col md:gap-8">
        {steps.map((step) => (
          <li key={step.number} className="flex items-center gap-4">
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${step.number === 1 ? "border-blue-200 bg-blue-200 text-blue-950" : "border-white bg-transparent text-white"}`}
            >
              {step.number}
            </span>
            <div className="hidden md:block">
              <p className="text-xs text-blue-200">STEP {step.number}</p>
              <span className="mt-1 block text-sm font-bold tracking-wider text-white">
                {step.label}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
