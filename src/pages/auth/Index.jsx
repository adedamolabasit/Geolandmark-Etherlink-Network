import React from "react";
import Back from "../../assets/Back.svg";
import { useNavigate } from "react-router-dom";





function Index({ children,path }) {

  const navigate = useNavigate();
  const backButtonAction = () => {
    navigate(-1);

  }

  return (
    <div className="flex justify-center items-center bg-[#1B1B1B] h-screen w-screen px-[7.66vw] py-[5.13vh]">
      <div
        className={`relative px-[1.82vw] bg-black w-full h-full bg-opacity-50 rounded-[45.75px] py-[7.031vh] `}
        style={{ fontFamily: "Whyte Inktrap" }}
      >
        <div className="flex justify-center items-center">
          <img
            src={Back}
            alt=""
            onClick={backButtonAction}
            className="absolute cursor-pointer left-[5.762vw] top-[7.031vh]"
          />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Index;
