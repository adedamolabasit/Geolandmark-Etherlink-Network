import React from "react";
import vec from "../../assets/vec.svg";
import illustration from "../../assets/illustration.svg";

function PageThree() {
  return (
    <div className="bg-[#05001B]  py-[11.57vh] text-center px-[6.46vw] flex flex-col items-center ">
      <h2 className="text-white font-black text-[1.875rem] ">
        GeoLandmark: Ensuring Land Interest Protection!
      </h2>
      <img src={vec} alt="" />
      <div className="text-[#B9B9B9] mt-[3.70vh] mb-[4vh] md:mb-[8.33vh] font-medium ">
        <p>
          GeoLandmark prioritizes the protection of your land interests by
          offering accurate land registration, transparent transactions,
          compliance with regulations, confidentiality, and expert support.
        </p>
        <br />
        <p>
          Our streamlined process ensures precise registration, while secure
          transactions safeguard your interests. We stay up-to-date with land
          laws and regulations, ensuring compliance and protecting your rights.
          Your data is handled with confidentiality and stored securely.
        </p>
        <br />
        <p>
          Our team of experts is available to provide guidance and support for
          various land management aspects. Trust GeoLandmark for effective land
          interest protection.
        </p>
      </div>
      <img
        src={illustration}
        alt=""
        className="w-[43rem] h-[33rem] md:mb-[13.98vh] mb-[9.26vh] "
      />
      <button className="text-white bg-[#009FBD] md:w-[15vw] w-[40vw] h-[4.72vh] rounded-[0.22rem] md:rounded-[0.53rem] text-xs hover:bg-opacity-75 font-bold ">
        Secure Your Spot Now!
      </button>
    </div>
  );
}

export default PageThree;
