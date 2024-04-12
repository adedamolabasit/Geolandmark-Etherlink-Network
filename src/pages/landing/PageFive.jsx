import React from "react";
import blue from "../../assets/blue.svg";
import illustration from "../../assets/illustratiion.svg";
import illustrationa from "../../assets/illustrationa.svg";

function PageFive() {
  return (
    <div className="bg-[#0F0F0F] pt-[11.67vh] pb-[24.91vh] px-[4.17vw] flex flex-col items-center ">
      <h2 className="text-white font-black text-xl md:text-[1.875rem]  ">
        How GeoLandmark Works!
      </h2>
      <img
        src={blue}
        alt=""
        className="mb-[2.8vh] md:mb-[5.65vh] md:w-auto w-[28.50vw] "
      />
      <p className="text-[#009FBD] font-bold text-center md:mb-[10.19vh] text-sm md:text-base ">
        Simplify Land Registration and Management with GeoLandmark: <br />
        <span className="text-[#B9B9B9] ">
          Streamlined, Secure, and Efficient.
        </span>
      </p>
      <img
        src={illustration}
        alt=""
        className="w-[70rem] h-[43rem] hidden md:block "
      />
      <img
        src={illustrationa}
        alt=""
        className="w-[30rem] h-[33rem]  md:hidden mt-[9.375vh] "
      />
    </div>
  );
}

export default PageFive;
