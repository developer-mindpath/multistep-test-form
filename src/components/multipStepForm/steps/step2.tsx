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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

function Step2() {
  const formContext = useFormContext();
  const { propertyForm } = formContext;

  const newUserFormSchema = z.object({
    email: z.string().email("email should be in format user@example.com"),
    //TODO - fix this
    age: z.string().min(1, "age must be grater than 18"),
    phoneNo: z.string().min(10, "must be atleast 10 digits"),
    occupation: z.string({
      required_error: "Please select an occupation to continue",
    }),
  });

  const stepTwoForm = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    mode: "onChange",
    defaultValues: {
      email: propertyForm.formData.email,
      age: propertyForm.formData.age,
      phoneNo: propertyForm.formData.phoneNo,
      occupation: propertyForm.formData.occupation,
    },
  });

  function onSubmit(values: z.infer<typeof newUserFormSchema>) {
    formContext.updatePropertyForm({
      activeStep: propertyForm.activeStep + 1,
      formData: { ...propertyForm.formData, ...values },
    });
  }

  const prevStep = () => {
    formContext.updatePropertyForm({
      ...propertyForm,
      activeStep: propertyForm.activeStep - 1,
    });
  };

  return (
    <Form {...stepTwoForm}>
      <form
        onSubmit={stepTwoForm.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-8 w-96 max-sm:w-[90vw]"
      >
        <FormField
          name="email"
          control={stepTwoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormMessage />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-gray-600">
                Enter your Email
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="age"
          control={stepTwoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormMessage />
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="phoneNo"
          control={stepTwoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormMessage />
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={stepTwoForm.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select your occupation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Lawyer">Lawyer</SelectItem>
                  <SelectItem value="Engineer">Engineer</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className=" flex justify-between items-center py-10 space-x-8">
          <Button type="button" onClick={prevStep}>
            Prev
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}

export default Step2;
