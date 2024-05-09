import { Button } from "@/components/UI/button";
import {
  Form,
  FormControl,
  FormDescription,
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

function Step1() {
  const formContext = useFormContext();
  const { propertyForm } = formContext;

  const newUserFormSchema = z
    .object({
      name: z.string().min(3, "should be east 3 characters"),
      lastname: z.string().min(3, "should be east 3 characters"),
      password: z
        .string()
        .min(8, "at least 8 characteres")
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
      name: propertyForm.formData.name,
      lastname: propertyForm.formData.lastname,
      password: propertyForm.formData.password,
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof newUserFormSchema>) {
    console.log("values: ", values);
    const { confirmPassword, ...updatedValue } = values;
    console.log("updatedValue: ", updatedValue);
    formContext.updatePropertyForm({
      activeStep: propertyForm.activeStep + 1,
      formData: { ...propertyForm.formData, ...updatedValue },
    });
  }

  return (
    <Form {...stepOneForm}>
      <form
        onSubmit={stepOneForm.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-8 flex flex-col w-96 max-sm:w-[90vw]"
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
                <Input {...field} />
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
                <Input {...field} />
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
