import type { ReactNode, SubmitEvent } from "react";
import {
  FINAL_STEP,
  FIRST_STEP,
  STEP_CONTENT,
  type StepNumber,
} from "@/lib/steps";
import Button from "../ui/Button";

type StepFormProps={
    step:StepNumber;
    onSubmit:(event:SubmitEvent<HTMLFormElement>)=>void
    onBack?:()=>void
    children:ReactNode
}

export default function StepForm({
    step,
    onSubmit,
    onBack,
    children
}:StepFormProps){
    const {title,description}=STEP_CONTENT[step]

    return(
      <form onSubmit={onSubmit} noValidate>
        <h1 className="font-bold text-blue-950 text-2xl md:text-3xl">{title}</h1>
        <p className="mt-3 text-grey-500 text-base leading-6">{description}</p>
        <div className="mt-6">{children}</div>
        <div className="flex justify-between items-center mt-20">
          {step > FIRST_STEP && onBack && (
            <Button variant="secondary" onClick={onBack}>
              Go Back
            </Button>
          )}
          <Button type="submit" className="ml-auto">
            {step === FINAL_STEP ? "Confirm" : "Next Step"}
          </Button>
        </div>
      </form>
    )
}