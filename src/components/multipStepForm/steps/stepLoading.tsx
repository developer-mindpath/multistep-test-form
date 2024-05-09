import { Skeleton } from "@/components/UI/skeleton";

function StepLoading() {
  return (
    <div className="h-2/3 p-2 max-sm:h-auto w-full bg-white">
      <Skeleton className="h-12 w-full my-12 bg-gray-500" />
      <Skeleton className="h-12 my-12 w-full bg-gray-500" />
      <Skeleton className="h-12 my-12 w-full bg-gray-500" />
      <Skeleton className="h-12 my-12 w-full bg-gray-500" />
      <div className="flex justify-end mr-2 my-8">
        <Skeleton className="h-12 my-6 w-24 bg-gray-500" />
      </div>
    </div>
  );
}

export default StepLoading;
