import Reac, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ProfilePic from "../../assets/user.svg";
import { useAuth } from "../../contexts/authContext";
import { truncateAddress } from "../../utils/truncateAddress";
import Web3 from "web3";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const { logout, user, connectToWallet, walletAddress, isWalletConnected } =
    useAuth();

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
                <button className="w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold ">
                  Dashboard
                </button>
              </Link>

              <p className="text-base font-bold text-cyan-600 cursor-pointer">
                {truncateAddress(walletAddress)}
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
