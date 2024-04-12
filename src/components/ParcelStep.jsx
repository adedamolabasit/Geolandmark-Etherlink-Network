import React, { useState, useEffect } from "react";
import Step2 from "../assets/step2.svg";
import { STATE } from "../utils/stateConstants";
import { useFormik } from "formik";
import * as Yup from "yup";

import { general_input_styles } from "../utils";
import { label_styles } from "../utils";
import { input_container_styles } from "../utils";

export const ParcelStep = ({
  prevStep,
  nextStep,
  landParcelCurrentState,
  saveLandParcelData,
}) => {
  const [isGeo, setIsGeo] = useState(true);
  const activateGeoSystem = () => {
    setIsGeo(true);
  };
  const activateCartSystem = () => {
    setIsGeo(false);
  };
  const [status, setStatus] = useState(STATE.IDLE);

  const step2 = async (values, methods) => {
    setStatus(STATE.LOADING);
    const userObj = {
      ...(isGeo
        ? {
            geographicCoordinates: [
              { point1: { px: formik.values.px1, py: formik.values.py1 } },
              { point2: { px: formik.values.px2, py: formik.values.py2 } },
              { point3: { px: formik.values.px3, py: formik.values.py3 } },
              { point4: { px: formik.values.px4, py: formik.values.py4 } },
            ],
          }
        : {
            cartesianCoordinates: [
              { point1: { px: formik.values.px1, py: formik.values.py1 } },
              { point2: { px: formik.values.px2, py: formik.values.py2 } },
              { point3: { px: formik.values.px3, py: formik.values.py3 } },
              { point4: { px: formik.values.px4, py: formik.values.py4 } },
            ],
          }),
      area: formik.values.area,
      address: formik.values.address,
      landUse: formik.values.area || "null",
    };

    if (landParcelCurrentState) {
      saveLandParcelData(userObj);
      nextStep();
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      px1: landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.px || "",
      py1: landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.py || "",
      px2: landParcelCurrentState?.geographicCoordinates?.[1]?.point2?.px || "",
      py2: landParcelCurrentState?.geographicCoordinates?.[1]?.point2?.py || "",
      px3: landParcelCurrentState?.geographicCoordinates?.[2]?.point3?.px || "",
      py3: landParcelCurrentState?.geographicCoordinates?.[2]?.point3?.py || "",
      px4: landParcelCurrentState?.geographicCoordinates?.[3]?.point4?.px || "",
      py4: landParcelCurrentState?.geographicCoordinates?.[3]?.point4?.py || "",
      area: landParcelCurrentState?.area || "",
      address: landParcelCurrentState?.address || "",
      landUse: landParcelCurrentState?.landUse || "",
    },
    validationSchema: Yup.object({
      px1: Yup.string().required("This field is required."),
      py1: Yup.string().required("This field is required."),
      px2: Yup.string().required("This field is required."),
      py2: Yup.string().required("This field is required."),
      px3: Yup.string().required("This field is required."),
      py3: Yup.string().required("This field is required."),
      px4: Yup.string().required("This field is required."),
      py4: Yup.string().required("This field is required."),
      area: Yup.string().required("Area is required."),
      address: Yup.string().required("Physical address is required."),
      landUse: Yup.string().required("land use is required."),
    }),
    onSubmit: (values, methods) => {
      step2(values, methods);
    },
  });
  console.log(landParcelCurrentState, "hheheh");
  return (
    <div className="flex- flex-col">
      <img src={Step2} alt="step2" className="w-full" />
      <div className="mt-[6.2037vh] text-zinc-400 text-xl font-bold text-center leading-snug">
        Spatial Attribute
      </div>
      <form
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
        encType="multipart/form-data"
        method="POST"
      >
        <div className="flex flex-col w-full mt-[2.4630vh] gap-[4.1667vh]">
          {/* ... */}

          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex flex-col ">
              <div className="flex w-full justify-between my-4">
                <div
                  onClick={activateGeoSystem}
                  className={`${
                    isGeo ? "" : "text-zinc-300 text-opacity-40"
                  } cursor-pointer w-[14.5vw]  text-base flex flex-col items-center font-bold leading-[0.9vw]`}
                >
                  Cartesian Co-ordinates
                  <div
                    className={`${
                      isGeo ? "bg-violet-500" : "bg-zinc-300 bg-opacity-40"
                    } w-[13.8542vw] h-1  rounded-[100px]`}
                  />
                </div>
                <div
                  // onClick={activateCartSystem}
                  className={`${
                    !isGeo ? "" : "text-zinc-300 text-opacity-40"
                  } cursor-not-allowed w-[14.5vw] text-zinc-400 text-base flex flex-col items-center font-bold leading-[0.9vw]`}
                >
                  Geographic Co-ordinates
                  <div
                    className={`${
                      !isGeo ? "bg-violet-500" : "bg-zinc-300 bg-opacity-40 "
                    } w-[13.8542vw] h-1  rounded-[100px]`}
                  />
                </div>
              </div>
              <div className="w-full flex justify-around">
                {isGeo ? (
                  <>
                    <div>Eastings</div>
                    <div>Northings</div>
                  </>
                ) : (
                  <>
                    <div>Longitude</div>
                    <div>Latitude</div>
                  </>
                )}
              </div>
              <div className="w-full flex justify-between">
                <div className="flex flex-col">
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Point1"
                    name="px1"
                    value={formik.values.px1}
                    className="w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                  />
                  {/* Display error message for px1 */}
                  {formik.touched.px1 && formik.errors.px1 && (
                    <div className="text-red-600">{formik.errors.px1}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="point1"
                    name="py1"
                    value={formik.values.py1}
                    className="w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                  />
                  {/* Display error message for py1 */}
                  {formik.touched.py1 && formik.errors.py1 && (
                    <div className="text-red-600">{formik.errors.py1}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col ">
              <div className="w-full flex justify-between">
                <div className="flex flex-col">
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="point2"
                    name="px2"
                    value={formik.values.px2}
                    className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                  />
                  {/* Display error message for px2 */}
                  {formik.touched.px2 && formik.errors.px2 && (
                    <div className="text-red-600">{formik.errors.px2}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="number"
                    placeholder="point2"
                    name="py2"
                    value={formik.values.py2}
                    className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                  />
                  {/* Display error message for py2 */}
                  {formik.touched.py2 && formik.errors.py2 && (
                    <div className="text-red-600">{formik.errors.py2}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col ">
              <div className="w-full flex justify-between">
                <div className="flex flex-col">
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="point3"
                    name="px3"
                    value={formik.values.px3}
                    className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                  />
                  {/* Display error message for px3 */}
                  {formik.touched.px3 && formik.errors.px3 && (
                    <div className="text-red-600">{formik.errors.px3}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="point3"
                    name="py3"
                    value={formik.values.py3}
                    className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                  />
                  {/* Display error message for py3 */}
                  {formik.touched.py3 && formik.errors.py3 && (
                    <div className="text-red-600">{formik.errors.py3}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col ">
              <div className="w-full flex justify-between">
                <div className="flex flex-col">
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="point4"
                    name="px4"
                    value={formik.values.px4}
                    className=" w-[14.1146vw]  px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                  />
                  {/* Display error message for px4 */}
                  {formik.touched.px4 && formik.errors.px4 && (
                    <div className="text-red-600">{formik.errors.px4}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="point4"
                    name="py4"
                    value={formik.values.py4}
                    className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                  />
                  {/* Display error message for py4 */}
                  {formik.touched.py4 && formik.errors.py4 && (
                    <div className="text-red-600">{formik.errors.py4}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ... */}
          <div className="mt-[6.3704vh]">
            <div className="text-zinc-400 text-xl font-bold leading-snug text-center">
              Non-Spatial Attribute
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex flex-col">
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
                  name="area"
                  value={formik.values.area}
                  className={general_input_styles}
                />
                {/* Display error message for area */}
                {formik.touched.area && formik.errors.area && (
                  <div className="text-red-600">{formik.errors.area}</div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="address"
                  className="mb-1 text-base font-bold text-[#B9B9B9]"
                >
                  Physical Address
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="address"
                  value={formik.values.address}
                  className={general_input_styles}
                />
                {/* Display error message for area */}
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-600">{formik.errors.address}</div>
                )}
              </div>

              <div className={input_container_styles}>
                <label htmlFor="landUse" className={label_styles}>
                  Land Use
                </label>
                <select
                  id="landUse"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.landUse}
                  placeholder="Land Use"
                  className={general_input_styles}
                  name="landUse"
                >
                  <option value="nil">- Choose one - </option>
                  <option value="Commercial">Commercial Land</option>
                  <option value="Mixed">Mixed Land</option>
                  <option value="Residential">Residential Land</option>
                </select>
                {/* Display error message for landUse */}
                {formik.touched.landUse && formik.errors.landUse && (
                  <div className="text-red-600">{formik.errors.landUse}</div>
                )}
              </div>
            </div>
          </div>

          {/* Submit and Back buttons */}
          <div className="flex justify-around mt-6 py-12">
            <button
              onClick={prevStep}
              className="w-[8.2292vw] h-[4.3519vh] border border-cyan-600 bg-opacity-40 rounded-[10px]"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-[8.2292vw] h-[4.3519vh] bg-cyan-600 bg-opacity-40 rounded-[10px]"
            >
              Proceed
            </button>
          </div>
        </div>
      </form>{" "}
    </div>
  );
};
