"use client";

import { User } from "@/context/formContext/formContext";
import { getNameInitials, getObjecturl } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

function Success() {
  const formData: User = JSON.parse(localStorage.getItem("formData") ?? "");
  return (
    <div className="bg-slate-700 h-screen flex justify-center items-center">
      <div className="w-[90vw] max-sm:h-[90vh] bg-white shadow-xl border-0 border-lg flex flex-col p-4">
        <div className="w-full flex justify-center">
          <h3 className="text-xl font-bold">Form Submitted Successfully</h3>
        </div>
        <div className="w-full flex justify-center py-2">
          <Avatar className="w-36 h-36">
            <AvatarImage src={getObjecturl(formData.profilePic)} />
            <AvatarFallback>
              {getNameInitials(formData.name, formData.lastname)}
            </AvatarFallback>
          </Avatar>
        </div>
        <h6 className="py-2">Name : {formData.name}</h6>
        <h6 className="py-2">LastName : {formData.lastname}</h6>
        <h6 className="py-2">email :{formData.email}</h6>
        <h6 className="py-2">Phone Number :{formData.phoneNo}</h6>
        <h6 className="py-2">Occupation :{formData.occupation}</h6>
        <h6 className="py-2">age : {formData.age}</h6>
        <h6 className="py-2">bio :{formData.bio}</h6>
        <h6 className="py-2">
          allow Marketing Mail :{`${formData.allowMarketingMail}`}
        </h6>
        <h6 className="py-2">
          allow Security Email{`${formData.allowSecurityEmail}`}
        </h6>
        <h6 className="py-2">
          Privacy Policy Accepted{`${formData.privacypolicyAccepted}`}
        </h6>
      </div>
    </div>
  );
}

export default Success;
