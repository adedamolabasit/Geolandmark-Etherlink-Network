import { createContext, useContext, useState,useRef } from "react";

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const steps = useRef(0);
  const ownerData = useRef({});
  const landParcelData = useRef({});
  const landOwnershipData = useRef({});
  const [stepper,setStepper] = useState(steps.current)
  const [ownerCurrentState, setOwnerCurrentState] = useState(ownerData.current);
  const [landParcelCurrentState, setlandParcelCurrentState] = useState(landParcelData.current);
  const [ownershipCurrentState, setOwnershipCurrentState] = useState(landOwnershipData.current);

  const nextStep = () => {
    steps.current += 1;
    setStepper(steps.current);
  };
  const prevStep = () => {
    steps.current -= 1;
    setStepper(steps.current);
  };

  const saveOwnerData = (data) => {
    ownerData.current = {...ownerData.current,...data}
    setOwnerCurrentState(ownerData.current)
  }
  const saveLandParcelData = (data) => {
    landParcelData.current = {...landParcelData.current,...data}
    setlandParcelCurrentState(landParcelData.current)
  }
  const saveLandOwnershipData = (data) => {
    landOwnershipData.current = {...landOwnershipData.current,...data}
    setOwnershipCurrentState(landOwnershipData.current)
  }


  return (
    <StepperContext.Provider
      value={{
        stepper,
        nextStep,
        prevStep,
        saveOwnerData,
        ownerCurrentState,
        saveLandParcelData,
        landParcelCurrentState,
        saveLandOwnershipData,
        ownershipCurrentState,

      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export const useStepper = () => useContext(StepperContext);
