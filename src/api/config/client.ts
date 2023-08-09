// api/index.ts

import type { B2BReissueAccessTokenResponse } from '@/types/auth/signIn'
import type { CommonResponse } from '@/types/commonResponse'
import type { Axios, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import useStore from '@/stores/b2bStore'
import SignInService from '../auth/SignInService'

// axios 인스턴스 생성
const client: Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 1000 * 30, // 30초
  headers: {
    'Content-Type': 'application/json'
    // 'Origin-Site-Code': 'yanadoo02'
    // Authorization:
    //   'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MDAwMDU5IiwibmFtZSI6Iu2XiOyasOyaqSIsImFmZmlsaWF0ZWRTZXJ2aWNlcyI6IkIyQiIsInJvbGVzIjpbeyJzZXEiOjEzNTc2OTksInVzZXJSb2xlIjoiUk9MRV9CMkJfVVNFUiJ9XSwiZGV2aWNlVHlwZSI6MCwiY3JlYXRlZFRpbWUiOjI5Mjg2NTE4ODM5Nzc0MTUsImlhdCI6MTY5MTM3NDUzMCwiZXhwIjoxNjkxMzk2MTMwfQ.zwHweL5Qi6JkTti2kL0yn4CU7TC9JIElBSNyGeaVR3CIt9M3wqhjbAQT4VezhTVzvm72bt6XsN0OKFgsn74a3Q'
    // Authorization: `Bearer ${store.accessToken}`
  }
})

// jwt 토큰 관련 start
client.interceptors.request.use(
  (config) => {
    const store = useStore()
    // store.loading = false
    if (store.isLogin) {
      console.log('client.ts interceptors.accessToken=' + store.getSignIn?.accessToken)

      config.headers['Origin-Site-Code'] = store.siteCode
      config.headers.Authorization = `Bearer ${store.getSignIn?.accessToken}`
    } else if (config.url?.includes(`${import.meta.env.VUE_APP_AUTH_API_URL}/sign-in/reissue/access-token`)) {
      console.log('client.ts interceptors.refreshToken=' + store.getSignIn?.refreshToken)

      config.headers.Authorization = `Bearer ${store.getSignIn?.refreshToken}`
    } else {
      console.log('not login')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    const store = useStore()
    // store.loading = false
    console.log('client.ts axios.interceptors.error=' + error.config.url)
    console.log('client.ts axios.interceptors.error=' + error.response?.status)
    // 백엔드에서 토큰 검증 후 에러 코드에 대한 처리
    // 419 : accessToken이 만료되어 null 값으로 요청이 간 거라 재발급 후 이전 작업 계속 진행
    // (재발급 요청 중 refreshToken이 null이거나 변조되었을 경우엔 로그인 창을 띄움)
    // 401 : accessToken이 변조되거나 잘못된 토큰이므로 작업을 진행하지 않고 로그인 창을 띄움
    if (store.isLogin) {
      if (error.response && error.response.status === 419) {
        const result: B2BReissueAccessTokenResponse = await SignInService.reissueAccessToken(
          store.getSignIn?.refreshToken
        )
        store.getSignIn!.accessToken = result.accessToken
        // TODO: 동작하는지 확인 필요
        return Promise.resolve(error.config)
      } else if (error.response && error.response.status === 401) {
        store.setSignOut()
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
  }
)
// jwt 토큰 관련 end

export default client

//TODO: GET 메서드
export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
  try {
    const response = await client.get<CommonResponse<T>>(url, config)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed: ' + error)
  }
}

//TODO: POST 메서드
export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
  try {
    const response = await client.post<CommonResponse<T>>(url, data, config)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed: ' + error)
  }
}

//TODO: PUT 메서드
export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
  try {
    const response = await client.put<CommonResponse<T>>(url, data, config)
    return response.data
  } catch (error) {
    throw new Error('Failed: ' + error)
  }
}

//TODO: Delete 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
  try {
    const response = await client.delete<CommonResponse<T>>(url, config)
    return response.data
  } catch (error) {
    throw new Error('Failed: ' + error)
  }
}
