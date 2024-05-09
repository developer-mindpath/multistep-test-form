import { useContext } from "react";
import { PropertyFormContext } from "./formContext";

export const useFormContext = () => {
  const context = useContext(PropertyFormContext);
  if (!context) {
    throw new Error(
      "propertyFormContext must be used within a NewUserFormContextProvider"
    );
  }

  return context;
};
