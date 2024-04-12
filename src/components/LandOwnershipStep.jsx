import React, { useState, useEffect } from "react"
import Step3 from "../assets/step3.svg"
import { useNavigate } from "react-router-dom"
import { STATE } from "../utils/stateConstants"
import { registerLand } from "../services/landRegistry"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"
import { RadioOne } from "../utils/promptButton"
import { RadioTwo } from "../utils/promptButton"
import Upload from "../assets/upload.svg"
import { general_input_styles } from "../utils"
import { label_styles } from "../utils"
import { input_container_styles } from "../utils"
import { useMedia } from "../contexts/mediaContex"
import MediaLoader from "./fileLoader"
import { uploadLangistryMedia } from "../utils/fileBase"
import { uploadImages } from "../services/landRegistry"

export const LandOwnerShipStep = ({
  prevStep,
  saveLandOwnershipData,
  ownershipCurrentState,
  ownerCurrentState,
  landParcelCurrentState,
}) => {
  const navigate = useNavigate();
  const {
    uploadPropertyVisualization,
    propertyVisualization,
    cOf,
    surveyPlan,
    cOfMulter,
    surveyPlanMulter,
    imageMulter,
  } = useMedia();
  const [isNegotiable, setIsNegotiable] = useState(true);

  const [status, setStatus] = useState(STATE.IDLE);

  const negotiation = () => {
    setIsNegotiable((prevState) => !prevState);
  };

  const step3 = async (values, methods) => {
    setStatus(STATE.LOADING);
    console.log(values, "hey");
    const userObj = {
      title: formik.values.title,
      fullName: formik.values.fullName,
      mail: formik.values.email,
      phoneNum: formik.values.phoneContact,
      description: formik.values.propertyDesc,
      price: formik.values.propertyPrice,
      isNegotiable: isNegotiable,
      images: propertyVisualization,
      occupation: formik.values.occupation,
      birthDate: formik.values.birthDate,
    };

 
      saveLandOwnershipData(userObj);

    const formData = new FormData();

    // formData.append("cOf", cOfMulter);
    // formData.append("surveyPlan", surveyPlanMulter);
    formData.append("images", imageMulter);
    // formData.append("title", ownershipCurrentState.title);
    formData.append("planId", ownerCurrentState.planId);
    console.log(userObj, "plds");
    console.log(imageMulter, "imageMulter");

    // formData.append("data", allData);
    const allData = {
      owner: { ...ownerCurrentState },
      landParcel: { ...landParcelCurrentState },
      ownership: {  title: formik.values.title,
        fullName: formik.values.fullName,
        mail: formik.values.email,
        phoneNum: formik.values.phoneContact,
        description: formik.values.propertyDesc,
        price: formik.values.propertyPrice,
        isNegotiable: isNegotiable,
        images: propertyVisualization,
        occupation: formik.values.occupation,
        birthDate: formik.values.birthDate,},
    };
    console.log(allData,ownerCurrentState,"all...")

    try {
      // const response = await registerLand(allData);
      // await uploadImages(formData);

      // await uploadLangistryMedia(filebaseData);
      setStatus(STATE.SUCCESS);
      navigate('/marketplace')
      toast.success(response.data.message);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "An Error has occured. Please try again."
      );
      setStatus(STATE.ERROR);
    }
  };
  useEffect(() => {}, [ownershipCurrentState]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: ownershipCurrentState.title || "",
      fullName: ownershipCurrentState.fullName || "",
      email: ownershipCurrentState.mail || "",
      phoneContact: ownershipCurrentState.phoneNum || "",
      propertyDesc: ownershipCurrentState.description || "",
      propertyPrice: ownershipCurrentState.price || "",
      occupation: ownershipCurrentState.occupation || "",
      birthDate: ownershipCurrentState.birthDate || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      fullName: Yup.string().required("Full Name is required."),
      email: Yup.string().required("ownershipType is required."),
      phoneContact: Yup.string().required("Phone contact is required."),
      propertyDesc: Yup.string().required(
        "Give more detailed descri[ption about the property]."
      ),
      propertyPrice: Yup.string().required("Enter the price."),
      occupation: Yup.string().required("Your occupation."),
      birthDate: Yup.string().required("Birtdate required"),
    }),
    onSubmit: (values, methods) => {
      step3(values, methods);
    },
  });

  return (
    <div className="flex flex-col">
      <img src={Step3} alt="step3" className="w-full" />

      <div className="mt-[6.2037vh] text-zinc-400 text-xl font-bold leading-snug text-center">
        Contact Information
      </div>
      <form
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
        encType="multipart/form-data"
        method="POST"
      >
        <div className="flex flex-col w-full mt-8 gap-[2.1667vh]">
          <div className={`w-[5vw] ${input_container_styles}`}>
            <label htmlFor="title" className={label_styles}>
              Title
            </label>
            <select
              id="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="title"
              className={general_input_styles}
              name="title"
            >
              <option value="nil">- Choose - </option>
              <option value="Commercial">Mr</option>
              <option value="Mixed">Mrs</option>
              <option value="Residential">Miss</option>
            </select>
            {/* Display error message for landUse */}
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-600  w-[15vw]">
                {formik.errors.title}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 text-base  font-bold text-[#B9B9B9]"
            >
              Full Name
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=" Full Name"
              name="fullName"
              value={formik.values.fullName}
              className={general_input_styles}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-600">{formik.errors.fullName}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 text-base  font-bold text-[#B9B9B9]"
            >
              E-mail Address
            </label>
            <input
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              name="email"
              value={formik.values.email}
              className={general_input_styles}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneContact"
              className="mb-1 text-base  font-bold text-[#B9B9B9]"
            >
              Phone No.
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Phone No."
              name="phoneContact"
              value={formik.values.phoneContact}
              className={general_input_styles}
            />
            {formik.touched.phoneContact && formik.errors.phoneContact && (
              <div className="text-red-600">{formik.errors.phoneContact}</div>
            )}
          </div>
        </div>
        <div className="mt-8 text-zinc-400 text-xl font-bold leading-snug text-center">
          Elaborate Property Details
        </div>
        <div className="flex flex-col w-full mt-4 gap-[4.1667vh]">
          <div>
            <label
              htmlFor="propertyPrice"
              className="mb-1 text-base  font-bold text-[#B9B9B9]"
            >
              Value (₦)
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=" Property price"
              name="propertyPrice"
              value={formik.values.propertyPrice}
              className={general_input_styles}
            />
            {formik.touched.propertyPrice && formik.errors.propertyPrice && (
              <div className="text-red-600">{formik.errors.propertyPrice}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="propertyDesc"
              className="mb-1 text-base  font-bold text-[#B9B9B9]"
            >
              Property Description
            </label>
            <textarea
              type="text"
              placeholder=" Property Description"
              name="propertyDesc"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.propertyDesc}
              className={`w-full h-[16.2037vh] rounded-[10px] text-black`}
            ></textarea>
            {formik.touched.propertyDesc && formik.errors.propertyDesc && (
              <div className="text-red-600">{formik.errors.propertyDesc}</div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex gap-4 items-center">
            <div className="text-zinc-400 text-base font-semibold leading-[17.12px]">
              Negotiable?
            </div>
            <div
              onClick={negotiation}
              className="flex items-center gap-2 cursor-pointer"
            >
              {isNegotiable ? <RadioOne /> : <RadioTwo />}
              <p>Yes</p>
            </div>
            <div
              onClick={negotiation}
              className="flex items-center gap-2 cursor-pointer"
            >
              {!isNegotiable ? <RadioOne /> : <RadioTwo />}
              <p>No</p>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex flex-col gap-2 cursor-pointer">
            <div className="text-zinc-400 text-base font-semibold leading-[0.9vw]">
              Upload imgaes
            </div>
            <div>
              <label htmlFor="fileInput3" className="cursor-pointer">
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
                id="fileInput3"
                type="file"
                name="images"
                multiple
                style={{ display: "none" }}
                onChange={uploadPropertyVisualization}
              />
            </div>
          </div>
          <MediaLoader media={propertyVisualization} />
        </div>

        <div className="w-full flex mt-6 flex-wrap justify-between gap-2 ">
          <div className="w-[14vw]">
            <label
              htmlFor="occupation"
              className="mb-1 text-base  font-bold text-[#B9B9B9]"
            >
              Occupation
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=" Occupation"
              name="occupation"
              value={formik.values.occupation}
              className={general_input_styles}
            />
            <div
              className={`${
                formik.touched.occupation && formik.errors.occupation
                  ? "inline-block text-red-600"
                  : "hidden"
              } `}
            >
              {formik.touched.occupation &&
                formik.errors.occupation &&
                formik.errors.occupation}
            </div>
          </div>
          <div className="w-[14vw]">
            <label
              htmlFor="BirthDate"
              className="mb-1 text-base  font-bold text-[#B9B9B9]"
            >
              Birth Date
            </label>
            <input
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="birthDate"
              placeholder=" Title"
              value={formik.values.birthDate}
              className={general_input_styles}
            />
            <div
              className={`${
                formik.touched.birthDate && formik.errors.birthDate
                  ? "inline-block text-red-600"
                  : "hidden"
              } `}
            >
              {formik.touched.birthDate &&
                formik.errors.birthDate &&
                formik.errors.birthDate}
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-6 py-12">
          <button
            onClick={prevStep}
            className=" w-[8.2292vw] h-[4.3519vh] border  border-cyan-600 bg-opacity-40 rounded-[10px]"
          >
            Back
          </button>
          <button
            type="submit"
            className=" w-[8.2292vw] h-[4.3519vh]  bg-cyan-600 bg-opacity-40 rounded-[10px]"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};
