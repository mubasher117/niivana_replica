import axios from "axios"
import { backendUrl, routeBase } from "../config/consts"
import { retrieveData, storeData } from "../util/helpers"
import { refreshAccessToken } from "./auth/Auth"

const BASE_URL = backendUrl + routeBase

const API = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})

API.interceptors.request.use(async config => {
  try {
    const userData = await retrieveData("userData")
    if (
      config &&
      config.headers &&
      (!config.url.includes("login") || !config.url.includes("signup"))
    ) {
      config.headers["Authorization"] = `Token ${userData?.token}`
    }
    return config
  } catch (error) {
    return config
  }
})

API.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    console.log(error)
    if (error.config.url.includes("/auth")) {
      return axios(error.config)
    }
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        //get new access token using refresh token
        let res = await refreshAccessToken()
        console.log("Refresh Res: ", res.data)
        if (res.status === 200 || res.status === 201) {
          //update tokens in store

          await retrieveData("userData").then(data => {
            console.log(data)
            if (data) {
              data.tokens.access.token = res.data.access.token
              storeData("userData", data)
            }
          })

          // continues the request with new access token
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.access.token}`
          return axios(originalRequest)
        } else {
          // NavigationService.resetAndNavigate("SignIn")
          alert({
            message: "Please login and try again",
            type: "danger"
          })
          return Promise.reject(error)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)
export default API
