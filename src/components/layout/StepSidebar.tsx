const steps = [
  { number: 1, label: "YOUR INFO" },
  { number: 2, label: "SELECT PLAN" },
  { number: 3, label: "ADD-ONS" },
  { number: 4, label: "SUMMARY" },
];

export default function StepSidebar() {
  return (
    <aside className="relative bg-[url('/images/bg-sidebar-mobile.svg')] md:bg-[url('/images/bg-sidebar-desktop.svg')] bg-cover bg-no-repeat bg-center px-6 md:px-8 py-8 rounded-lg min-h-43 md:min-h-142 overflow-hidden">
      <ol className="z-10 relative flex md:flex-col justify-center gap-4 md:gap-8">
        {steps.map((step) => (
          <li key={step.number} className="flex items-center gap-4">
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${step.number === 1 ? "border-blue-200 bg-blue-200 text-blue-950" : "border-white bg-transparent text-white"}`}
            >
              {step.number}
            </span>
            <div className="hidden md:block">
              <p className="text-blue-200 text-xs">STEP {step.number}</p>
              <span className="block mt-1 font-bold text-white text-sm tracking-wider">
                {step.label}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
