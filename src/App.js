import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/landing/Index";
import Prompt from "./pages/auth/Prompt";
import MarketIndex from "./pages/marketplace/Index";
import { AuthProvider } from "./contexts/authContext";
import { useAuth } from "./contexts/authContext";
import ProductDescription from "./pages/marketplace/ProductDescription";
import Dashboard from "./pages/dashboard/Dashboard";
import RegisterLand from "./pages/dashboard/RegisterLand";
import Rent from "./pages/dashboard/Rent";
import Settings from "./pages/dashboard/Settings";
import { DashboardProvider } from "./contexts/dashboardContext";
import BaseMap from "./pages/map/BaseMap";
import { SingleBaseMap } from "./lib/leaflets";

function App() {
  const auth = useAuth();

  useEffect(() => {
    const accountWasChanged = (accounts) => {
      console.log(accounts, "account....");
      const newAddress = accounts[0];
      auth.changeAddress(newAddress); // Update wallet address in your auth system
    };

    const clearAccount = () => {

      auth.setWalletAddress(null); // Clear wallet address in your auth system
      console.log("clearAccount");
    };

    if (window.ethereum) {
      // Listen for account changes and disconnect event
      window.ethereum.on("accountsChanged", accountWasChanged);
      window.ethereum.on("disconnect", clearAccount);

      // Request accounts initially
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log("Initial accounts:", accounts);
          const initialAddress = accounts[0];
          auth.setWalletAddress(initialAddress); // Set initial wallet address
        })
        .catch((error) => {
          console.error("Error requesting accounts:", error);
          // Handle error appropriately
        });
    } else {
      console.warn("window.ethereum is not available");
    }

    // Cleanup: Remove event listeners when component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", accountWasChanged);
        window.ethereum.off("disconnect", clearAccount);
      }
    };
  }, [auth.setWalletAddress, auth.changeAddress]);

  if(!auth.address) {
    auth.connectToWallet()
  }

  return (
    <AuthProvider>
      <DashboardProvider>
        <Router>
          <div className="font-whyte">
            <Routes>
              <Route path="/" element={<Index />} />
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
                path="/dashboard/2"
                element={
                  <Dashboard>
                    <Settings />
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
    </AuthProvider>
  );
}

export default App;
