import React from "react";
import locationIcon from "../../assets/marketplace/location.svg";
import people from "../../assets/marketplace/people.svg";
import privateImg from "../../assets/marketplace/private.svg";
import { useNavigate } from "react-router-dom";
import { useProperty } from "../../contexts/propertyContext";
import { IdentityStore } from "aws-sdk";
import { getSingleRegisteredLands } from "../../services/landRegistry";


function Property({
  id,
  address,
  allowedLandUse,
  area,
  birthDate,
  cOf,
  cartesianCoordinates,
  createdAt,
  description,
  fullName,
  geographicCoordinates,
  images,
  isNegotiable,
  isPurchased,
  landUse,
  legalDescription,
  lotSize,
  mail,
  occupation,
  ownershipType,
  phoneNum,
  planId,
  price,
  prohibitedLandUse,
  surveyPlan,
  title,
  updatedAt,
  zoningCategory,
  activeTab,
  onClick,
  imagePath
}) {
  const navigate = useNavigate();
  const {setPropertyId,handleSingleSelection} = useProperty()
  const handleSinglePage = async (id) => {
    setPropertyId(id)
    const response = await getSingleRegisteredLands(id);
    console.log(response.data.data,"oijuh[poiu")
    handleSingleSelection(response.data.data.records)
    navigate(`/marketplace/${id}`,{ state:id });
  };
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
      <div
        className="bg-[#0F0F0F] rounded-[0.625rem] h-[76.39vh] relative w-full cursor-pointer "
        onClick={() => handleSinglePage(id)}
      >
        <div className="h-[46.11vh] w-full bg-[#1B1B1B] rounded-t-[0.625rem] ">
          <img
            src={selectedImage}
            alt=""
            className="w-full h-full rounded-t-[0.625rem] object-cover"
          />
        </div>
        <div className="px-[1.56vw] pt-[3.14vh] pb-[4.91vh] ">
          <h1 className="text-[#B9B9B9] font-bold text-xl truncate ">{address}</h1>
          <p className="text-[#009FBD] text-sm ">
            {lotSize === 0 ? "Sold Out" : `Area : ${area} (sqm)`}
          </p>
          <h2 className="text-[#B9B9B9] text-xl font-black mt-[1.67vh] mb-[1.30vh] ">
            #{price} <span className="text-sm font-normal">Per share</span>
          </h2>
          <div className="flex items-center justify-between  ">
            <div className="border-[1px] border-[#009FBD] h-[2.87vh] w-[14vw] flex items-center gap-2 p-3 rounded-lg">
              <img src={locationIcon} alt="" className="w-[1.04vw] " />
              <h3 className="text-sm truncate">{address}</h3>
            </div>

            <div className="h-[2.87vh] flex items-center gap-2 p-3 rounded-lg">
              <img
                src={ownershipType === "private" ? privateImg : people}
                alt=""
                className="w-[1.04vw] "
              />
              <h3 className="text-sm">
                {ownershipType === "individual" ? "Private owner" : `4 co-owners`}
                {/* : `${coOwners} co-owners`} */}
              </h3>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 mt-[2.04vh] ml-[1.87vw] flex item-center gap-2 text-sm ">
          <p className="bg-white shadow text-[#009fbd] py-[0.56vh] px-[1.09vw]  rounded-[5px]">
            {zoningCategory}
          </p>
          {isPurchased && (
            <p className="text-white shadow bg-[#009fbd] py-[0.56vh] px-[1.09vw]  rounded-[5px]">
              Sold out
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Property;
