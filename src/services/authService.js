import axios from "../axios";

export const signup = async (userObj) => {
  return axios.post("auth/signup", userObj);
};

export const signin = async (user) => {
  return axios.post("auth/login", user);
};
export const signon = () => {
  return axios.get("auth/indoor", {withCredentials:true});
};