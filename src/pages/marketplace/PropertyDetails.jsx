import React, { useState } from "react";
import map from "../../assets/marketplace/map.svg";
import info from "../../assets/marketplace/infob.svg";
import { SingleBaseMap } from "../../lib/leaflets";
import { useProperty } from "../../contexts/propertyContext";
import { CartesianToGeographic } from "../../utils/coordinateConversion";

function PropertyDetails({ singleSelection}) {
  console.log(singleSelection, "hey");

  const [toggleContent, setToggleContent] = useState("landInformation");

  const handleToggle = (content) => {
    setToggleContent(content);
  };

  return (
    <div className="flex items-center justify-between w-full  mb-[21.39vh] ">
      <div className="w-[45.15vw] self-start">
        <div className="flex items-center gap-[3.91vw] font-bold">
          <h1
            className={`text-lg font-black  mb-4  cursor-pointer ${
              toggleContent === "landInformation"
                ? "text-[#865DFF]"
                : "text-[#009FBD]"
            }  `}
            onClick={() => handleToggle("landInformation")}
          >
            Land Information
          </h1>
          <h1
            className={`text-lg font-black  mb-4  cursor-pointer  ${
              toggleContent === "zoningInformation"
                ? "text-[#865DFF]"
                : "text-[#009FBD]"
            } `}
            onClick={() => handleToggle("zoningInformation")}
          >
            Zoning Information
          </h1>
          <h1
            className={`text-lg font-black  mb-4 ${
              toggleContent === "ownerInformation"
                ? "text-[#865DFF]"
                : "text-[#009FBD]"
            }  cursor-pointer`}
            onClick={() => handleToggle("ownerInformation")}
          >
            Owner Information
          </h1>
        </div>
        <div className=" h-1 bg-[#009fbd] bg-opacity-40 "></div>
        
        <div className="mt-[2.96vh] text-[#B9B9B9] ">
          {toggleContent === "landInformation" && (
            <div>
              <p className="mb-[3.05vh]">{singleSelection?.description}</p>
              <div className="flex justify-between">
                <div>
                  <div className=" mb-[2.13vh] ">
                    <h5 className="text-[#865DFF] font-medium text-sm ">
                      AREA (sqm)
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.area}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      ADDRESS <img src={info} alt="" />
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.address}
                    </p>
                  </div>
                </div>
                <div>
                  <div className=" mb-[2.13vh] ">
                    <h5 className="text-[#865DFF] font-medium text-sm ">
                      PARCEL ID
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.planId}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      VALUE IN NAIRA <img src={info} alt="" />
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      #{singleSelection?.price}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-[2.13vh]">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      LOT SIZE
                      <img src={info} alt="" />
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.lotSize}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      OWNERSHIP TYPE
                      <img src={info} alt="" />
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.ownershipType}
                    </p>
                  </div>
                </div>
              </div>
              <h1
                className={`text-lg font-black  mb-4  text-white mt-[3.05vh]`}
                onClick={() => handleToggle("zoningInformation")}
              >
                Coordinates
              </h1>
              <div className=" h-1 bg-white bg-opacity-40"></div>
              <div className="flex justify-between mt-[2.13vh]">
                <div className="flex justify-start w-full gap-12">
                  <div className="flex flex-col mb-[2.13vh] items-center ">
                    <h5 className="text-[#009FBD] font-medium text-sm ">
                      POINTS
                    </h5>
                    {singleSelection?.geographicCoordinates.map(
                      (cord, index) => {
                        const displayIndex = index + 1;

                        return (
                          <p
                            key={index}
                            className="text-lg text-[#B9B9B9] font-bold"
                          >
                            {displayIndex}
                          </p>
                        );
                      }
                    )}
                  </div>
                  <div className="flex flex-col ">
                    <h5 className="text-[#009FBD] font-medium text-sm flex items-center gap-2 ">
                      EASTINGS
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.geographicCoordinates[0]?.point1?.px}
                    </p>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.geographicCoordinates[1]?.point2?.px}
                    </p>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.geographicCoordinates[2]?.point3?.px}
                    </p>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.geographicCoordinates[3]?.point4?.px}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#009FBD] font-medium text-sm flex items-center gap-2 ">
                      NORTHINGS
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.geographicCoordinates[0]?.point1?.py}
                    </p>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.geographicCoordinates[1]?.point2?.py}
                    </p>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.geographicCoordinates[2]?.point3?.py}
                    </p>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.geographicCoordinates[3]?.point4?.py}
                    </p>
                  </div>
                  {/* <div className="">
                    <h5 className="text-[#009FBD] font-medium text-sm flex items-center gap-2 ">
                      LONGTITUDE
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.address}
                    </p>
                  </div> */}
                  {/* <div className="">
                    <h5 className="text-[#009FBD] font-medium text-sm flex items-center gap-2 ">
                      LATITUDE
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.address}
                    </p>
                  </div> */}
                </div>

                {/* <div>
                  <div className=" mb-[2.13vh] ">
                    <h5 className="text-[#865DFF] font-medium text-sm ">
                      PARCEL ID
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.planId}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      VALUE IN NAIRA <img src={info} alt="" />
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      #{singleSelection?.price}
                    </p>
                  </div>
                </div> */}
                {/* <div>
                  <div className="mb-[2.13vh]">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      LOT SIZE
                      <img src={info} alt="" />
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.lotSize}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      OWNERSHIP TYPE
                      <img src={info} alt="" />
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.ownershipType}
                    </p>
                  </div>
                </div> */}
                {/* <div>
                  <div className="mb-[2.13vh]">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      LOT SIZE
                      <img src={info} alt="" />
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.lotSize}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      OWNERSHIP TYPE
                      <img src={info} alt="" />
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.ownershipType}
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          )}
          {toggleContent === "zoningInformation" && (
            <div>
              <div className="flex justify-start gap-8">
                <div>
                  <div className=" mb-[2.13vh] ">
                    <h5 className="text-[#865DFF] font-medium text-sm ">
                      LAND USE
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.landUse}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      ZONING CATEGORY 
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.zoningCategory}
                    </p>
                  </div>
                </div>
                <div>
                  <div className=" mb-[2.13vh] ">
                    <h5 className="text-[#865DFF] font-medium text-sm ">
                      ALLOWED LAND USE
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.allowedLandUse || "None"}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      PROHIBITED LAND USE
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.prohibitedLandUse || "None"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {toggleContent === "ownerInformation" && (
            <div>
              <div className="flex justify-start gap-8">
                <div>
                  <div className=" mb-[2.13vh] ">
                    <h5 className="text-[#865DFF] font-medium text-sm ">
                      FULL NAME
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.title} {singleSelection?.fullName}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                     EMAIL
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.mail}
                    </p>
                  </div>
                </div>
                <div>
                  <div className=" mb-[2.13vh] ">
                    <h5 className="text-[#865DFF] font-medium text-sm ">
                      OCCUPATION
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.occupation || "None"}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-[#865DFF] font-medium text-sm flex items-center gap-2 ">
                      CONTACT NUMBER
                    </h5>
                    <p className="text-lg text-[#B9B9B9] font-bold ">
                      {singleSelection?.phoneNum || "None"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div><SingleBaseMap singleSelection={singleSelection} /></div>
    </div>
  );
}

export default PropertyDetails;
