import MultiStepForm from "@/components/multipStepForm/MultiStepForm";

/**
 * Base page 
 * @returns 
 */
export default function Home() {
  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center">
      <MultiStepForm />
    </div>
  );
}
