import { ReactNode, createContext, useState } from "react";

export type User = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  profilePic: string;
  age: string;
  phoneNo: string;
  occupation: string;
  bio: string;
  allowSecurityEmail: boolean;
  allowMarketingMail: boolean;
  privacypolicyAccepted: boolean;
};

export type FormDataType = {
  activeStep: number;
  formData: User;
};

export const initialFormData: FormDataType = {
  activeStep: 1,
  formData: {
    name: "",
    lastname: "",
    email: "",
    password: "",
    profilePic: "",
    age: "",
    phoneNo: "",
    occupation: "",
    bio: "",
    allowSecurityEmail: false,
    allowMarketingMail: false,
    privacypolicyAccepted: false,
  },
};

export interface UserContextProps {
  propertyForm: FormDataType;
  updatePropertyForm: (property: FormDataType) => void;
}

export const PropertyFormContext = createContext<UserContextProps | null>({
  propertyForm: initialFormData,
  updatePropertyForm: () => null,
});

export function FormContextProvider({ children }: { children: ReactNode }) {
  const [propertyForm, setPropertyForm] =
    useState<FormDataType>(initialFormData);

  const updatePropertyForm = (values: FormDataType) => {
    setPropertyForm({ ...propertyForm, ...values });
  };

  return (
    <PropertyFormContext.Provider value={{ propertyForm, updatePropertyForm }}>
      {children}
    </PropertyFormContext.Provider>
  );
}
