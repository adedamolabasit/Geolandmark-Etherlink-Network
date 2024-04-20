import React from "react";
import image1 from "../../assets/3d-mobile.svg";
import vector from "../../assets/Vector.svg";

function PageTwo() {
  return (
    <div className="md:py-[15.19vh] py-[9.9vh] bg-black/90 flex items-center justify-center px-[4.17vw]  md:flex-row flex-col gap-[4.53vw] ">
      <img
        src="https://i.ibb.co/zJcmrGM/phonesection.png"
        alt=""
        className="w-[37rem] h-[38rem] "
      />
      <div className="flex flex-col items-center md:items-end text-center md:text-end">
        <h2 className="text-[#009FBD] font-black md:text-[2rem] text-2xl leading-tight ">
          Why trust GeoLandmark for <br /> accurate Land Registration?
        </h2>
        <img src={vector} alt="" />
        <div className="text-[#B9B9B9] justify-start font-bold mt-[5.37vh] text-sm md:text-[1rem] flex flex-col items-end ">
          <p className="w-[30.31vw] ">
            By choosing GeoLandmark for your land registration on Etherlink, you
            benefit from a secure, transparent, and efficient platform that
            leverages blockchain technology to safeguard your interests and
            ensure accurate registration at an affordable cost of only $0.01 per
            transaction. Trust GeoLandmark for precise and careful land
            registration backed by the world's first decentralized sequencer on 
            <span className="text-[#B9B9B9]"> Etherlink.</span>
          </p>
          <br />
          <p className="w-[26.82vw]">
            Our streamlined process and user-friendly tools make land
            registration hassle-free. We prioritize the security and
            confidentiality of your data, and our dedicated customer support
            team is available to assist you. Trust GeoLandmark for precise and
            careful Land Registration.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageTwo;
