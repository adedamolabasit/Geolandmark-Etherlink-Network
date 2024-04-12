import axios from "axios"


const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:7000/v1/'
  // baseURL: 'https://api.10xengineering.xyz/v1/',
});

axiosApiInstance.interceptors.request.use(
  (config) => {
    const value = localStorage.getItem("user");
    if (value) {
      const { id, auth } = JSON.parse(value);
      config.headers = {
        Authorization: `Bearer ${auth.token}`,
        Accept: "application/json",
        "x-user-id": id,
        ...config.headers,
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Add the return statement here
  }
);

export default axiosApiInstance;
