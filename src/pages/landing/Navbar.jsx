import Reac, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ProfilePic from "../../assets/user.svg";
import { useAuth } from "../../contexts/authContext";
import { truncateWalletAddress } from "../../utils/truncateAddress";
import Web3 from "web3";
import { generateKYCToken } from "../../services/kycConfiguration";
import axios from "axios"


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [kycToken, setKYCtoken] = useState("");
  const { logout, user, connectToWallet, walletAddress, isWalletConnected, address } =
    useAuth();

    const getKYCtoken = async () => {
      try {
        const options = {
          method: 'POST',
          url: 'http://localhost:4000/api/getToken', // Specify your backend server endpoint
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
          },
          data: {
            address: walletAddress, // Include the address in the request body
          },
        };
    
        const response = await axios(options);
        console.log(response.data); // Log the response data from the backend
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    };

  return (
    <nav className="flex items-center justify-between  w-full">
      <Link to="/">
        <img src={logo} className=" md:h-[7.41vh] h-[3.79vh]  " />
      </Link>
      {location.pathname === "/" ? (
        <Link to="/map">
          <button className="bg-[#009FBD] font-bold w-[21.79vw] md:w-[10.42vw] h-[3.01vh] md:h-[4.72vh] md:rounded-[0.53rem] rounded-[0.22rem] md:text-sm  text-xs hover:bg-opacity-75 ">
            Get Started!
          </button>
        </Link>
      ) : (
        <div className="flex items-end gap-4 ">
          {walletAddress !== null ? (
            <div className="flex items-center gap-4 text-white">
              <Link to="/map">
                <button className="w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold ">
                  Map
                </button>
              </Link>
              <Link to="/marketplace">
                <button className="w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold  ">
                  Marketplace
                </button>
              </Link>
              <Link to="/dashboard/1">
                <button
                  onClick={() => getKYCtoken()}
                  className="w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold "
                >
                  Dashboard
                </button>
              </Link>

              <p className="text-base font-bold text-cyan-600 cursor-pointer">
                {truncateWalletAddress(walletAddress)}
              </p>
              <img
                src={ProfilePic}
                alt="profile"
                className="w-[3.4896vw] border border-full bg-stone-950  border-dashed rounded-full border-cyan-600"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4 text-white">
              <Link to="/map">
                <button className="w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold ">
                  Map
                </button>
              </Link>
              <Link to="/marketplace">
                <button className="w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold  ">
                  Marketplace
                </button>
              </Link>
              <button onClick={connectToWallet}>
                <h1 className="bg-[#009FBD] font-bold w-[21.79vw] md:w-[8.28vw] h-[3.01vh] md:h-[4.72vh] md:rounded-[0.53rem] rounded-[0.22rem] md:text-sm  text-xs hover:bg-opacity-75 flex items-center justify-center ">
                  Connect Wallet
                </h1>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
