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
import { ReactElement, useState } from "react";
import { getNameInitials, getObjecturl } from "@/lib/utils";
import { useStepper } from "@/components/UI/stepper";

/**
 * Step 3 of the form has profile pic and bio
 * @returns {ReactElement}
 */
function Step3(): ReactElement {
  const formContext = useFormContext();
  const { propertyForm } = formContext;
  const [profileImage, setProfileImage] = useState<File>(
    propertyForm.profilePic
  );
  const { nextStep, prevStep } = useStepper();

  const newUserFormSchema = z.object({
    bio: z.string(),
    profilePic: z.any({ required_error: "please upload a profile pic" }),
  });

  const stepThreeForm = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    mode: "onChange",
    defaultValues: {
      bio: propertyForm.bio,
      profilePic: propertyForm.profilePic,
    },
  });

  function onSubmit(values: z.infer<typeof newUserFormSchema>) {
    formContext.updatePropertyForm({
      ...propertyForm,
      ...values,
    });
    nextStep();
  }

  return (
    <Form {...stepThreeForm}>
      <form
        onSubmit={stepThreeForm.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-8 w-full"
      >
        <div className="flex justify-center items-center">
          <Avatar className="w-44 h-44">
            <AvatarImage src={getObjecturl(profileImage)} />
            <AvatarFallback>
              {getNameInitials(propertyForm.name, propertyForm.lastname)}
            </AvatarFallback>
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
                  onChange={(event) => {
                    if (!event || !event.target || !event.target.files) return;
                    setProfileImage(event.target.files[0]);
                    field.onChange(event);
                  }}
                  value={field.value.path}
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
