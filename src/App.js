import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/landing/Index";
import AppSignUp from "./pages/auth/AppSignUp";
import Prompt from "./pages/auth/Prompt";
import MarketIndex from "./pages/marketplace/Index";
import Property from "./pages/marketplace/Property";
import { PropertyProvider } from "./contexts/propertyContext";
import { AuthProvider } from "./contexts/authContext";
import AppSignIn from "./pages/auth/AppSignIn";
import { useAuth } from "./contexts/authContext";
import ProductDescription from "./pages/marketplace/ProductDescription";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/dashboard/Home";
import Market from "./pages/dashboard/MarketIndex";
import RegisterLand from "./pages/dashboard/RegisterLand";
import Rent from "./pages/dashboard/Rent";
import History from "./pages/dashboard/History";
import Settings from "./pages/dashboard/Settings";
import { DashboardProvider } from "./contexts/dashboardContext";
import BaseMap from "./pages/map/BaseMap";
import abi from "./contractFIle/AssetRegistry.json";
import Web3 from "web3";
import { SingleBaseMap } from "./lib/leaflets";

function App() {


  const auth = useAuth();

  useEffect(() => {
    const accountWasChanged = (accounts) => {
      console.log(accounts, "account....");
      localStorage.setItem("walletAddress", accounts[0]);
      // Assuming auth is defined elsewhere, changeAddress should be called on auth object
      // auth.changeAddress();
    };
  
    const clearAccount = () => {
      localStorage.removeItem("walletAddress");
      // Assuming auth is defined elsewhere, setAddress should be called on auth object
      // auth.setAddress(null);
      console.log("clearAccount");
    };
  
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountWasChanged);
      window.ethereum.on("disconnect", clearAccount);
    
      // Request accounts initially
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log("Initial accounts:", accounts);
          // No need to set account here, it will be set by the event listener
        })
        .catch((error) => {
          console.error("Error requesting accounts:", error);
          // Handle error appropriately
        });
    } else {
      console.warn("window.ethereum is not available");
    
    
    }
  
    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", accountWasChanged);
        window.ethereum.off("disconnect", clearAccount);
      }
    };
  }, []); // Empty dependency array because the functions are defined inside the useEffect
  

  return (
    <DashboardProvider>
      <Router>
        <div className="font-whyte">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<AppSignUp />} />
            <Route path="/login" element={<AppSignIn />} />
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/marketplace" element={<MarketIndex />} />
            <Route path="/map" element={<BaseMap />} />
            <Route path="/marketplace/:id" element={<ProductDescription />} />
            <Route
              path="/dashboard/1"
              element={
                <Dashboard>
                  <RegisterLand />
                </Dashboard>
              }
            />
            <Route
              path="/dashboard/2"
              element={
                <Dashboard>
                  <Rent />
                </Dashboard>
              }
            />
            <Route
              path="/dashboard/5"
              element={
                <Dashboard>
                  <SingleBaseMap />
                </Dashboard>
              }
            />
          </Routes>
        </div>
      </Router>
    </DashboardProvider>
  );
}

export default App;
