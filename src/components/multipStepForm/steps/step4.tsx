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
import { Textarea } from "@/components/UI/textarea";

import { useFormContext } from "@/context/formContext/formHook";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/UI/switch";
import { Checkbox } from "@/components/UI/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Step4() {
  // YOU NEED TO IMPORT THE CONTEXT FIRST
  const formContext = useFormContext();
  const { propertyForm } = formContext;
  const router = useRouter();

  // STEP 1: Defining the form schema👇🏽
  const newUserFormSchema = z.object({
    allowSecurityEmail: z.boolean(),
    allowMarketingMail: z.boolean(),
    privacypolicyAccepted: z.literal<boolean>(true, {
      errorMap: () => ({ message: "Please Accept privacy policy" }),
    }),
  });

  // STEP 2: Defining your form.
  const stepFourForm = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    mode: "onChange",
    defaultValues: {
      allowSecurityEmail: propertyForm.formData.allowSecurityEmail,
      allowMarketingMail: propertyForm.formData.allowMarketingMail,
      privacypolicyAccepted: propertyForm.formData.privacypolicyAccepted,
    },
  });

  // STEP 3: Defining the submit function
  function onSubmit(values: z.infer<typeof newUserFormSchema>) {
    formContext.updatePropertyForm({
      activeStep: propertyForm.activeStep,
      formData: { ...propertyForm.formData, ...values },
    });

    // we can call an api here and submit the data
    // for now we will store it in local storage
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...propertyForm.formData, ...values })
    );

    router.push("/success");
  }

  const prevStep = () => {
    formContext.updatePropertyForm({
      ...propertyForm,
      activeStep: propertyForm.activeStep - 1,
    });
  };

  return (
    <Form {...stepFourForm}>
      <form
        onSubmit={stepFourForm.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-8"
      >
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={stepFourForm.control}
              name="allowMarketingMail"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={stepFourForm.control}
              name="allowSecurityEmail"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Security emails</FormLabel>
                    <FormDescription>
                      Receive emails about your account security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={stepFourForm.control}
              name="privacypolicyAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I have read and accept the privacy policy.
                    </FormLabel>
                    <FormDescription>
                      You can read the complete
                      <Link className="text-blue-900" href="/">
                        {" "}
                        privacy policy
                      </Link>{" "}
                      and
                      <Link className="text-blue-900" href="/">
                        {" "}
                        user agreement
                      </Link>{" "}
                      here.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="py-10 space-x-8 flex justify-between">
          <Button type="button" onClick={prevStep}>
            Prev
          </Button>
          <Button type="submit">Done</Button>
        </div>
      </form>
    </Form>
  );
}

export default Step4;
