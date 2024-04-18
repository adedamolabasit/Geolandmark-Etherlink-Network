import React from "react";
import hero from "../../assets/market-hero.svg";
import Navbar from "../landing/Navbar";
import { BaseMap } from "../../lib/leaflets";

function Hero() {
  return (
    <div
      className="w-full relative text-white py-[3.52vh] px-[4.17vw]"
      // style={{
      //   backgroundImage: `url('https://i.ibb.co/52Fn489/marketplaceheronew.png')`,
      // }}
    >
      {/* <BaseMap /> */}
      {/* <div className="bg-opacity-70 bg-black w-full h-full px-[4.17vw] pt-[3.52vh]"> */}
        <Navbar />
        {/* <h1 className="flex items-center justify-center h-full font-bold text-[3.63rem] ">
          GeoLandmark Marketplace
        </h1> */}
      {/* </div> */}
    </div>
  );
}

export default Hero;
