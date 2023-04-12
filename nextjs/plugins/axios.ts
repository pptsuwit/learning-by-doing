import axios from "axios";

axios.defaults.headers.common["accept"] = "application/json";
// axios.defaults.headers.common["authorization"] = `Bearer ${localStorage.getItem("token") || ""}`;

const httpService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}${process.env.NEXT_PUBLIC_API_URL_VERSION}`,
  headers: {
    accept: "application/json",
  },
});
httpService.interceptors.response.use(
  (response: any) => {
    return {
      data: response.data.data ?? response.data,
      count: response.data.count,
    };
  },
  (error) => {
    if (error.code === "ERR_NETWORK") return Promise.reject(error);
    error.message = error.response?.data.message ?? error.message;
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default httpService;
