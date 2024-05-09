import { ReactElement } from "react";
import Step1 from "./steps/step1";
import dynamic from "next/dynamic";
import StepLoading from "./steps/stepLoading";
import { Step, StepItem, Stepper } from "../UI/stepper";

// NOTE - import steps dynamically to reduce the initial bundle size
const Step2 = dynamic(() => import("./steps/step2"), {
  loading: () => <StepLoading />,
});
const Step3 = dynamic(() => import("./steps/step3"), {
  loading: () => <StepLoading />,
});
const Step4 = dynamic(() => import("./steps/step4"), {
  loading: () => <StepLoading />,
});

/**
 *  Load the form on the basis of current active step
 * @returns {ReactElement}
 */
function FormSteps(): ReactElement {
  const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
    { label: "Step 4" },
  ] satisfies StepItem[];

  const getActiveStep = (step: number) => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <div />;
    }
  };

  return (
    <div className="bg-white flex w-full flex-col gap-4">
      <Stepper className="p-4 mt-8 w-full" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              {getActiveStep(index + 1)}
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

export default FormSteps;
