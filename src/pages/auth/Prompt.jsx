import React, { useState, useEffect } from "react";
import Index from "./Index";
import vec from "../../assets/vec.svg";
import firstnameIcon from "../../assets/firstnameIcon.svg";
import Messages from "../../assets/messages1.svg";
import Call from "../../assets/callcalling.svg";
import Lock from "../../assets/lock.svg";
import Surcon from "../../assets/surcon.svg";
import Company from "../../assets/company.svg";
import Experience from "../../assets/experience.svg";
import Address from "../../assets/adress.svg";
import Contact from "../../assets/contact.svg";
import Specialized from "../../assets/specialized.svg";
import Agree from "../../assets/agree.svg";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { STATE } from "../../utils/stateConstants";
import { containsSpecialChars } from "../../utils";
import { PasswordCheck } from "../../utils/passwordCheck";
import { RadioOne, RadioTwo } from "../../utils/promptButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { surveyorBranches } from "../../json/specialization";
import { signup } from "../../services/authService";
import { Modal } from "../../utils/arrayLists";
import { useAuth } from "../../contexts/authContext";

function Prompt() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const path = location.pathname;
  const [status, setStatus] = useState(STATE.IDLE);
  const [canSubmit, setCanSubmit] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [isSpec, setisSpec] = useState(false);
  const [isSurveyor, setIsSurveyor] = useState(false);
  const handleSelectSpec = (spec) => {
    setSpecializations(spec);
  };
  const handleSpec = () => {
    setisSpec((prevState) => !prevState);
  };
  const isEmptySpecializations = specializations.length === 0;
  const handleSignUp = async (values, methods) => {
    try {
      setStatus(STATE.LOADING);
      const userObj = {
        surconNumber: formik.values.surcon_no || "",
        businessName: formik.values.company || "",
        experience: formik.values.experience || "",
        address: formik.values.address || "",
        businessContact: formik.values.contact || "",
        specialization: specializations || "",
        role: "surveyor",
        ...userData,
      };
      const response = await signup(userObj);
      setStatus(STATE.SUCCESS);
      navigate("/login");
      toast.success(response.data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An Error has occured. Please try again."
      );
      setStatus(STATE.ERROR);
    }
  };
  const handleSurveyor = () => {
    setIsSurveyor((prevState) => !prevState);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      surcon_no: "",
      company: "",
      experience: "",
      address: "",
      contact: "",
    },
    validationSchema: Yup.object({
      surcon_no: Yup.string().required("Surcon Number is required."),
      company: Yup.string().min(3, "Minimum of 3.").optional(),
      experience: Yup.string()
        .min(1, "Minimum of 1.")
        .max(4, "maximum of 4.")
        .optional(),
      address: Yup.string().min(3, "Minimum of 6.").optional(),
    }),
    onSubmit: (values, methods) => {
      handleSignUp(values, methods);
    },
  });
  const handleSingleSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = {
        ...userData,
        role: "agent",
      };
      const response = await signup(user);
      if (response) {
        setStatus(STATE.SUCCESS);
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An Error has occured. Please try again."
      );
      setStatus(STATE.ERROR);
    }
  };
  document.title = "Geolandmark | Prompt";

  return (
    <Index path={path}>
      <div className=" flex flex-col text-white justify-center items-center h-full">
        <h2 className="text-2xl font-black">Finish Creating Your Account!</h2>
        <img src={vec} alt="" className="mt-1 w-[10.52vw] h-[1.94vh] " />
        <h6
          className={`${
            isSurveyor ? "mt-2" : "mt-[10vh]"
          } text-zinc-400 text-base leading-snug`}
        >
          Are you a Registered Surveyor?
        </h6>
        <div className="flex gap-12 mt-2">
          <button className="flex gap-4 items-center " onClick={handleSurveyor}>
            <p className="text-zinc-400 text-sm font-medium leading-snug">
              Yes
            </p>
            {isSurveyor ? <RadioOne /> : <RadioTwo />}
          </button>
          <button className="flex gap-4 items-center" onClick={handleSurveyor}>
            <p className="text-zinc-400 text-lg font-medium leading-snug">No</p>
            {!isSurveyor ? <RadioOne /> : <RadioTwo />}
          </button>
        </div>
        {!isSurveyor && (
          <div className="flex flex-col items-center gap-8 ">
            <div className="mt-12 w-[38.0208vw] text-center text-zinc-400 text-lg font-medium leading-snug">
              Creating an account with GeoLandmark allows you to unlock a range
              of benefits and services. Get started today and experience the
              convenience and efficiency of our platform for all your
              land-related needs.
            </div>
            <form onSubmit={handleSingleSignUp}>
              <button
                type="submit"
                className={`w-[15.89vw] h-[5.37vh] text-xs mt-2  
                   bg-cyan-600 rounded-lg pt-[6.543vwh] cursor-pointer`}
              >
                {status == STATE.LOADING ? "Creating..." : "Create an Account"}
              </button>
            </form>
          </div>
        )}
        {isSurveyor && (
          <form
            onSubmit={formik.handleSubmit}
            onChange={formik.handleChange}
            className="form flex flex-col  items-center  gap-2  "
          >
            <div className="form flex flex-col  items-center  mt-[3.02vh] h-[41vh] pb-6 overflow-y-auto w-[65vw] ">
              <div className=" flex flex-wrap  justify-between items-center w-[63.914vw] gap-4">
                <div className="flex flex-col w-[28.176vw]">
                  <label
                    htmlFor="surcon_no"
                    className="mb-1 text-base  font-bold text-[#B9B9B9]"
                  >
                    REG No.
                  </label>
                  <div
                    className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh] 
                ${
                  !formik.errors?.surcon_no && formik.touched?.surcon_no
                    ? "focus:border-cyan-600"
                    : ""
                }
                  ${
                    formik.errors?.surcon_no && formik.touched?.surcon_no
                      ? "border-[#C63737] border-[1.5px]"
                      : "border-[rgba(18,18,18,0.3)]"
                  }`}
                  >
                    <img src={Surcon} alt="" className="w-[1.25vw]" />
                    <input
                      id="surcon_no"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder=""
                      type="text"
                      name="surcon_no"
                      className={`py-2 rounded-lg bg-zinc-300 w-[25vw] text-black
              `}
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div
                    className={`${
                      formik.touched.surcon_no && formik.errors.surcon_no
                        ? "inline-block text-red-600"
                        : "hidden"
                    } app_form-error`}
                  >
                    {formik.touched.surcon_no &&
                      formik.errors.surcon_no &&
                      formik.errors.surcon_no}
                  </div>
                </div>

                <div className="flex flex-col w-[28.176vw]">
                  <label
                    htmlFor="company"
                    className="mb-1 text-base  font-bold text-[#B9B9B9]"
                  >
                    Business Name
                  </label>
                  <div
                    className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300  h-[5.91vh] 
              ${
                !formik.errors?.company && formik.touched?.company
                  ? "focus:border-cyan-600"
                  : ""
              }
                  ${
                    formik.errors?.company && formik.touched?.company
                      ? "border-[#C63737] border-[1.5px]"
                      : "border-[rgba(18,18,18,0.3)]"
                  }`}
                  >
                    <img src={Company} alt="" className="w-[1.25vw]" />
                    <input
                      id="company"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder=""
                      type="text"
                      name="company"
                      className="py-2 rounded-lg bg-zinc-300 w-[25vw] text-black"
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div
                    className={`${
                      formik.touched.company && formik.errors.company
                        ? "inline-block text-red-600"
                        : "hidden"
                    } app_form-error`}
                  >
                    {formik.touched.company &&
                      formik.errors.company &&
                      formik.errors.company}
                  </div>
                </div>

                <div className="flex flex-col w-[28.176vw]">
                  <label
                    htmlFor="experience"
                    className="mb-1 text-base  font-bold text-[#B9B9B9]"
                  >
                    Years of Experience
                  </label>
                  <div
                    className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh] 
              ${
                !formik.errors?.experience && formik.touched?.experience
                  ? "focus:border-blue"
                  : ""
              }
              ${
                formik.errors?.experience && formik.touched?.experience
                  ? "border-[#C63737] border-[1.5px]"
                  : "border-[rgba(18,18,18,0.3)]"
              } `}
                  >
                    <img src={Experience} alt="" className="w-[1.25vw]" />
                    <input
                      id="experience"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder=""
                      type="text"
                      name="experience"
                      className="py-2 rounded-lg bg-zinc-300 w-[25vw] text-black"
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div
                    className={`${
                      formik.touched.experience && formik.errors.experience
                        ? "inline-block text-red-600"
                        : "hidden"
                    } app_form-error`}
                  >
                    {formik.touched.experience &&
                      formik.errors.experience &&
                      formik.errors.experience}
                  </div>
                </div>

                <div
                  className={`flex flex-col w-[28.176vw]
               `}
                >
                  <label
                    htmlFor="address"
                    className="mb-1 text-base  font-bold text-[#B9B9B9]"
                  >
                    Physical Address.
                  </label>
                  <div
                    className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300  h-[5.91vh] 
                 ${
                   !formik.errors?.address && formik.touched?.address
                     ? "focus:border-blue"
                     : ""
                 }
                ${
                  formik.errors?.address && formik.touched?.address
                    ? "border-[#C63737] border-[1.5px]"
                    : "border-[rgba(18,18,18,0.3)]"
                } `}
                  >
                    <img src={Address} alt="" className="w-[1.25vw]" />
                    <input
                      id="address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder=""
                      type="text"
                      name="address"
                      className="py-2 rounded-lg bg-zinc-300 w-[25vw] text-black"
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div
                    className={`${
                      formik.touched.address && formik.errors.address
                        ? "inline-block text-red-600"
                        : "hidden"
                    } app_form-error`}
                  >
                    {formik.touched.address &&
                      formik.errors.address &&
                      formik.errors.address}
                  </div>
                </div>

                <div className="relative flex flex-col w-[28.176vw]">
                  <label
                    htmlFor="contact"
                    className="mb-1 text-base  font-bold text-[#B9B9B9]"
                  >
                    Business Contact.
                  </label>
                  <div
                    className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh] 
                  ${
                    !formik.errors?.contact && formik.touched?.contact
                      ? "focus:border-blue"
                      : ""
                  }
                  ${
                    formik.errors?.contact && formik.touched?.contact
                      ? "border-[#C63737] border-[1.5px]"
                      : "border-[rgba(18,18,18,0.3)]"
                  } `}
                  >
                    <div className="flex items-center gap-2">
                      <img src={Contact} alt="" className="w-[1.5vw]" />
                      <h6 className="text-black">(234)</h6>
                    </div>
                    <input
                      required
                      id="contact"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder=""
                      type="text"
                      name="contact"
                      value={formik.values.contact}
                      className="py-2 rounded-lg bg-zinc-300 w-[23vw] text-black"
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div
                    className={`${
                      formik.touched.contact && formik.errors.contact
                        ? "inline-block text-red-600"
                        : "hidden"
                    } app_form-error`}
                  >
                    {formik.touched.contact &&
                      formik.errors.contact &&
                      formik.errors.contact}
                  </div>
                </div>

                <div className="relative flex flex-col  w-[28.176vw] ">
                  <label
                    htmlFor="contact"
                    className={`mb-1 text-base  font-bold text-[#B9B9B9]
                    ${
                      formik.errors?.specializations &&
                      formik.touched.specializations
                        ? "text-red-600"
                        : ""
                    }
                    `}
                  >
                    Select Area(s) of Specialization
                  </label>
                  <div
                    className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-full `}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        handleSpec();
                      }}
                      className="self-end w-[28.176vw] h-[5.91vh] bg-violet-500 rounded-[10px]"
                    >
                      <div className="flex justify-start ml-4 gap-4">
                        <img src={Specialized} alt="" className="w-[1.25vw]" />
                        {isEmptySpecializations ? (
                          <p> Area(s) of Specialization</p>
                        ) : (
                          <p> Edit Choice(s)</p>
                        )}
                      </div>
                    </button>
                  </div>
                  <div
                    className={`${
                      formik.touched.specializations &&
                      formik.errors.specializations
                        ? "inline-block text-red-600"
                        : "hidden"
                    } app_form-error`}
                  >
                    {formik.touched.specializations &&
                      formik.errors.specializations &&
                      formik.errors.specializations}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              {/* <div className="flex gap-4 items-center">
                <img src={Agree} alt="" className="w-[1.25vw] " />
                <p className="text-white text-[13px] font-normal leading-none">
                  I agree to the terms and conditions as set out by the user
                  agreement.
                </p>
              </div> */}
              <button
                type="submit"
                className={`w-[15.89vw] h-[5.37vh] text-xs mt-2  ${
                  formik.values.surcon_no &&
                  formik.values.company &&
                  formik.values.experience &&
                  formik.values.address &&
                  formik.values.contact &&
                  !isEmptySpecializations
                    ? ""
                    : "bg-opacity-40 cursor-not-allowed"
                }   bg-cyan-600 rounded-lg pt-[6.543vwh]`}
              >
                {status == STATE.LOADING ? "Creating..." : "Create an Account"}
              </button>
              <Link to="/login">
                <span className="text-zinc-400 text-base font-medium leading-snug">
                  Already have an account?
                </span>
                <span className="text-cyan-600 text-bae font-medium leading-snug">
                  {` `}
                  Log In
                </span>
              </Link>
            </div>
          </form>
        )}
        <div
          className={`relative flex flex-col justify-center items-center gap-2 
          ${!isSurveyor ? "mt-0" : "mt-0"}
          `}
        ></div>

        {isSurveyor && isSpec ? (
          <Modal
            handleSelection={handleSpec}
            arrayState={specializations}
            setArrayState={setSpecializations}
            listedData={surveyorBranches}
          />
        ) : (
          ""
        )}
      </div>
    </Index>
  );
}

export default Prompt;
