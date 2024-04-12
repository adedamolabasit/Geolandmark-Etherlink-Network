import React, { useState } from "react";
import faq from "../../json/faqData";
import blue from "../../assets/blue.svg";
import grey from "../../assets/grey.svg";
import drag from "../../assets/active-drag.svg";
import close from "../../assets/close-drag.svg";
import check from "../../assets/check.svg";

function FAQItem({ question, answer }) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <div
      className={`bg-[#1B1B1B] flex justify-between items-start pt-[3.2vh] pb-[4.35vh] px-[1.98vw] w-full gap-6 rounded-[0.875rem] ${
        show ? "border border-[#009FBD]" : ""
      }`}
    >
      <div>
        <h1
          className={`${
            show ? "text-[#009FBD]" : "text-white"
          } font-semibold text-[1.375rem]`}
        >
          {question}
        </h1>
        {show && <p className="text-[#B9B9B9] mt-2">{answer}</p>}
      </div>
      <button
        className={`${
          show ? "bg-[#009FBD]" : "bg-[#0F0F0F]"
        } p-[0.94rem] flex items-center justify-center rounded-full`}
        onClick={handleShow}
      >
        <img src={show ? drag : close} alt="" />
      </button>
    </div>
  );
}

function PageSeven() {
  return (
    <div className="bg-[#1B1B1B] px-[5.16vw] pb-[4.54vh]">
      <div className=" py-[18.24vh] ">
        <div className="bg-[#0F0F0F] pt-[12.5vh] pb-[9.72vh] px-[9.69vw] rounded-[1.875rem] flex flex-col items-center">
          <h2 className="text-white font-black text-[1.875rem]">
            Frequently Asked Questions (FAQs) about GeoLandmark:
          </h2>
          <img src={blue} alt="" className="mb-[13.15vh]" />
          <div className="flex flex-col gap-[2.78vh] w-full mb-[13.33vh] ">
            {faq.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
          <button className="text-white bg-[#009FBD] font-bold w-[15.68vw] h-[4.72vh] rounded-[0.53rem] text-xs hover:bg-opacity-75 ">
            Register Your Land Now!
          </button>
        </div>
      </div>
      <div className="bg-[#0F0F0F] w-full flex flex-col items-center pt-[9.07vh] pb-[5.28vh] px-[17.81vw]  rounded-[1.875rem] mb-[20.83vh]">
        <h2 className="text-white font-black text-[1.875rem]">
          Subscribe for Newsletter and Updates
        </h2>
        <img src={grey} alt="" className="mb-[4.44vh] " />
        <p className="text-center text-[1.25rem] font-medium text-[#B9B9B9] mb-[5.74vh] ">
          Receive timely updates and Gain access to valuable insights and tips
          from our experienced professionals in the field of land registration
          and management.
        </p>
        <div className="w-full h-[7.40vh] bg-white rounded-[3.75rem] flex justify-between items-center py-[1vh] px-[0.83vw] mb-[4.44vh]  ">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full h-full pl-2 mr-4 focus:outline-none"
          />
          <button className="bg-[#009FBD] px-[1.67vw] py-[1vh] font-medium rounded-[3.5rem] text-white hover:bg-opacity-75 ">
            Subscribe!
          </button>
        </div>
        <small className="text-[#B9B9B9] text-[1rem] flex items-center gap-2">
          <img src={check} alt="" />
          It's <span className="text-[#009FBD] ">100% free</span> and we will
          never send more than one email per month
        </small>
      </div>
    </div>
  );
}

export default PageSeven;
