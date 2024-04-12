import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useStepper } from "../../contexts/stepperContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "../../utils/arrayLists";

function Dashboard({ children }) {
  const { stepper } = useStepper();
  const [zoneCategory, setZoneCategory] = useState([]);
  const [isZoneCat, setIsZoneCat] = useState(false);
  const handleZoneCat = () => {
    setIsZoneCat((prevState) => !prevState);
  };
  useEffect(() => {
    window.scrollTo(2, 3);
  }, [stepper]);

  return (
    <div className="w-screen h-screen bg-[#1B1B1B] flex  py-[4.6296vh] px-[4.1667vh] gap-[2.0833vw] text-[#B0B0B0]">
      <div className="bg-[#0D0D0D] px-[1.0417vw] pt-[5.2778vh] pb-[5.9259vh] rounded-[20px] ">
        <Sidebar />
      </div>
      <div className=" flex flex-col w-full">

       
 
        <Header />

        <div className="relative w-full overflow-y-auto ">
          <div>{children}</div>
          {/* <Modal
            handleSelection={handleZoneCat}
            arrayState={zoneCategory}
            setArrayState={setZoneCategory}
            listedData={["a", "b","c..........."]}
          /> */}
        </div>
      </div>
      <ToastContainer />

    </div>
  );
}

export default Dashboard;
