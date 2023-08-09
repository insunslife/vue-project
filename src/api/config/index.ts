// // api/index.ts

// import type { Axios, AxiosRequestConfig } from 'axios'
// import axios from 'axios'
// // import type { APIResponse } from '@/types/commonResponse'
// import type { CommonResponse } from '@/types/commonResponse'
// // import { useStore } from '@/stores/b2bStore'
// // import { reissueAccessToken } from '@/api/auth/signIn'

// // const store = useStore()

// // let isTokenRefreshing: boolean = false
// // let requestsQueue: any[] = []
// // let requestsErrorQueue: any[] = []
// // axios 인스턴스 생성
// const client: Axios = axios.create({
//   // baseURL: 'http://localhost:3000',
//   baseURL: import.meta.env.VITE_API_URL as string,
//   // baseURL: import.meta.env.VITE_AUTH_API_URL as string,
//   // baseURL: import.meta.env.VITE_CLS_API_URL as string,
//   timeout: 1000 * 30, // 30초
//   headers: {
//     'Content-Type': 'application/json',
//     'Origin-Site-Code': 'yanadoo02',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MDAwMDU5IiwibmFtZSI6Iu2XiOyasOyaqSIsImFmZmlsaWF0ZWRTZXJ2aWNlcyI6IkIyQiIsInJvbGVzIjpbeyJzZXEiOjEzNTc2OTksInVzZXJSb2xlIjoiUk9MRV9CMkJfVVNFUiJ9XSwiZGV2aWNlVHlwZSI6MCwiY3JlYXRlZFRpbWUiOjIxNzI3MTk5NjE0MDkxMTcsImlhdCI6MTY5MDYxODYzMCwiZXhwIjoxNjkwNjQwMjMwfQ.Ti77qfjBiTvPZL1H1UaPLasjQCQPz1RFXZMqmsIwH5wEAI-PVCWMIpj7OWSx9U-pv9rX26aPv_pXBWEK9M5dvw'
//     // Authorization: `Bearer ${store.accessToken}`
//   }
// })
// export default client

// const clientAuth: Axios = axios.create({
//   // baseURL: 'http://localhost:3000',
//   baseURL: import.meta.env.VITE_AUTH_API_URL as string,
//   // baseURL: import.meta.env.VITE_AUTH_API_URL as string,
//   // baseURL: import.meta.env.VITE_CLS_API_URL as string,
//   timeout: 1000 * 30, // 30초
//   headers: {
//     'Content-Type': 'application/json',
//     'Origin-Site-Code': 'yanadoo02'
//     // Authorization:
//     //   'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MDAwMDU5IiwibmFtZSI6Iu2XiOyasOyaqSIsImFmZmlsaWF0ZWRTZXJ2aWNlcyI6IkIyQiIsInJvbGVzIjpbeyJzZXEiOjEzNTc2OTksInVzZXJSb2xlIjoiUk9MRV9CMkJfVVNFUiJ9XSwiZGV2aWNlVHlwZSI6MCwiY3JlYXRlZFRpbWUiOjIxNzI3MTk5NjE0MDkxMTcsImlhdCI6MTY5MDYxODYzMCwiZXhwIjoxNjkwNjQwMjMwfQ.Ti77qfjBiTvPZL1H1UaPLasjQCQPz1RFXZMqmsIwH5wEAI-PVCWMIpj7OWSx9U-pv9rX26aPv_pXBWEK9M5dvw'
//     // Authorization: `Bearer ${store.accessToken}`
//   }
// })
// export default clientAuth

// // client.interceptors.request.use(
// //   async (config) => {
// //     store.loading = true

// //     if (config && config.headers) {
// //       config.headers['Origin-Site-Code'] = store.siteCode
// //       if (store.loggedIn && store.accessToken) {
// //         config.headers.Authorization = `Bearer ${store.accessToken}`
// //       } else if (config.url?.includes(`${import.meta.env.VUE_APP_AUTH_API_URL}/sign-in/reissue/access-token`)) {
// //         config.headers.Authorization = `Bearer ${store.refreshToken}`
// //       }
// //     }
// //     return config
// //   },
// //   (error) => {
// //     return Promise.reject(error)
// //   }
// // )

// // client.interceptors.response.use(
// //   async (response) => {
// //     return response
// //   },
// //   async (error) => {
// //     store.loading = false

// //     // accessToken이 null일 경우 419코드를 받고 토큰 재생성 요청
// //     if (error.response.status === 419) {
// //       try {
// //         const newAccessToken = await reissueAccessToken(store.refreshToken)
// //         store.accessToken = newAccessToken.data.accessToken
// //         return axios(error.config)
// //       } catch (error) {
// //         return Promise.reject(error)
// //       }
// //     }

// //     // accessToken이 변조 등 유효하지 않은 토큰일 경우
// //     if (error.response.status === 401) {

// //       if (error.config.url === `${import.meta.env.VUE_APP_AUTH_API_URL}/sign-in/reissue/access-token`) {
// //         store.logout()
// //         return Promise.reject(error)
// //       }

// //       if (store.accessToken && !error.config._retry) {
// //         error.config._retry = true

// //         const retryRequest = new Promise((resolve, reject) => {
// //           requestsQueue.push(() => {
// //             error.config.headers.Authorization = `Bearer ${store.accessToken}`
// //             resolve(axios(error.config))
// //           })
// //           requestsErrorQueue.push(() => {
// //             reject('Failed to reissue token')
// //           })
// //         })
// //         if (!isTokenRefreshing) {
// //           isTokenRefreshing = true
// //           try {
// //             const newAccessToken = await reissueAccessToken(store.refreshToken)
// //             store.refreshToken = newAccessToken.data.accessToken
// //             await flushRequestsQueue()
// //             return retryRequest
// //           } catch (error) {
// //             isTokenRefreshing = false
// //             store.logout()
// //             rejectRequestsErrorQueue()
// //             return Promise.reject(error)
// //           }
// //         } else {
// //           return retryRequest
// //         }
// //       } else {
// //         store.logout()
// //         return Promise.reject(error)
// //       }
// //     }
// //     return Promise.reject(error)
// //   }
// // )

// // async function flushRequestsQueue() {
// //   const requests = [...requestsQueue]
// //   requestsQueue = []
// //   const processedRequests = requests.map((retryRequest) => {
// //     return retryRequest(store.accessToken)
// //   })
// //   return Promise.all(processedRequests)
// // }

// // async function rejectRequestsErrorQueue() {
// //   const requests = [...requestsErrorQueue]
// //   requestsErrorQueue = []
// //   const processedRequests = requests.map((rejectRequest) => {
// //     return rejectRequest()
// //   })
// //   return Promise.all(processedRequests)
// // }

// //TODO: GET 메서드
// export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
//   console.log('getData:' + url)
//   try {
//     const response = await client.get<CommonResponse<T>>(url, config)
//     return response.data
//   } catch (error) {
//     console.log(error)
//     throw new Error('Failed: ' + error)
//   }
// }

// //TODO: POST 메서드
// export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
//   try {
//     const response = await client.post<CommonResponse<T>>(url, data, config)
//     return response.data
//   } catch (error) {
//     console.log(error)
//     throw new Error('Failed: ' + error)
//   }
// }

// //TODO: PUT 메서드
// export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
//   try {
//     const response = await client.put<CommonResponse<T>>(url, data, config)
//     return response.data
//   } catch (error) {
//     throw new Error('Failed: ' + error)
//   }
// }

// //TODO: Delete 메서드
// export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
//   try {
//     const response = await client.delete<CommonResponse<T>>(url, config)
//     return response.data
//   } catch (error) {
//     throw new Error('Failed: ' + error)
//   }
// }

// // ########## auth ##########
// export const getDataAuth = async <T>(url: string, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
//   console.log('getData:' + url)
//   try {
//     const response = await clientAuth.get<CommonResponse<T>>(url, config)
//     return response.data
//   } catch (error) {
//     console.log(error)
//     throw new Error('Failed: ' + error)
//   }
// }

// //TODO: POST 메서드
// export const postDataAuth = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
//   try {
//     const response = await clientAuth.post<CommonResponse<T>>(url, data, config)
//     return response.data
//   } catch (error) {
//     console.log(error)
//     throw new Error('Failed: ' + error)
//   }
// }

// //TODO: PUT 메서드
// export const putDataAuth = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
//   try {
//     const response = await clientAuth.put<CommonResponse<T>>(url, data, config)
//     return response.data
//   } catch (error) {
//     throw new Error('Failed: ' + error)
//   }
// }

// //TODO: Delete 메서드
// export const deleteDataAuth = async <T>(url: string, config?: AxiosRequestConfig): Promise<CommonResponse<T>> => {
//   try {
//     const response = await clientAuth.delete<CommonResponse<T>>(url, config)
//     return response.data
//   } catch (error) {
//     throw new Error('Failed: ' + error)
//   }
// }
