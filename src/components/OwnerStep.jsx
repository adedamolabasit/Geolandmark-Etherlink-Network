import React, { useState, useEffect, useRef } from "react";
import Step1 from "../assets/step1.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { STATE } from "../utils/stateConstants";
import { general_input_styles } from "../utils";
import { label_styles } from "../utils";
import { input_container_styles } from "../utils";
import Upload from "../assets/upload.svg";
import { useMedia } from "../contexts/mediaContex";
import MediaLoader from "./fileLoader";
import { Modal2 } from "../utils/arrayLists";
import { ZoningCategory } from "../json/zoningCategory";
import { AllowedLandUse } from "../json/zoningCategory";
import { ProhibitedLandUse } from "../json/zoningCategory";
import useClickOutsideCancel from "../hooks/clickOutsideHook";
import { uploadLangistryMedia } from "../utils/fileBase";
import { sendFileToIPFS } from "../utils/pinata";
import { getMediaRegistry } from "../utils/fileBase";

export const OwnerStep = ({ saveOwnerData, ownerCurrentState, nextStep }) => {
  const { cOf, uploadCof, surveyPlan, uploadSurveyPlan } = useMedia();

  const ownershipRef = useRef("");
  const [status, setStatus] = useState(STATE.IDLE);
  const [ownershipType, setOwnershipType] = useState("");

  const selectOwnershipType = (e) => {
    ownershipRef.current = e.target.value;
    setOwnershipType(e.target.value);
  };

  
  const step1 = async (values, _methods) => {
    setStatus(STATE.LOADING);
    const userObj = {
      parcelNumber: values.parcelNumber,
      area: values.area,
      ownershipType: ownershipType,
      address: values.address,
      value: values.value,
      landUse: values.ownershipType,
      legalDescription: values.legalDescription,
    };

    if (userObj) {
      console.log(userObj,"llll")
      saveOwnerData(userObj);
      nextStep();
    }
  };

  useEffect(() => {}, [ownerCurrentState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      parcelNumber: ownerCurrentState.parcelNumber || "",
      area: ownerCurrentState.area || "",
      ownershipType: ownerCurrentState.ownershipType || "",
      address: ownerCurrentState.address || "",
      value: ownerCurrentState.value || "",
      landUse: ownerCurrentState.landUse || "",
      legalDescription: ownerCurrentState.legalDescription || "",
    },
    validationSchema: Yup.object({
      parcelNumber: Yup.string().required("Plan number is required."),
      area: Yup.number().required("Area in (sqm)."),
      ownershipType: Yup.string().optional(),
      address: Yup.string().required("Address is required."),
      value: Yup.number().optional(),
      landUse: Yup.string().optional(),
      legalDescription: Yup.string().required("Address is required."),
    }),
    onSubmit: (values, methods) => {
      step1(values, methods);
    },
  });

  return (
    <div className="flex flex-col">
      <img src={Step1} alt="step1" className="w-full" />
      <div className="mt-[6.2037vh] text-zinc-400 text-xl font-bold leading-snug">
        Property Information.
      </div>
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        method="POST"
        onChange={formik.handleChange}
      >
        <div className="flex flex-col w-full mt-[5.4630vh] gap-[4.1667vh]">
          <div>
            <label
              htmlFor="parcelNumber"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Parcel Number (APN)
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              placeholder="Parcel Number"
              name="parcelNumber"
              value={formik.values.parcelNumber}
              className={general_input_styles}
            />
            {formik.touched.parcelNumber && formik.errors.parcelNumber && (
              <div className="inline-block text-red-600">
                {formik.errors.parcelNumber}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="area"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Area (sqm)
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              placeholder="Area (sqm)"
              name="area"
              value={formik.values.area}
              className={general_input_styles}
            />
            {formik.touched.area && formik.errors.area && (
              <div className="inline-block text-red-600">
                {formik.errors.area}
              </div>
            )}
          </div>

          <div>
            <div className={input_container_styles}>
              <label htmlFor="ownershipType" className={label_styles}>
                Ownership Type
              </label>
              <select
                id="ownershipType"
                onChange={selectOwnershipType}
                value={ownershipRef.current}
                placeholder="Enter Ownership Type"
                className={general_input_styles}
                required
              >
                <option value="ownership type">- Choose one - </option>
                <option value="individual">Individual</option>
                <option value="corporation">Corporation</option>
              </select>
            </div>
            {formik.touched.ownershipType && formik.errors.ownershipType && (
              <div className="inline-block text-red-600">
                {formik.errors.ownershipType}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Address
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Address"
              name="address"
              value={formik.values.address}
              className={general_input_styles}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="inline-block text-red-600">
                {formik.errors.address}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="value"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Estimated Value ($)
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              placeholder="Estimated value of your assets"
              name="value"
              value={formik.values.value}
              className={general_input_styles}
            />
            {formik.touched.value && formik.errors.value && (
              <div className="inline-block text-red-600">
                {formik.errors.value}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="landUse"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              LandUse
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="land Use"
              name="landUse"
              value={formik.values.landUse}
              className={general_input_styles}
            />
            {formik.touched.landUse && formik.errors.landUse && (
              <div className="inline-block text-red-600">
                {formik.errors.landUse}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="legalDescription"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Legal Description
            </label>
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Legal Description"
              name="legalDescription"
              value={formik.values.legalDescription}
              className={`${general_input_styles} h-[150px]`}
            ></textarea>

            {formik.touched.legalDescription &&
              formik.errors.legalDescription && (
                <div className="inline-block text-red-600">
                  {formik.errors.legalDescription}
                </div>
              )}
          </div>
          {/* <div>
            <div className="flex flex-col gap-2 cursor-pointer">
              <div className="text-zinc-400 text-base font-semibold leading-[0.9vw]">
                Upload C of O
              </div>
              <div>
                <label htmlFor="fileInput1" className="cursor-pointer">
                  <div className="flex flex-col gap-2 justify-center items-center w-full h-[18.8889vh] bg-zinc-900 rounded-[10px] border border-zinc-400 border-dashed">
                    <img src={Upload} alt="upload" className="w-[2.3vw]" />
                    <div className="text-cyan-600 text-lg font-semibold underline leading-tight">
                      Select a File to Upload
                    </div>
                    <div className="text-zinc-400 text-base font-normal leading-[0.9vw]">
                      Or Drag and Drop it here
                    </div>
                  </div>
                </label>
                <input
                  id="fileInput1"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={uploadCof}
                />
              </div>
            </div>

            <div>
              <MediaLoader media={cOf} />
            </div>
          </div> */}

          {/* <div>
            <div className="flex flex-col gap-2 cursor-pointer">
              <div className="text-zinc-400 text-base font-semibold leading-[0.9vw]">
                Upload Survey Plan
              </div>
              <div>
                <label htmlFor="fileInput2" className="cursor-pointer">
                  <div className="flex flex-col gap-2 justify-center items-center w-full h-[18.8889vh] bg-zinc-900 rounded-[10px] border border-zinc-400 border-dashed">
                    <img src={Upload} alt="upload" className="w-[2.3vw]" />
                    <div className="text-cyan-600 text-lg font-semibold underline leading-tight">
                      Select a File to Upload
                    </div>
                    <div className="text-zinc-400 text-base font-normal leading-[0.9vw]">
                      Or Drag and Drop it here
                    </div>
                  </div>
                </label>
                <input
                  id="fileInput2"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={uploadSurveyPlan}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
            </div>
            <div>
              <MediaLoader media={surveyPlan} />
            </div>
          </div> */}

          {/* <div className="w-full flex flex-wrap justify-between gap-2 ">
            <div className="w-full flex flex-wrap justify-between gap-2  z-0">
              <div className="relative">
                <div className="w-[14vw]">
                  <label
                    htmlFor="zoningCategory"
                    className="mb-1 text-base font-bold text-[#B9B9B9]"
                  >
                    Zoning Category
                  </label>
                  <div
                    onClick={() => {
                      handleZoneCat();
                    }}
                    className={`${general_input_styles} cursor-pointer flex justify-start items-center w-[15vw] truncate overflow-x-auto`}
                  >
                    {zoneCategory && zoneCategory.length > 0
                      ? zoneCategory.slice().reverse().join(", ")
                      : "Zoning Category"}
                  </div>
                </div>
                {isZoneCat && (
                  <Modal2
                    arrayState={zoneCategory}
                    setArrayState={setZoneCategory}
                    listedData={ZoningCategory}
                  />
                )}
              </div>

              <div className="w-[14vw]">
                <label
                  htmlFor="lotSize"
                  className="mb-1 text-base font-bold text-[#B9B9B9]"
                >
                  Minimum Plot Size
                </label>
                <input
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Minimum Lot Size"
                  name="lotSize"
                  value={formik.values.lotSize}
                  className={general_input_styles}
                />
                {formik.touched.lotSize && formik.errors.lotSize && (
                  <div className="inline-block text-red-600">
                    {formik.errors.lotSize}
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="w-[14vw]">
                  <label
                    htmlFor="allowedLandUse"
                    className="mb-1 text-base font-bold text-[#B9B9B9]"
                  >
                    Allowed Land Use
                  </label>
                  <div
                    onClick={() => {
                      handleLandUse();
                    }}
                    className={`${general_input_styles} cursor-pointer flex justify-start items-center w-[15vw] truncate overflow-x-auto`}
                  >
                    {allowedLandUse && allowedLandUse.length > 0
                      ? allowedLandUse.slice().reverse().join(", ")
                      : "Allowed Land Use"}
                  </div>
                </div>
                {isLandUse && (
                  <Modal2
                    arrayState={allowedLandUse}
                    setArrayState={setAllowedLandUse}
                    listedData={AllowedLandUse}
                  />
                )}
              </div>

              <div className="relative">
                <div className="w-[14vw]">
                  <label
                    htmlFor="prohibitedLandUse"
                    className="mb-1 text-base font-bold text-[#B9B9B9]"
                  >
                    Prohibited Land Use
                  </label>
                  <div
                    onClick={() => {
                      handleProbUse();
                    }}
                    className={`${general_input_styles} cursor-pointer flex justify-start items-center w-[15vw] truncate overflow-x-auto`}
                  >
                    {prohibitedLandUse && prohibitedLandUse.length > 0
                      ? prohibitedLandUse.slice().reverse().join(", ")
                      : "Prohibited Land Use"}
                  </div>
                </div>
                {isProbUse && (
                  <Modal2
                    arrayState={prohibitedLandUse}
                    setArrayState={setProhibitedLandUse}
                    listedData={ProhibitedLandUse}
                  />
                )}
              </div>
            </div>
          </div> */}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className=" w-[8.2292vw] h-[4.3519vh]  bg-cyan-600 bg-opacity-40 rounded-[10px]"
            >
              Proceed
            </button>
          </div>
        </div>
      </form>
      <div
        className={`relative flex flex-col justify-center items-center gap-2 
          `}
      ></div>
    </div>
  );
};
