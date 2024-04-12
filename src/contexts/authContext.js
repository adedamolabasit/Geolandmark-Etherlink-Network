import { useState, useContext, createContext, useEffect, useRef } from "react";
import Web3 from 'web3';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [walletAddress,setWalletAddress] = useState(null)
  const walletAddressRef = useRef(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

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

  const connectToWallet = async () => {
    setIsWalletConnected(false)

    // Check if MetaMask or other compatible provider is available
    if (window.ethereum) {
      // Create a new Web3 instance using the provider from the browser
      const web3 = new Web3(window.ethereum);
  
      try {
        // Request user permission to connect to their wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Get the current connected account (wallet) from the provider
        const accounts = await web3.eth.getAccounts();

        console.log(accounts,"ore>>>")
  
        // Get the selected account (wallet) address
        const selectedAccount = accounts[0];
        
        setWalletAddress(selectedAccount)
        // Store the wallet address in localStorage
        localStorage.setItem('walletAddress',selectedAccount);

        setIsWalletConnected(true)
  
        // Log the selected account and web3 instance
        console.log('Selected Account:', selectedAccount);
        console.log('Web3 Instance:', web3);
  
        // Return the wallet object containing web3 instance and selected account address

      } catch (error) {
        // Handle errors such as user denial or connection issues
        console.error('Error connecting to wallet:', error);
        return null;
      }
    } else {
      // Provider not detected or not compatible
      console.error('No compatible wallet provider detected');
      return null;
    }
  };


  return (
    <AuthContext.Provider
      value={{ initUser, logout, user, setUser, userData, setUserData, connectToWallet, walletAddress, setAddress, isWalletConnected, setIsWalletConnected}}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
