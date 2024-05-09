import { ReactNode, createContext, useState } from "react";

export type User = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  profilePic: File;
  age: number;
  phoneNo: string;
  occupation: string;
  bio: string;
  allowSecurityEmail: boolean;
  allowMarketingMail: boolean;
  privacypolicyAccepted: boolean;
};

export const initialFormData: User = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  profilePic: {} as File,
  age: 18,
  phoneNo: "",
  occupation: "",
  bio: "",
  allowSecurityEmail: false,
  allowMarketingMail: false,
  privacypolicyAccepted: false,
};

export interface UserContextProps {
  propertyForm: User;
  updatePropertyForm: (property: User) => void;
}

/**
 * Creating context to store form values
 */
export const PropertyFormContext = createContext<UserContextProps | null>({
  propertyForm: initialFormData,
  updatePropertyForm: () => null,
});

/**
 * Form context provider , wrap this aound the compomponent to extract form values and update them
 * @param {ReactNode} param0
 * @returns {ReactElement}
 */
export function FormContextProvider({ children }: { children: ReactNode }) {
  const [propertyForm, setPropertyForm] = useState<User>(initialFormData);

  const updatePropertyForm = (values: User) => {
    setPropertyForm({ ...propertyForm, ...values });
  };

  return (
    <PropertyFormContext.Provider value={{ propertyForm, updatePropertyForm }}>
      {children}
    </PropertyFormContext.Provider>
  );
}
