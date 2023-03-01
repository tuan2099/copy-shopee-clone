import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { AuthResponse } from 'src/types/auth.type'
import { clearAccesTokenFromLocalStorage, getAccesToken, saveAccesTokenToLocalStorage, setProfile } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccesToken()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token // bằng giá trị access token lấy ra từ response
          saveAccesTokenToLocalStorage(this.accessToken)
          setProfile(data.data.user)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearAccesTokenFromLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
