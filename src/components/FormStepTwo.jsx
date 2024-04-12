import React, { useState } from "react"
import {
  label_styles,
  input_container_styles,
  general_input_styles,
} from "../utils/index.js"
import upload from "../assets/dashboard/upload.svg";

function FormStepTwo({ setData, data }) {
  const [toggle, setToggle] = useState("No");
  const [toggleServiceCharge, setToggleServiceCharge] = useState("No");

  const handleToggle = (response) => {
    setToggle(response);
    console.log(response);
  };

  const handleToggleServiceCharge = (response) => {
    setToggleServiceCharge(response);
    console.log(response);
  };

  return (
    <div className="flex flex-col gap-[4.17vh] mb-[7.40vh]">
      <div className={input_container_styles}>
        <label htmlFor="" className={label_styles}>
          Facilities
        </label>
        <select
          className={` w-full h-[4.91vh] rounded-lg px-[0.68vw] text-[#1B1B1B] placeholder:text-[#1B1B1B] bg-[#865DFF]`}
          onChange={(e) => setData({ ...data, facilities: e.target.value })}
          value={data.facilities}
          required
        >
          <option value="nil">Click to Select Facilities </option>
          <option value="Swimming Pool">Swimming Pool</option>
          <option value="Gym">Gym</option>
          <option value="Mini Mall">Mini Mall</option>
        </select>
      </div>
      <div className={input_container_styles}>
        <label htmlFor="" className={label_styles}>
          Property Price (Per Annum) (₦)
        </label>
        <input
          type="number"
          placeholder="Property Price (Per Annum) (₦)"
          className={general_input_styles}
          required
        />
      </div>
      <div className={input_container_styles}>
        <label htmlFor="" className={label_styles}>
          Property Description
        </label>
        <input
          type="textarea"
          placeholder="Property Description"
          className={`h-[16.20vh] bg-[#D9D9D9] w-full rounded-lg px-[0.68vw] text-[#1B1B1B] placeholder:text-[#1B1B1B] `}
          required
        />
      </div>
      <div className="flex items-center justify-start gap-6">
        <label htmlFor="" className={label_styles}>
          Negotiable?
        </label>
        <div className="flex items-center gap-2">
          <h6>Yes</h6>
          <div className="bg-[#B9B9B9] h-[2.22vh] w-[2.29vw] flex items-center rounded-full ">
            <div
              className={` w-full h-full rounded-full cursor-pointer ${
                toggle === "Yes" ? "bg-white" : "bg-none"
              }`}
              onClick={() => handleToggle("Yes")}
            ></div>
            <div
              className={` w-full h-full rounded-full  cursor-pointer ${
                toggle === "No" ? "bg-white" : "bg-none"
              }`}
              onClick={() => handleToggle("No")}
            ></div>
          </div>
          <h6>No</h6>
        </div>
      </div>
      <div>
        <label htmlFor="" className={label_styles}>
          Property Images or Videos
        </label>
        <div className="w-full h-[18.89vh] rounded-[0.625rem] border-[1px] border-dashed border-[#B9B9B9] flex flex-col items-center justify-center ">
          <img src={upload} alt="" className="w-2.81rem" />

          <h6 className="text-[#009FBD] font-medium hover:underline relative">
            Select a File to Upload
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) =>
                setData({ ...data, property_image: e.target.value })
              }
              value={data.property_image}
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
              placeholder=""
              required
            />
          </h6>

          <p>Or Drag and Drop it here</p>
        </div>
      </div>
      <div className="flex items-center justify-start gap-6">
        <label htmlFor="" className={label_styles}>
          Service Charge?
        </label>
        <div className="flex items-center gap-2">
          <h6>Yes</h6>
          <div className="bg-[#B9B9B9] h-[2.22vh] w-[2.29vw] flex items-center rounded-full ">
            <div
              className={` w-full h-full rounded-full cursor-pointer ${
                toggleServiceCharge === "Yes" ? "bg-white" : "bg-none"
              }`}
              onClick={() => handleToggleServiceCharge("Yes")}
            ></div>
            <div
              className={` w-full h-full rounded-full  cursor-pointer ${
                toggleServiceCharge === "No" ? "bg-white" : "bg-none"
              }`}
              onClick={() => handleToggleServiceCharge("No")}
            ></div>
          </div>
          <h6>No</h6>
        </div>
      </div>
      {toggleServiceCharge === "Yes" && (
        <div className="flex flex-col gap-[4.17vh] ">
          <div className={input_container_styles}>
            <label htmlFor="" className={label_styles}>
              Service Charge Cover (₦)
            </label>
            <input
              type="number"
              onChange={(e) =>
                setData({ ...data, service_charge_cover: e.target.value })
              }
              value={data.service_charge_cover}
              placeholder="Service Charge Cover (₦)"
              className={general_input_styles}
            />
          </div>
          <div className="flex w-full justify-between gap-[1.77vh] ">
            <div className={input_container_styles}>
              <label htmlFor="" className={label_styles}>
                Service Charge Fee (₦)
              </label>
              <input
                type="number"
                onChange={(e) =>
                  setData({ ...data, service_charge_fee: e.target.value })
                }
                value={data.service_charge_fee}
                placeholder="Service Charge Fee (₦)"
                className={general_input_styles}
              />
            </div>
            <div className={input_container_styles}>
              <label htmlFor="" className={label_styles}>
                Agency Fee (₦)
              </label>
              <input
                type="number"
                onChange={(e) =>
                  setData({ ...data, agency_fee: e.target.value })
                }
                value={data.agency_fee}
                placeholder="Agency Fee (₦)"
                className={general_input_styles}
              />
            </div>
          </div>
          <div className="flex w-full justify-between gap-[1.77vh] ">
            <div className={input_container_styles}>
              <label htmlFor="" className={label_styles}>
                Land and Agreement Fee (₦)
              </label>
              <input
                type="number"
                onChange={(e) =>
                  setData({ ...data, land_and_agreement_fee: e.target.value })
                }
                value={data.land_and_agreement_fee}
                placeholder="Land and Agreement Fee (₦)"
                className={general_input_styles}
              />
            </div>
            <div className={input_container_styles}>
              <label htmlFor="" className={label_styles}>
                Caution Fee (₦)
              </label>
              <input
                type="number"
                onChange={(e) =>
                  setData({ ...data, caution_fee: e.target.value })
                }
                value={data.caution_fee}
                placeholder="Caution Fee (₦)"
                className={general_input_styles}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormStepTwo;
