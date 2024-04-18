import { useState, useContext, createContext, useEffect, useRef } from "react";
import Web3 from "web3";
import abi from "../contractFIle/AssetRegistry.json";
import { pinAssetOnIPFs, retrieveDataFromPinata } from "../services/pinata";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const walletAddressRef = useRef(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const web3 = new Web3(window.ethereum);

  walletAddressRef.current = localStorage.getItem("walletAddress");

  const changeAddress = () => {
    walletAddressRef.current = localStorage.getItem("walletAddress");
  }

  const initUser = async (data) => {
    setUser(data.user);
    setToken(data.auth);
    runLogoutTimer(data.auth.expiryInSeconds * 1000);
    data.auth.expiryDate =
      new Date().getTime() + data.auth.expiryInSeconds * 1000;
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...data,
      })
    );
  };
  function runLogoutTimer(time) {
    setTimeout(() => {
      logout();
    }, time);
  }
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const setAddress = (address) => {
    setWalletAddress(address);
  };

  const assetContractAddress = process.env.REACT_APP_ASSET_CONTRACT_ADDRESS;
  const nftContractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;

  const contractInstance1 = new web3.eth.Contract(abi.abi, assetContractAddress);
  const contractInstance2 = new web3.eth.Contract(abi.abi, nftContractAddress);

  const saveParcelAssetOnchain = async (data) => {
    const ipfs = await pinAssetOnIPFs(data);
    try {
      const tx = await contractInstance1.methods
        .saveParcelInformation(
          data.ownership.address,
          data.owner.parcelNumber,
          ipfs.Timestamp,
          ipfs.IpfsHash,
          false,
          `https://${ipfs.IpfsHash}`
        )
        .send({ from: data.ownership.address, type: 0 });

      console.log("Transaction sent:", tx);
      return tx; 
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error; 
    }
  };

  const fetchDataByParcelId = async  (address, hash) => {
    try {
      const result = await contractInstance1.methods.getParcelByParcelId(address, hash).call();  

      const data = await retrieveDataFromPinata(result.ipfsHash)

      return data;

    } catch (error) {
      console.error("Error fetching data from blockchain:", error);
      throw error;
    }
  }

  const mintGeoToken = async (data) => {
    const ipfs = await pinAssetOnIPFs(data);
    try {
      const tx = await contractInstance1.methods
        .saveParcelInformation(
          data.ownership.address,
          data.owner.parcelNumber,
          ipfs.Timestamp,
          ipfs.IpfsHash,
          false,
          `https://${ipfs.IpfsHash}`
        )
        .send({ from: data.ownership.address, type: 0 });

      console.log("Transaction sent:", tx);
      return tx; 
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    }
  };




  const fetchAllData = async  () => {
    let data = [];
    try {
      const result = await contractInstance1.methods.getAllParcels().call();

      console.log(result,"chainRes")

      if (Array.isArray(result)) {
        const promiseArray = result.map(async (item, index) => {
          console.log(`Pinned item ${index + 1}:`, item);
          const allData = await retrieveDataFromPinata(item);
          console.log(allData,"we>")
          return allData.data; 
        });

        const resolvedData = await Promise.all(promiseArray);
  
        data = [...data, ...resolvedData];
  
        console.log(data,",,,,,")
  
        console.log("All data retrieved:", data);
  
        return data; 
      }

    } catch (error) {
      console.error("Error fetching data from blockchain:", error);
      throw error; 
    }
  }



  const connectToWallet = async () => {
    setIsWalletConnected(false);

    if (window.ethereum) {

      try {

        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();

        const selectedAccount = accounts[0];

        setWalletAddress(selectedAccount);

        localStorage.setItem("walletAddress", selectedAccount);

        setIsWalletConnected(true);

      } catch (error) {
        console.error("Error connecting to wallet:", error);
        return null;
      }
    } else {
      console.error("No compatible wallet provider detected");
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        initUser,
        logout,
        user,
        setUser,
        userData,
        setUserData,
        connectToWallet,
        walletAddress,
        setAddress,
        isWalletConnected,
        setIsWalletConnected,
        saveOwnerOnchain,
        saveParcelAssetOnchain,
        address: walletAddressRef.current,
        changeAddress,
        fetchDataByParcelId, 
        fetchAllData 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

