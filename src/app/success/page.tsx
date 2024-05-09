"use client";

import { User } from "@/context/formContext/formContext";
import Image from "next/image";

function Success() {
  const formData: User = JSON.parse(localStorage.getItem("formData") ?? "");
  return (
    <div className="bg-slate-700 h-screen flex justify-center items-center">
      <div className="w-[90vw] bg-white shadow-xl border-0 border-lg flex flex-col p-4">
        <div className="w-full flex justify-center">
          <h3 className="text-xl font-bold">Form Submitted Successfully</h3>
        </div>
        <div className="w-full flex justify-center py-2">
          <img
            // width={24}
            // height={24}
            className="w-12 h-12 rounded-full border-0 object-contain"
            src={formData.profilePic}
            alt="profile pic"
          />
        </div>
        <h6 className="py-2">Name : {formData.name}</h6>
        <h6 className="py-2">LastName : {formData.lastname}</h6>
        <h6 className="py-2">email :{formData.email}</h6>
        <h6 className="py-2">Phone Number :{formData.phoneNo}</h6>
        <h6 className="py-2">Occupation :{formData.occupation}</h6>
        <h6 className="py-2">age : {formData.age}</h6>
        <h6 className="py-2">bio :{formData.bio}</h6>
        <h6 className="py-2">
          allow Marketing Mail :{formData.allowMarketingMail}
        </h6>
        <h6 className="py-2">
          allow Security Email{formData.allowSecurityEmail}
        </h6>
        <h6 className="py-2">
          Privacy Policy Accepted{formData.privacypolicyAccepted}
        </h6>
      </div>
    </div>
  );
}

export default Success;
