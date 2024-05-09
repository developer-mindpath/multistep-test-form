"use client";

import { FormContextProvider } from "@/context/formContext/formContext";
import FormSteps from "./formSteps";

/**
 * Mutlistep form with context
 * @returns
 */
function MultiStepForm() {
  return (
    <div className="h-2/3 max-sm:h-[95vh] max-sm:overflow-y-scroll max-md:w-[90vw] w-[700px]">
      <FormContextProvider>
        <FormSteps />
      </FormContextProvider>
    </div>
  );
}

export default MultiStepForm;
