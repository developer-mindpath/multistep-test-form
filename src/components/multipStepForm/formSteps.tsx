import { useFormContext } from "@/context/formContext/formHook";
import { ReactNode } from "react";
import Step1 from "./steps/step1";
import dynamic from "next/dynamic";
import Step4 from "./steps/step4";

// TODO - create loading state for both
const Step2 = dynamic(() => import("./steps/step2"));
const Step3 = dynamic(() => import("./steps/step3"));

function FormSteps(): ReactNode {
  const formData = useFormContext();
  const { propertyForm } = formData;

  const getActiveStep = () => {
    switch (propertyForm.activeStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return;
    }
  };

  return (
    <div>
      <h5 className="text-white my-2 font-bold">
        Step {propertyForm.activeStep} of 4
      </h5>
      {getActiveStep()}
    </div>
  );
}

export default FormSteps;
