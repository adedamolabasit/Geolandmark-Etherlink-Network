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
// Import the Web3 library
import Web3 from "web3";

function App() {
  const [fetchingUser, setFetchingUser] = useState(true);
  const [walletAccount, setWalletAccount] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    const accountWasChanged = (accounts) => {
      auth.setAddress(accounts[0]);
      console.log('accountWasChanged');
    }
    // const getAndSetAccount = async () => {
    //   const changedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //   setWalletAccount(changedAccounts[0]);
    //   console.log('getAndSetAccount');
    // }
    const clearAccount = () => {
      auth.setAddress(null);
      console.log('clearAccount');
    };

    window.ethereum.on('accountsChanged', accountWasChanged);
    // window.ethereum.on('connect', getAndSetAccount);
    window.ethereum.on('disconnect', clearAccount);
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      console.log('accounts', accounts);
      // No need to set account here, it will be set by the event listener
    }, error => {
      // Handle any UI for errors here, e.g. network error, rejected request, etc.
      // Set state as needed 
    })

    return () => {
      // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
      window.ethereum.off('accountsChanged', accountWasChanged);
      window.ethereum.off('disconnect', clearAccount);
    }
  },[]);

  useEffect(() => {
    const { initUser, user, setUser, logout, connectToWallet } = auth;
    const userObj = JSON.parse(localStorage.getItem("user"));

    // auth.connectToWallet()

    if (userObj) {
      let expiryDate = new Date(userObj.auth?.expiryDate);
      let todaysDate = new Date();
      if (!user) {
        setUser(userObj);
      }

      if (todaysDate > expiryDate) {
        logout();
      }
    } else {
    }
    setFetchingUser(false);
  }, [auth.user, auth.walletAddress]);

  const [contractState, setContractState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState({});

  const web3 = new Web3("https://node.ghostnet.etherlink.com");

  const contractAddress = "0x5359bAe7654ED1C646d4E7d9801AD423bfc27DCf";

  const contractInstance = new web3.eth.Contract(abi.abi, contractAddress);

  const retrieveAllAssets = async () => {
    try {
      const assets = await contractInstance.methods.retrieveAllAsset().call();
      console.log("Existing Assets:");
      assets.forEach((asset) => {
        console.log(
          `Location: ${asset.location}, Description: ${
            asset.description
          }, Longitudes: [${asset.longitudes.join(
            ", "
          )}], Latitudes: [${asset.latitudes.join(
            ", "
          )}], Has Legal Document: ${asset.hasLegalDocument}`
        );
      });
    } catch (error) {
      console.error("Retrieve all assets error:", error);
    }
  };

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
          </Routes>
        </div>
      </Router>
    </DashboardProvider>
  );
}

export default App;
