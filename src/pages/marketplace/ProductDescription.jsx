import React, { useState, useEffect } from "react";
import Navbar from "../landing/Navbar";
import back from "../../assets/marketplace/back.svg";
import locationIcon from "../../assets/marketplace/location.svg";
import people from "../../assets/marketplace/people.svg";
import privateImg from "../../assets/marketplace/private.svg";
import info from "../../assets/marketplace/info.svg";
import slider from "../../assets/marketplace/slider.svg";
import Property from "./Property";
import PropertyDetails from "./PropertyDetails";
import SimilarProducts from "./SimilarProducts";
import propertyData from "../../json/propertyData";
import { useProperty } from "../../contexts/propertyContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { STATE } from "../../utils/stateConstants";
import { baseMap } from "../../lib/leaflets";
// import { ExtendedBaseMap } from "../../lib/leaflets";
// import ExtendedBaseMap from "../../lib/leafletsMapLocator";
import { ExtendedBaseMap } from "../../lib/leafletsMapLocator";
import { ExtendedBaseMaps } from "../../lib/leaflets";
import { getSingleRegisteredLands } from "../../services/landRegistry";
// import dp1 from "../../assets/display/dp1.svg";
// import dp2 from "../../assets/display/dp2.svg";
// import dp3 from "../../assets/display/dp3.svg";
// import dp4 from "../../assets/display/dp4.svg";
// import dp5 from "../../assets/display/dp5.svg";


function ProductDescription({
  onBackClick,
  name,
  availableUnits,
  price,
  location,
  coOwners,
  ownership,
  descImg,
  img,
  imagePath,
  details,
}) {
  const locationState = useLocation();
  const pageId = locationState.state;

  const navigate = useNavigate();
  const [toggleYear, setToggleYear] = useState("Year 1");
  const {
    singleSelection,
    propertyId,
    fetchSingleRegistry,
    handleSingleSelection,
    status,
    fet,
  } = useProperty();

  useEffect(() => {
    const data = fetchSingleRegistry(pageId);
    handleSingleSelection(data);
  }, [pageId]);
  const url = process.env.API_BASE_URL

  const imageData = [
    "https://i.ibb.co/vHThG3J/f1.png",

    // "https://i.ibb.co/dcSQsyY/f2.png",
    
    "https://i.ibb.co/6PqRprW/f3.png",
    
    "https://i.ibb.co/FXdRdCY/f4.png",
    
    // "https://i.ibb.co/NSB97Wx/f5.png",
    
    "https://i.ibb.co/XL5vzFR/f6.png",
    
    "https://i.ibb.co/z8kDNcD/f7.png",
    
    // "https://i.ibb.co/L5kjBqs/f8.png",
    
    "https://i.ibb.co/chTTqJc/f9.png",
    
    "https://i.ibb.co/1fCVvp6/f10.png",
    
    // "https://i.ibb.co/5rVzgrs/f11.png",
    
    "https://i.ibb.co/7Gf4xH8/f12.png",
  ]

  const getRandomProperties = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const selectedImage = getRandomProperties(imageData, 1);
  return (
    <>
      {status == STATE.LOADING && (
        <div className="flex flex-col items-center justify-center h-80">
          {/* <img src={Loader} alt="" className="mb-4" /> */}
          <span>Fetching Project</span>
        </div>
      )}
      {status == STATE.SUCCESS && singleSelection && (
        <div className="bg-[#1B1B1B] w-full h-full py-[3.51vh] px-[4.17vw] text-white">
          <Navbar />
          <button
            className=" flex items-center gap-2 mt-[9.81vh] mb-[12.03vh]  font-bold text-lg text-[#009FBD] "
            onClick={onBackClick}
          >
            <img src={back} alt="" />
            Back to Marketplace
          </button>
          <h1 className="font-black text-3xl text-[#B9B9B9] ">{name}</h1>
          <p className="text-lg text-[#009FBD] ">
            {`GEOLANDMARK-ASSET-${singleSelection?.id}-${singleSelection?.planId}-${singleSelection?.createdAt}`}
          </p>
          <div className="flex items-center gap-[11.40vw] mb-[4.17vh] ">
            <div className="border-[1px] border-[#009FBD] h-[2.87vh] flex items-center gap-2 p-3 rounded-lg">
              <img src={locationIcon} alt="" className="w-[1.04vw] " />
              <h3 className="text-sm">{singleSelection?.address}</h3>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-6 gap-x-[1.46vw] gap-y-[1.11vh]  h-[89.63vh] mb-[13.15vh] ">
            <div className=" row-span-6 col-span-2 grid grid-cols-5 grid-rows-6  gap-y-[1.11vh] ">
              <div className=" rounded-[40px]  row-span-5 col-span-5  ">
                <img
                  src={`${selectedImage}`}
                  alt=""
                  className="  h-full w-full object-cover rounded-[40px]"
                />
              </div>
              <div className=" row-span-1 col-span-5 grid grid-cols-5 grid-rows-1  gap-x-[0.52vw] h-full w-full">
                {propertyData.map((image, index) => {
                  return (
                    <div
                      className="row-span-1 col-span-1 h-full w-full "
                      key={index}
                    >
                      <img
                        src={image.descImg[0]}
                        alt=""
                        className="  h-[12.96vh] w-full object-fill
                       rounded-[19px]"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="row-span-6 col-span-1 bg-[#0D0D0D] rounded-[40px]  flex-col flex gap-[6.67vh] ">
              <ExtendedBaseMaps />
              {/* <div className="flex items-center justify-between">
       <div className="flex items-center gap-2">
         <img src={info} alt="" className="w-[1.25vw] " />
         <h6 className="text-[#B9B9B9] text-lg ">Land Size: 650 sqm</h6>
       </div>
       <button className="bg-[#009FBD] text-white px-[0.68vw] py-[0.95vh] rounded-sm text-sm hover:bg-opacity-75 ">
         Buy to hold
       </button>
     </div> */}
              {/* <div className="">
       <h2 className="text-[#b9b9b9] font-bold text-xl text-center mb-[2.67vh] ">
         How many Units do you want to Buy?
       </h2>
       <div className="flex items-center mb-[2.23vh] justify-between text-sm text-[#865DFF]">
         <h6 className="font-bold">0 Share</h6>
         <h6 className="underline">Use Manual Input</h6>
       </div>
       <img src={slider} alt="" className="mb-[3.06vh] " />
       <div className="flex items-center justify-between text-lg text-[#B9B9B9] font-medium">
         <h6 className="">1 Share</h6>
         <h6 className="">135 Shares</h6>
       </div>
     </div> */}
              {/* <div className="flex items-center justify-center gap-[0.41vw]">
       <button
         className={`${
           toggleYear === "Year 1"
             ? "bg-[#C7BDE4] text-[#865DFF]"
             : "bg-inherit text-[#B9B9B9]"
         }  px-[1.04vw] py-[0.93] rounded-sm text-lg hover:bg-opacity-75 `}
         onClick={() => handleToggle("Year 1")}
       >
         Year 1
       </button>
       <button
         className={`${
           toggleYear === "Year 3"
             ? "bg-[#C7BDE4] text-[#865DFF]"
             : "bg-inherit text-[#B9B9B9]"
         }  px-[1.04vw] py-[0.93] rounded-sm text-lg hover:bg-opacity-75 `}
         onClick={() => handleToggle("Year 3")}
       >
         Year 5
       </button>
       <button
         className={`${
           toggleYear === "Year 5"
             ? "bg-[#C7BDE4] text-[#865DFF]"
             : "bg-inherit text-[#B9B9B9]"
         }  px-[1.04vw] py-[0.93] rounded-sm text-lg hover:bg-opacity-75 `}
         onClick={() => handleToggle("Year 5")}
       >
         Year 7
       </button>
       <button
         className={`${
           toggleYear === "Year 10"
             ? "bg-[#C7BDE4] text-[#865DFF]"
             : "bg-inherit text-[#B9B9B9]"
         }  px-[1.04vw] py-[0.93] rounded-sm text-lg hover:bg-opacity-75 `}
         onClick={() => handleToggle("Year 10")}
       >
         Year 10
       </button>
     </div> */}
              {/* <div className="">
       <div className="text-[#B9B9B9]  flex flex-col gap-[1.39vh] items-stretch ">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <img src={info} alt="" className="w-[1.25vw] " />
             <h6 className="text-lg ">Project Returns</h6>
           </div>
           <p>₦0</p>
         </div>
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <img src={info} alt="" className="w-[1.25vw] " />
             <h6 className="text-lg ">SQM Per Share</h6>
           </div>
           <p>0.00 SQM</p>
         </div>
         <div className="flex items-center justify-between font-bold">
           <h6 className="text-lg ">Pay Now</h6>

           <p>₦0</p>
         </div>
       </div>
     </div> */}
              {/* <button className="aboslute bottom-[80vh] z-10 bg-[#009FBD] w-[18.13vw] h-[6.38vh] text-white rounded-[10px] self-center mt-[-4vh] hover:bg-opacity-75">
                Analyze Parcel Location
              </button> */}
            </div>
          </div>
          <PropertyDetails singleSelection={singleSelection} id={pageId} />
          {/* <SimilarProducts /> */}
        </div>
      )}
    </>
  );
}

export default ProductDescription;
