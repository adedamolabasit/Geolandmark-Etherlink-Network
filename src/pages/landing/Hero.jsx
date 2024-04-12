import React from "react";
import hero from "../../assets/hero-bg.svg";
import Navbar from "./Navbar";
import { Link} from "react-router-dom";


function Hero() {
  return (
    <div
      className=" h-screen bg-no-repeat bg-cover bg-center relative text-white "
      style={{
        backgroundImage: `url('https://i.ibb.co/Gtp4xPN/landingpageheronew.png')`
      }}
    >
      <div className="bg-opacity-70 bg-black w-full h-full px-[4.17vw] pt-[3.52vh]">
        <Navbar/>
        <div className="md:mt-[40vh] mt-[54.35vh] text-center flex flex-col items-center justify-center gap-[6.58vh] ">
          <h1 className=" md:text-[2.66rem] text-[1.375rem] font-bold leading-tight">
            Revolutionize Land Registration and <br /> Management with
            GeoLandmark!
          </h1>
          <p className="md:text-xl text-sm  ">
            Empowering Land Owners and Buyers: <br /> GeoLandmark Streamlines
            Every Step of the Process.
          </p>
          <Link to="/login">
            <button className="bg-[#009FBD] font-bold w-[45.35vw] md:w-[15.68vw] h-[4.72vh] md:rounded-[0.53rem] rounded-[0.22rem] text-xs md:text-sm hover:bg-opacity-75 ">
              Register Your Land Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Hero;
