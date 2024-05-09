"use client";

import { FormContextProvider } from "@/context/formContext/formContext";
import FormSteps from "./formSteps";

/**
 *
 * @returns
 */
function MultiStepForm() {
  return (
    <div className="h-2/3 max-sm:h-auto max-w-2/3">
      <FormContextProvider>
        <FormSteps />
      </FormContextProvider>
    </div>
  );
}

export default MultiStepForm;
