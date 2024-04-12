import React, { createContext, useContext, useState,useRef } from "react";
import { fileExtraction } from "../utils/fileExtraction";
import { UPLOAD } from "../utils/stateConstants";

const MediaContext = createContext();


export const MediaProvider = ({ children }) => {
  const formData= new FormData();
  const multerImage= useRef(null);

  const [cOf, setCof] = useState({
    imageUrl: [],
    imageInformation: [],
    uploadState: UPLOAD.UPLOADING,
  });
  const [surveyPlan, setSurveyPlan] = useState({
    imageUrl: [],
    imageInformation: [],
    uploadState: UPLOAD.UPLOADING,
  });
  const [propertyVisualization, setPropertyVisualization] = useState({
    imageUrl: [],
    imageInformation: [],
    uploadState: UPLOAD.UPLOADING,
  });

  const [cOfMulter, setCofMulter] = useState(null);
  const [surveyPlanMulter, setSurveyPlanMulter] = useState(null);
  const [imageMulter, setImagesMulter] = useState(multerImage.current);

  const uploadCof = async (e) => {
    try {
      setCofMulter(e.target.files);
      const mediaData = await fileExtraction(e.target.files);
      console.log(mediaData, "meda");
      setCof((prevState) => ({
        ...prevState,
        imageUrl: mediaData.imageUrl,
        imageInformation: mediaData.imageInformation,
        uploadState: UPLOAD.UPLOADED,
      }));
    } catch (error) {
      console.error("Error while uploading COF:", error);
    }
  };

  const uploadSurveyPlan = async (e) => {
    try {
      setSurveyPlanMulter(e.target.files);
      const mediaData = await fileExtraction(e.target.files);
      setSurveyPlan((prevState) => ({
        ...prevState,
        imageUrl: mediaData.imageUrl,
        imageInformation: mediaData.imageInformation,
        uploadState: UPLOAD.UPLOADED,
      }));
    } catch (error) {
      console.error("Error while uploading survey plan:", error);
    }
  };

  const uploadPropertyVisualization = async (e) => {
    try {
      multerImage.current = e.target.files[0]
      setImagesMulter(multerImage.current);
      const mediaData = await fileExtraction(e.target.files);
      setPropertyVisualization((prevState) => ({
        ...prevState,
        imageUrl: mediaData.imageUrl,
        imageInformation: mediaData.imageInformation,
        uploadState: UPLOAD.UPLOADED,
      }));
    } catch (error) {
      console.error("Error while uploading images:", error);
    }
  };

  return (
    <MediaContext.Provider
      value={{
        cOf,
        uploadCof,
        surveyPlan,
        uploadSurveyPlan,
        propertyVisualization,
        uploadPropertyVisualization,
        cOfMulter,
        surveyPlanMulter,
        imageMulter,
        formData
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
