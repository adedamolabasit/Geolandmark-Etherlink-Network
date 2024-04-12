import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import filter from "../../assets/marketplace/filter.svg";
import search from "../../assets/marketplace/search.svg";
import Property from "./Property";
import { useProperty } from "../../contexts/propertyContext";
import ProductDescription from "./ProductDescription";
import Hero from "./Hero";
import { STATE } from "../../utils/stateConstants";
import { getRegisteredLands } from "../../services/landRegistry";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../landing/Navbar";
import propertyData from "../../json/propertyData";
import { getMediaRegistry } from "../../utils/fileBase";

function Market() {
  const {
    activeTab,
    onActiveTab,
    onPropertyClick,
    showParent,
    propData,
    onBackClick,
    selectedProperty,
  } = useProperty();
  const [status, setStatus] = useState(STATE.IDLE);
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [mediaData, setMediaData] = useState(null);
  const navigate = useNavigate();

  const fetchLandsRegistry = async () => {
    setStatus(STATE.LOADING);
    try {
      const response = await getRegisteredLands();
      console.log(response, "res");
      console.log(response, "res");
      setFetchedData(response.data.data.records);
      setFilteredData(response.data.data.records);
      setStatus(STATE.SUCCESS);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
        toast.info("Session Expired. Please Login.");
      } else {
        toast.error(err?.message);
        console.log(err);
        setStatus(STATE.ERROR);
        return;
      }
    }
  };
  console.log(fetchedData, "fegsw");
  // Fetch user Lands Data on page load
  useEffect(() => {
    fetchLandsRegistry();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMediaRegistry();
        setMediaData(data);
      } catch (error) {
        // Handle the error if needed
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {status == STATE.LOADING && (
        <div className="flex flex-col items-center justify-center h-80">
          {/* <img src={Loader} alt="" className="mb-4" /> */}
          <span>Fetching Project</span>
        </div>
      )}
      {status == STATE.SUCCESS  && (
        <div>
          <Hero />
          <div className="px-[4.17vw] pt-[17.69vw]  pb-[36.30vh] text-white bg-[#1B1B1B] ">
            <div className="flex items-center justify-between h-[4.91vh] mb-[7.69vh] ">
              <div className="flex gap-[1.04vw] items-center h-full ">
                <button
                  className={`${
                    activeTab === "All"
                      ? "bg-[#009FBD] text-white"
                      : "border-[1px] border-[#009FBD] text-[#B9B9B9] "
                  }  px-[1.56vw] h-full rounded-[0.625rem] `}
                  onClick={() => onActiveTab("All", "All")}
                >
                  All
                </button>
                <button
                  className={`${
                    activeTab === "Basic"
                      ? "bg-[#009FBD] text-white"
                      : "border-[1px] border-[#009FBD] text-[#B9B9B9] "
                  }   px-[1.56vw] h-full rounded-[0.625rem]  `}
                  onClick={() => onActiveTab("Basic", "Basic")}
                >
                  Basic
                </button>
                <button
                  className={`${
                    activeTab === "Classic"
                      ? "bg-[#009FBD] text-white"
                      : "border-[1px] border-[#009FBD] text-[#B9B9B9] "
                  }  border-[1px] border-[#009FBD] px-[1.56vw] h-full rounded-[0.625rem] text-[#B9B9B9] `}
                  onClick={() => onActiveTab("Classic", "Classic")}
                >
                  Classic
                </button>
                <button
                  className={`${
                    activeTab === "Premium"
                      ? "bg-[#009FBD] text-white"
                      : "border-[1px] border-[#009FBD] text-[#B9B9B9] "
                  }  border-[1px] border-[#009FBD] px-[1.56vw] h-full rounded-[0.625rem] text-[#B9B9B9] `}
                  onClick={() => onActiveTab("Premium", "Premium")}
                >
                  Premium
                </button>
              </div>
              <div className="h-full flex items-center gap-[0.73vw] ">
                <div className="border-[1px] border-[#009FBD] w-[4.91vh] flex items-center justify-center rounded-sm h-full ">
                  <img src={filter} alt="" className="w-[1.25vw] " />
                </div>
                <div className="bg-[#D9D9D9] h-full w-[20.94vw] rounded-sm flex items-center gap-[0.73vw] pl-[1.04vw] text-black ">
                  <img src={search} alt="" className="w-[1.25vw] " />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="bg-[#D9D9D9] w-full h-full outline-none placeholder:text-black"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-[1.927vw] gap-y-[7.13vh] ">
              {fetchedData.map((data) => (
                <Property
                  id={data.id}
                  address={data.address}
                  allowedLandUse={data.allowedLandUse}
                  area={data.area}
                  birthDate={data.birthDate}
                  cOf={data.cOf}
                  cartesianCoordinates={data.cartesianCoordinates}
                  createdAt={data.createdAt}
                  description={data.description}
                  fullName={data.fullName}
                  geographicCoordinates={data.geographicCoordinates}
                  images={data.images}
                  isNegotiable={data.isNegotiable}
                  isPurchased={data.isPurchased}
                  landUse={data.landUse}
                  legalDescription={data.legalDescription}
                  lotSize={data.lotSize}
                  mail={data.mail}
                  occupation={data.occupation}
                  ownershipType={data.ownershipType}
                  phoneNum={data.phoneNum}
                  planId={data.planId}
                  price={data.price}
                  prohibitedLandUse={data.prohibitedLandUse}
                  surveyPlan={data.surveyPlan}
                  title={data.title}
                  updatedAt={data.updatedAt}
                  zoningCategory={data.zoningCategory}
                  imagePath={data.imagePath}
                  activeTab={activeTab}
                  onClick={() => onPropertyClick(data)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Market;
