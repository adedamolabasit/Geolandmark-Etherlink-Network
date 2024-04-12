import { containsSpecialChars } from ".";
import Check from "../assets/pSuccess.svg";
import Error from "../assets/pError.svg";



export const PasswordCheck = ({ password }) => {
    return (
      <div className="relative">
        <div className="absolute w-[50vw] ">
          <h6 className="text-zinc-400 text-[13px] font-bold leading-none">
            Password must contain at least:
          </h6>
          <div className="flex gap-4 pt-2">
            <div className="flex gap-2">
              <img src={password.length > 7 ? Check : Error} alt="" />
              <p className={`${ password.length > 7 ? "text-cyan-600" : "text-red-500" } text-[13px] font-normal leading-none`}>
                8 or more characters
              </p>
            </div>
            <div className="flex gap-2">
              <img src={/[a-z]/.test(password) ? Check : Error} alt="" />
              <p className={`${/[a-z]/.test(password) ? "text-cyan-600" : "text-red-500"} text-[13px] font-normal leading-none`}>
                1 lowercase character
              </p>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <div className="flex gap-2">
              <img src={/[A-Z]/.test(password) ? Check : Error} alt="" />
              <p className={`${/[A-Z]/.test(password) ? "text-cyan-600" : "text-red-500"} text-[13px] font-normal leading-none`}>
              1 uppercase character
              </p>
            </div>
            <div className="flex gap-2">
              <img src={containsSpecialChars(password) ? Check : Error} alt="" />
              <p className={`${containsSpecialChars(password) ? "text-cyan-600" : "text-red-500" } text-[13px] font-normal leading-none`}>
              1 special character
              </p>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <div className="flex gap-2">
              <img src={/[0-9]/.test(password) ? Check : Error} alt="" />
              <p className={`${/[0-9]/.test(password) ? "text-cyan-600" : "text-red-500" } text-[13px] font-normal leading-none`}>
              1 number
              </p>
            </div>
          </div>
        </div>
      </div>
  
    );
  };