import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import PageFive from "./PageFive";
import PageSix from "./PageSix";
import PageSeven from "./PageSeven";
import Footer from "./Footer";
import { signon } from "../../services/authService";
function Index() {
  

  return (
    <div className=" ">
      <Hero/>
      <PageTwo />
      <PageThree />
      <PageFour />
      <PageFive />
      <PageSix />
      <PageSeven />
      <Footer />
    </div>
  );
}

export default Index;
