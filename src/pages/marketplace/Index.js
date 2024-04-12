import React,{useEffect} from "react";
import Hero from "./Hero";
import Market from "./Market";
import Footer from "../landing/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signon } from "../../services/authService";


function Index() {  
  // useEffect(() => {
  //   const response = signon()
  //   console.log(response,"jdjdj")
  // },[])
  return (
    <div className="">
      <Market  />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Index;
