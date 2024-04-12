import React from "react";
import { BaseMap as Map } from "../../lib/leaflets";
import Navbar from "../landing/Navbar";

function BaseMap() {
  return (
    <div className="bg-opacity-70 bg-black w-full h-[100vh] px-[4.17vw] py-[3.52vh] flex flex-col justify-center gap-4 ">
      <Navbar />
      <div className="text-center">
      <Map />
      </div>
    </div>
  );
}

export default BaseMap;
