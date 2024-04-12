import React, { useState, useEffect } from "react";
import Index from "./Index";
import vec from "../../assets/vec.svg";
import firstnameIcon from "../../assets/firstnameIcon.svg";
import Messages from "../../assets/messages1.svg";
import Call from "../../assets/callcalling.svg";
import Lock from "../../assets/lock.svg";
import EyeHide from "../../assets/eyeslash.svg";
import EyeUnhide from "../../assets/eye.svg";

import { STATE } from "../../utils/stateConstants";
import { containsSpecialChars } from "../../utils";
import { PasswordCheck } from "../../utils/passwordCheck";

import { useNavigate, useLocation, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../contexts/authContext";

function AppSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [allPassed, setAllPassed] = useState(false);
  const [status, setStatus] = useState(STATE.IDLE);
  const navigate = useNavigate();
  const location = useLocation();
  const {setUserData,userData} = useAuth()
  const path = location.pathname;
  const handleProceed = async () => {
    setStatus(STATE.LOADING);
    const userObj = {
      firstName: formik.values.first_name,
      lastName: formik.values.last_name,
      email: formik.values.email,
      phone: formik.values.phone,
      password: formik.values.password,
    };
    setUserData(userObj)
    navigate("/prompt");
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: userData?.firstName || "",
      last_name: userData?.lastName || "",
      phone: userData?.phone ||  "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      password: userData?.password || "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address.")
        .required("Email is required."),
      first_name: Yup.string()
        .min(3, "Minimum of 3.")
        .required("Firstname is required."),
      last_name: Yup.string()
        .min(3, "Minimum of 3.")
        .required("Lastname is required."),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number is not valid")
        .required("Phone number is required"),
    }),
    onSubmit: () => {
      handleProceed();
    },
  });

  useEffect(() => {
    setAllPassed(false);
    formik.values.password &&
      /[a-z]/.test(formik.values.password) &&
      /[A-Z]/.test(formik.values.password) &&
      /[0-9]/.test(formik.values.password) &&
      containsSpecialChars(formik.values.password) &&
      formik.values.password.length > 7 &&
      setAllPassed(true);
  }, [formik?.values?.password]);

  document.title = "Geolandmark | Sign Up";

  return (
    <Index path={path}>
      <div className="flex flex-col text-white justify-center items-center">
        <h2 className="text-2xl font-black">Create An Account!</h2>
        <img src={vec} alt="" className="mt-2 w-[10.52vw] h-[1.94vh] " />
        <p className="text-[#B9B9B9] px-[17.676vw text-center font-bold mt-2 leading-tight text-sm w-[55vw]">
          Creating an account with GeoLandmark allows you to unlock a range of
          benefits and <br></br> services. Get started today and experience the
          convenience and efficiency of our <br></br> platform for all your
          land-related needs.
        </p>

        {/* <div className="h-[45vh] w-full py-3"> */}
        <form
          onSubmit={formik.handleSubmit}
          onChange={formik.handleChange}
          className="relative flex flex-col  items-center w-[55.914vw] h-[55vh] "
        >
          <div className="form flex flex-col  items-center  mt-[3.02vh] h-[45vh] pb-6 overflow-y-auto w-[65vw] ">
            <div className=" flex flex-wrap  justify-between w-[63.914vw] gap-4">
              <div className="flex flex-col w-[28.176vw]">
                <label
                  htmlFor="first_name"
                  className="mb-1 text-base  font-bold text-[#B9B9B9]"
                >
                  First Name
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh]
                  ${
                    !formik.errors?.first_name && formik.touched?.first_name
                      ? "focus:border-cyan-600"
                      : ""
                  }
                    ${
                      formik.errors?.first_name && formik.touched?.first_name
                        ? "border-[#C63737] border-[1.5px]"
                        : "border-[rgba(18,18,18,0.3)]"
                    }`}
                >
                  <img src={firstnameIcon} alt="" className="w-[1.25vw] " />
                  <input
                    id="first_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=""
                    type="text"
                    name="first_name"
                    value={formik.values.first_name}
                    className={`rounded-lg bg-zinc-300 w-[25vw] text-black
                `}
                    style={{ outline: "none" }}
                  />
                </div>
                <div
                  className={`${
                    formik.touched.first_name && formik.errors.first_name
                      ? "inline-block text-red-600"
                      : "hidden"
                  } `}
                >
                  {formik.touched.first_name &&
                    formik.errors.first_name &&
                    formik.errors.first_name}
                </div>
              </div>

              <div className="flex flex-col w-[28.176vw]">
                <label
                  htmlFor="last_name"
                  className="mb-1 text-lg  font-bold text-[#B9B9B9]"
                >
                  Last Name
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh] 
                ${
                  !formik.errors?.last_name && formik.touched?.last_name
                    ? "focus:border-cyan-600"
                    : ""
                }
                    ${
                      formik.errors?.last_name && formik.touched?.last_name
                        ? "border-[#C63737] border-[1.5px]"
                        : "border-[rgba(18,18,18,0.3)]"
                    }`}
                >
                  <img src={firstnameIcon} alt="" className="w-[1.25vw] " />
                  <input
                    id="last_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=""
                    type="text"
                    name="last_name"
                    value={formik.values.last_name}
                    className="rounded-lg bg-zinc-300 w-[25vw] text-black"
                    style={{ outline: "none" }}
                  />
                </div>
                <div
                  className={`${
                    formik.touched.last_name && formik.errors.last_name
                      ? "inline-block text-red-600"
                      : "hidden"
                  } app_form-error`}
                >
                  {formik.touched.last_name &&
                    formik.errors.last_name &&
                    formik.errors.last_name}
                </div>
              </div>

              <div className="flex flex-col w-[28.176vw]">
                <label
                  htmlFor="email"
                  className="mb-1 text-lg  font-bold text-[#B9B9B9]"
                >
                  E-mail Address
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh]
                ${
                  !formik.errors?.email && formik.touched?.email
                    ? "focus:border-blue"
                    : ""
                }
                ${
                  formik.errors?.email && formik.touched?.email
                    ? "border-[#C63737] border-[1.5px]"
                    : "border-[rgba(18,18,18,0.3)]"
                } `}
                >
                  <img src={Messages} alt="" className="w-[1.25vw] " />
                  <input
                    id="email"
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);
                      if (
                        formik.errors.email?.props?.text ===
                        "An account already exist with this email. Please use a different email."
                      ) {
                        formik.setFieldError("email", "");
                      }
                    }}
                    onBlur={formik.handleBlur}
                    placeholder=""
                    type="email"
                    name="email"
                    value={formik.values.email}
                    className="rounded-lg bg-zinc-300 w-[25vw] text-black"
                    style={{ outline: "none" }}
                  />
                </div>
                <div
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "inline-block text-red-600"
                      : "hidden"
                  } app_form-error`}
                >
                  {formik.touched.email &&
                    formik.errors.email &&
                    formik.errors.email}
                </div>
              </div>

              <div
                className={`flex flex-col w-[28.176vw]              
               `}
              >
                <label
                  htmlFor="phone"
                  className="mb-1 text-lg  font-bold text-[#B9B9B9]"
                >
                  Phone No.
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh] 
                   ${
                     !formik.errors?.phone && formik.touched?.phone
                       ? "focus:border-blue"
                       : ""
                   }
                  ${
                    formik.errors?.phone && formik.touched?.phone
                      ? "border-[#C63737] border-[1.5px]"
                      : "border-[rgba(18,18,18,0.3)]"
                  } `}
                >
                  <div className="flex items-center gap-2">
                    <img src={Call} alt="" className="w-[1.5vw] " />
                    <h6 className="text-black">(234)</h6>
                  </div>

                  <input
                    id="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=""
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    className="rounded-lg bg-zinc-300 w-[23vw] py-2 text-black"
                    style={{ outline: "none" }}
                  />
                </div>
                <div
                  className={`${
                    formik.touched.phone && formik.errors.phone
                      ? "inline-block text-red-600"
                      : "hidden"
                  } app_form-error`}
                >
                  {formik.touched.phone &&
                    formik.errors.phone &&
                    formik.errors.phone}
                </div>
              </div>

              <div className="relative flex flex-col w-[28.176vw]">
                <label
                  htmlFor="password"
                  className="mb-1 text-lg  font-bold text-[#B9B9B9]"
                >
                  Password.
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh]
                    ${
                      allPassed && formik.touched?.password
                        ? "focus:border-blue"
                        : ""
                    }
                    ${
                      !allPassed && formik.touched?.password
                        ? "border-[#C63737] border-[1.5px]"
                        : "border-[rgba(18,18,18,0.3)]"
                    }`}
                >
                  <img src={Lock} alt="" className="w-[1.25vw] " />
                  <input
                    required
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=""
                    value={formik.values.password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="rounded-lg bg-zinc-300 w-[23vw] text-black"
                    style={{ outline: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? EyeHide : EyeUnhide}
                      alt=""
                      className="w-[1.65vw]"
                    />
                  </button>
                </div>
                {formik.touched.password &&
                  formik.values.password.length > 0 &&
                  !allPassed && (
                    <PasswordCheck password={formik.values.password} />
                  )}
              </div>

              <div className="flex flex-col w-[28.176vw]">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 text-lg  font-bold text-[#B9B9B9]"
                >
                  Confirm Password.
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh] ${
                    !formik.values.confirmPassword &&
                    formik.touched.confirmPassword
                      ? "border border-red-600"
                      : formik.values.confirmPassword &&
                        formik.values.password === formik.values.confirmPassword
                      ? "border border-cyan-600"
                      : "border border-red-600"
                  }`}
                >
                  <img src={Lock} alt="" className="w-[1.25vw] " />
                  <input
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=""
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="rounded-lg bg-zinc-300 w-[23vw] text-black"
                    style={{ outline: "none" }}
                    id="confirmPassword"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? EyeHide : EyeUnhide}
                      alt=""
                      className="w-[1.65vw] "
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={
              status == STATE.LOADING ||
              !/[a-z]/.test(formik.values.password) ||
              !/[A-Z]/.test(formik.values.password) ||
              !containsSpecialChars(formik.values.password) ||
              !/[0-9]/.test(formik.values.password) ||
              formik.values.password !== formik.values.confirmPassword ||
              !formik.values.first_name ||
              !formik.values.last_name ||
              !formik.values.email
            }
            className={`absolute bottom-0  w-[11.25vw] h-[5.37vh] mt-4 text-xs ${
              formik.values.first_name &&
              formik.values.last_name &&
              formik.values.email &&
              formik.values.password &&
              formik.values.confirmPassword &&
              formik.values.password === formik.values.confirmPassword
                ? ""
                : "bg-opacity-40 cursor-not-allowed"
            }   bg-cyan-600 rounded-lg pt-[6.543vwh]`}
          >
            {status == STATE.LOADING ? "Proceeding..." : "Proceed"}
          </button>
        </form>

        <div className="mt-2">
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
      </div>
    </Index>
  );
}

export default AppSignUp;
