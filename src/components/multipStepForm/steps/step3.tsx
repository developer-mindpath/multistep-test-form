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
import { Textarea } from "@/components/UI/textarea";

import { useFormContext } from "@/context/formContext/formHook";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/UI/avatar";

function Step3() {
  // YOU NEED TO IMPORT THE CONTEXT FIRST
  const formContext = useFormContext();
  const { propertyForm } = formContext;

  // STEP 1: Defining the form schema👇🏽
  const newUserFormSchema = z.object({
    bio: z.string(),
    profilePic: z.string({ required_error: "please upload a profile pic" }),
  });

  // STEP 2: Defining your form.
  const stepThreeForm = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    mode: "onChange",
    defaultValues: {
      bio: propertyForm.formData.bio,
      profilePic: propertyForm.formData.profilePic,
    },
  });

  const getObjecturl = (value: any) => {
    let binaryData = [];
    binaryData.push(value);
    return window.URL.createObjectURL(
      new Blob(binaryData, { type: "application/zip" })
    );
  };

  // STEP 3: Defining the submit function
  function onSubmit(values: z.infer<typeof newUserFormSchema>) {
    const updateValue = {
      ...values,
      profilePic: getObjecturl(values.profilePic),
    };
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
    <Form {...stepThreeForm}>
      <form
        onSubmit={stepThreeForm.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-8 w-[468px] max-sm:w-[90vw] "
      >
        <div className="flex justify-center items-center">
          <Avatar className="w-44 h-44">
            <AvatarImage src={getObjecturl(propertyForm.formData.profilePic)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <FormField
          name="profilePic"
          control={stepThreeForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Pic</FormLabel>
              <FormMessage />
              <FormControl>
                <Input
                  type="file"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={stepThreeForm.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-10 space-x-8 flex justify-between items-center">
          <Button type="button" onClick={prevStep}>
            Prev
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}

export default Step3;
