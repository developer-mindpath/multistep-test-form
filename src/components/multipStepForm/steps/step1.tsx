import { Button } from "@/components/UI/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { useFormContext } from "@/context/formContext/formHook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepper } from "@/components/UI/stepper";
import { ReactElement, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

/**
 * Step 1 of the form has name lastname , password , confirm password field
 * @returns {ReactElement}
 */
function Step1(): ReactElement {
  const formContext = useFormContext();
  const { propertyForm } = formContext;
  const { nextStep } = useStepper();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

  const newUserFormSchema = z
    .object({
      name: z.string().min(3, "should be atleast 3 characters"),
      lastname: z.string().min(3, "should be atleast 3 characters"),
      password: z
        .string()
        .regex(
          passwordValidation,
          "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character required"
        )
        .max(30, "max 30 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const stepOneForm = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    mode: "onChange",
    defaultValues: {
      name: propertyForm.name,
      lastname: propertyForm.lastname,
      password: propertyForm.password,
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof newUserFormSchema>) {
    const { confirmPassword, ...updatedValue } = values;
    formContext.updatePropertyForm({
      ...propertyForm,
      ...updatedValue,
    });
    nextStep();
  }

  return (
    <Form {...stepOneForm}>
      <form
        onSubmit={stepOneForm.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-8 flex flex-col w-full"
      >
        <FormField
          name="name"
          control={stepOneForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormMessage />
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="lastname"
          control={stepOneForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormMessage />
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={stepOneForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormMessage />
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} {...field} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={stepOneForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormMessage />
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full py-10 pl-4 space-x-8 flex items-center justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}

export default Step1;
