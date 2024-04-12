import React from "react";
import { useStepper } from "../../contexts/stepperContext";
import { useMedia } from "../../contexts/mediaContex";
import { OwnerStep } from "../../components/OwnerStep";
import { ParcelStep } from "../../components/ParcelStep";
import { LandOwnerShipStep } from "../../components/LandOwnershipStep";
export default function RegisterLand() {
  const {
    stepper,
    nextStep,
    prevStep,
    ownerCurrentState,
    saveOwnerData,
    landParcelCurrentState,
    saveLandParcelData,
    saveLandOwnershipData,
    ownershipCurrentState,
  } = useStepper();

  const {
    uploadDeedInformation,
    deedInformation,
    purchaseHistory,
    uploadPurhaseHistory,
    propertyVisualization,
    uploadPropertyVisualization,
  } = useMedia();

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-[#0D0D0D] rounded-[40px]  w-[39.01vw] px-[4.48vw] pt-[3.43vh] pb-[9.54vh] flex-col  items-center ">
          {stepper === 0 && (
            <OwnerStep
              saveOwnerData={saveOwnerData}
              ownerCurrentState={ownerCurrentState}
              nextStep={nextStep}
              uploadDeedInformation={uploadDeedInformation}
              deedInformation={deedInformation}
            />
          )}
          {stepper === 1 && (
            <ParcelStep
              prevStep={prevStep}
              nextStep={nextStep}
              landParcelCurrentState={landParcelCurrentState}
              saveLandParcelData={saveLandParcelData}
              purchaseHistory={purchaseHistory}
              uploadPurhaseHistory={uploadPurhaseHistory}
            />
          )}
          {stepper === 2 && (
            <LandOwnerShipStep
              prevStep={prevStep}
              saveLandOwnershipData={saveLandOwnershipData}
              ownershipCurrentState={ownershipCurrentState}
              landParcelCurrentState={landParcelCurrentState}
              ownerCurrentState={ownerCurrentState}
              propertyVisualization={propertyVisualization}
              uploadPropertyVisualization={uploadPropertyVisualization}
            />
          )}
        </div>
      </div>
    </>
  );
}