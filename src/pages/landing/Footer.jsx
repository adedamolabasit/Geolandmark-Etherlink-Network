import React from "react";
import logo from "../../assets/logo.svg";
import twitter from "../../assets/twitter.svg";
import telegram from "../../assets/telegram.svg";
import discord from "../../assets/discord.svg";
import linkedin from "../../assets/linkedin.svg";
import call from "../../assets/call.svg";
import messages from "../../assets/messages.svg";

function Footer() {
  return (
    <div className="bg-black/95  md:py-[18.05vh] md:px-[4.167vw] flex-col md:flex-row text-white flex items-end justify-between  ">
      <div>
        <img
          src={logo}
          alt=""
          className="h-[3.15vh] w-[6.98vw] md:w-auto md:h-auto "
        />
        <p className="">Copyright © GeoLandmark 2024 | All Rights Reserved</p>
      </div>
      <div className="flex flex-col ">
        <div className="flex gap-4 items-center self-end ">
          <a href="#twitter">
            <img src={twitter} alt="" className="w-[2.21vw] " />
          </a>
          <a href="#telegram">
            {" "}
            <img src={telegram} alt="" className="w-[2.21vw] " />
          </a>
          <a href="#discord">
            <img src={discord} alt="" className="w-[2.21vw] " />
          </a>
          <a href="#linkedin">
            <img src={linkedin} alt="" className="w-[2.21vw] " />
          </a>
        </div>
        <div className="flex gap-[1.56vw] items-center mt-4">
          <div className="flex gap-2 items-center">
            <img src={call} alt="" />
            <p>+234 (70) 6177 4623</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src={messages} alt="" />
            <p>info@geolandmark.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
