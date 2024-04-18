import React, { useState, useEffect, useRef } from "react";
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
import { useAuth } from "../../contexts/authContext";
import { SingleBaseMap } from "../../lib/leaflets";
import Footer from "../landing/Footer";
import { truncateWalletAddress } from "../../utils/truncateAddress";

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
  const data = locationState.state;

  const navigate = useNavigate();
  const { fetchDataByParcelId } = useAuth();
  const [toggleYear, setToggleYear] = useState("Year 1");
  const [status, setStatus] = useState(STATE.IDLE);
  const [parcel, setParcel] = useState();
  const dataRef = useRef();

  const {
    singleSelection,
    propertyId,
    fetchSingleRegistry,
    handleSingleSelection,
  } = useProperty();
  let info;
  useEffect(() => {
    setStatus(STATE.LOADING);

    const callData = async () => {
      const info = await fetchDataByParcelId(data.address, data.parcelNumber);
      setParcel(info.data);
      console.log(info, "iiiivvv");
    };
    callData();
    setStatus(STATE.SUCCESS);
  }, [data]);
  console.log(parcel, "sign");

  const url = process.env.API_BASE_URL;

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
  ];

  const truncatedWalledAddress = truncateWalletAddress(parcel?.ownership?.address)

  const getRandomProperties = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const selectedImage = getRandomProperties(imageData, 1);
  return (
    <>
      <div className="">
        {status == STATE.LOADING && (
          <div className="flex flex-col items-center justify-center h-80">
            {/* <img src={Loader} alt="" className="mb-4" /> */}
            <span>Fetching Project</span>
          </div>
        )}
        {status == STATE.SUCCESS && parcel && (
          <div className="bg-[#1B1B1B] w-full h-full py-[3.51vh] px-[4.17vw] text-white">
            <Navbar />
            <button
              className=" flex items-center gap-2 mt-[9.81vh]   font-bold text-lg text-[#009FBD] "
              onClick={onBackClick}
            >
              <img src={back} alt="" />
              Back to Marketplace
            </button>
            <h1 className="font-black text-3xl text-[#B9B9B9] ">
              {truncatedWalledAddress }
            </h1>
            <p className="text-lg text-[#009FBD] ">
              {`GEOLANDMARK-ASSET-${data.parcelNumber}`}
            </p>
            <div className="flex items-center gap-[11.40vw] mb-[4.17vh] ">
              <div className="border-[1px] border-[#009FBD] h-[2.87vh] flex items-center gap-2 p-3 rounded-lg">
                <img src={locationIcon} alt="" className="w-[1.04vw] " />
                <h3 className="text-sm">{parcel?.owner?.address}</h3>
              </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-6 gap-x-[1.46vw]   h-[89.63vh] ">
              <div className=" row-span-6 col-span-2 grid grid-cols-5 grid-rows-6  gap-y-[1.11vh] ">
                <div className=" rounded-[40px]  row-span-5 col-span-5  ">
                  <img
                    src={parcel?.file?.parcelImage || selectedImage}
                    alt=""
                    className="  h-full w-full object-cover rounded-[40px]"
                  />
                </div>
              </div>
              <div className="row-span-6 col-span-1 bg-[#0D0D0D] rounded-[40px]  flex-col flex gap-[6.67vh] ">
                {parcel && <SingleBaseMap data={parcel} />}
              </div>
            </div>
            <PropertyDetails
              parcelNumber={data?.parcelNumber}
              walletAddress={data?.address}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductDescription;
