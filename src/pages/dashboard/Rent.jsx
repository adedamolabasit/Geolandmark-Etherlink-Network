import React, { useState } from "react";
import Step1 from "../../assets/step1.svg";
import Upload from "../../assets/upload.svg";
import { RadioOne, RadioTwo } from "../../utils/promptButton";
import right from "../../assets/dashboard/right.svg";
import backImg from "../../assets/dashboard/back.svg";
import FormStepOne from "../../components/FormStepOne";
import FormStepThree from "../../components/FormStepThree";
import FormStepTwo from "../../components/FormStepTwo";
import { useMultiStepForm } from "../../components/UseMultiStepForm";

export default function Rent() {
  const [data, setData] = useState({
    property_address: "",
    property_type: "",
    property_size: "",
    property_condition: "",
    no_of_bedrooms: "",
    no_of_bathrooms: "",
    furnishing: "",
    property_description: "",
    property_price: "",
    facilities: "",
    property_image: "",
    full_name: "",
    email_address: "",
    phone_number: "",
    service_charge: "",
    service_charge_fee: "",
    agency_fee: "",
    land_and_agreement_fee: "",
    caution_fee: "",
  });

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <FormStepOne data={data} setData={setData} />,
      <FormStepTwo data={data} setData={setData} />,
      <FormStepThree data={data} setData={setData} />,
    ]);

  const onSubmit = (e) => {
    e.preventDefault();
    next();
    console.log(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-center">
        <div className="bg-[#0D0D0D] rounded-[40px]  w-[39.01vw] px-[4.48vw] pt-[3.43vh] pb-[9.54vh] flex-col  items-center ">
          <div className="flex flex-col">
            <img src={Step1} alt="step1" className="w-full" />
            <div className="mt-[6.2037vh] text-zinc-400 text-xl font-bold leading-snug mb-[5.46vh] ">
              {isFirstStep && "Property Details"}
              {isLastStep && "Contact Details"}
              {!isFirstStep && !isLastStep && "Property Details"}
            </div>
            {step}
          </div>
          <div className="flex items-center gap-6 justify-center mt-[7.68vh] ">
            {!isFirstStep && (
              <div className="flex items-center justify-center">
                <button
                  className={`border-[1px] border-[#009FBD]/70 py-[1.30vh] px-[2.34vw] rounded-[10px] flex gap-2  `}
                  onClick={back}
                >
                  <img src={backImg} />
                  Back
                </button>
              </div>
            )}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={`
                } bg-[#009FBD]/70 py-[1.30vh] px-[2.34vw] rounded-[10px] flex gap-2 `}
              >
                Next <img src={right} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
