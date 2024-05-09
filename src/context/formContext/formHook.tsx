import { useContext } from "react";
import { PropertyFormContext } from "./formContext";

/**
 * Extract values and method from form context
 * @returns {Function<UserContextProps>}
 */
export const useFormContext = () => {
  const context = useContext(PropertyFormContext);
  if (!context) {
    throw new Error(
      "propertyFormContext must be used within a NewUserFormContextProvider"
    );
  }

  return context;
};
