// // api/index.ts

// import type { Axios, AxiosRequestConfig } from 'axios'
// import axios from 'axios'
// // import type { APIResponse } from '@/types/commonResponse'
// import type { CommonResponse } from '@/types/commonResponse'

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
// export const postDataAuth = async <T>(
//   url: string,
//   data?: any,
//   config?: AxiosRequestConfig
// ): Promise<CommonResponse<T>> => {
//   try {
//     const response = await clientAuth.post<CommonResponse<T>>(url, data, config)
//     return response.data
//   } catch (error) {
//     console.log(error)
//     throw new Error('Failed: ' + error)
//   }
// }

// //TODO: PUT 메서드
// export const putDataAuth = async <T>(
//   url: string,
//   data?: any,
//   config?: AxiosRequestConfig
// ): Promise<CommonResponse<T>> => {
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
