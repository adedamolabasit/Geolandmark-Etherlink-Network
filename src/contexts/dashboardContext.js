import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
