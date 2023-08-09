// import authStore from '@/stores/authStore'
// import client from './client'
// import { useCookies } from 'vue3-cookies'

// const { cookies } = useCookies()
// const store = authStore()

// const setup = () => {

//   client.interceptors.request.use(
//     async (config) => {
//       console.log('index.js request : ', config)
//       config.headers['x-access-token'] = cookies.get('accessToken')
//       config.headers['x-refresh-token'] = cookies.get('refreshToken')
//       return config
//     },
//     (error) => {
//       console.error('index.js request error : ', error)
//       return Promise.reject(error)
//     }
//   )
//   client.interceptors.response.use(
//     (response) => {
//       console.log('index.js response : ', response)
//       return response
//     },
//     async (error) => {
//       console.error('index.js reqponse error : ', error)
//       if (import.meta.env.VITE_IS_LOGIN === 'Y') {
//         const errorRes = error.response
//         const errorAPI = error.response.config
//         if (cookies.get('refreshToken') === null) {
//           store.commit('auth/needLogin', true)
//           return Promise.reject(error)
//         } else {
//           if (errorRes.status === 419) {
//             // accessToken이 null일 경우 419코드를 받고 토큰 재생성 요청
//             try {
//               await store.dispatch('auth/refreshToken')
//               return axios(errorAPI)
//             } catch (err) {
//               // console.error('err);
//               return Promise.reject(err)
//             }
//           }
//           if (errorRes.status === 401) {
//             //accessToken이 변조 등 유효하지 않은 토큰일 경우
//             console.warn('유효하지   않은 토큰', error)
//             store.commit('auth/needLogin', true)
//             alert('다시 로그인해주시기 바랍니다.')
//             return Promise.reject(error)
//           }
//         }
//       }
//       return Promise.reject(error)
//     }
//   )
// }
// export default setup
// import axios from './client'
// import { useStore } from '@/stores/b2bStore'
// import type { B2BSignInResponse } from '@/types/auth/signIn'
// import { ref } from 'vue'
// import router from '@/router/index'
// // jwt 토큰 관련 start
// const store = useStore()
// const isTokenRefreshing = ref<boolean>(false)
// const requestsQueue = ref<any>([])
// const requestsErrorQueue = ref<any>([])

// axios.interceptors.request.use(
//   (config) => {
//     console.log('==================== 1')
//     console.log(config)
//     console.log('==================== 2')
//     store.loading = true
//     if (config && config.headers) {
//       config.headers['Origin-Site-Code'] = store.siteCode
//       const accessToken = store.accessToken
//       if (store.loggedIn && accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`
//       }
//       if (config.url?.includes(`${import.meta.env.VUE_APP_AUTH_API_URL}/sign-in/reissue/access-token`)) {
//         const refreshToken = store.refreshToken
//         config.headers.Authorization = `Bearer ${refreshToken}`
//       }
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// axios.interceptors.response.use(
//   async (response) => {
//     store.loading = false
//     if (response.config.url === `${import.meta.env.VUE_APP_AUTH_API_URL}/sign-in`) {
//       const result: B2BSignInResponse = response.data.data

//       store.userName = result.user.name
//       store.userProfileImage = result.user.profileImageUrl
//       store.accessToken = result.accessToken
//       store.refreshToken = result.refreshToken
//       store.loggedIn = true

//       if (result.isMassSignUpFirstLogin === true) {
//         checkFirstLogin(result)
//       } else {
//         router.replace('/')
//       }
//     }
//     return response
//   },
//   async (error) => {
//     store.loading = false
//     if (error.response && error.response.status === 401) {
//       const originalRequest = error.config
//       const accessToken = store.accessToken
//       const refreshToken = store.refreshToken

//       if (originalRequest.url === `${import.meta.env.VUE_APP_AUTH_API_URL}/sign-in/reissue/access-token`) {
//         store.logout()
//         return Promise.reject(error)
//       }

//       if (accessToken && !originalRequest._retry) {
//         originalRequest._retry = true

//         const retryRequest = new Promise((resolve, reject) => {
//           requestsQueue.value.push(() => {
//             originalRequest.headers.Authorization = `Bearer ${store.accessToken}`
//             // resolve(axios(originalRequest))
//             resolve(originalRequest)
//           })
//           requestsErrorQueue.value.push(() => {
//             reject('Failed to reissue token')
//           })
//         })

//         if (!isTokenRefreshing.value) {
//           isTokenRefreshing.value = true

//           try {
//             const newAccessToken = await reissueToken(refreshToken)
//             store.accessToken = newAccessToken
//             await flushRequestsQueue()
//             return retryRequest
//           } catch (error) {
//             isTokenRefreshing.value = false
//             store.logout()
//             rejectRequestsErrorQueue()
//             return Promise.reject(error)
//           }
//         } else {
//           return retryRequest
//         }
//       } else {
//         store.logout()
//         return Promise.reject(error)
//       }
//     }
//     return Promise.reject(error)
//   }
// )

// async function flushRequestsQueue() {
//   const requests = [...requestsQueue]
//   requestsQueue.value = []
//   const processedRequests = requests.map((retryRequest) => {
//     return retryRequest(store.accessToken)
//   })
//   return Promise.all(processedRequests)
// }

// async function rejectRequestsErrorQueue() {
//   const requests = [...requestsErrorQueue]
//   requestsErrorQueue.value = []
//   const processedRequests = requests.map((rejectRequest) => {
//     return rejectRequest()
//   })
//   return Promise.all(processedRequests)
// }

// async function reissueToken(refreshToken: string | undefined) {
//   try {
//     const response = await axios.get(`${import.meta.env.VUE_APP_AUTH_API_URL}/sign-in/reissue/access-token`, {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`
//       }
//     })
//     const result = response.data.data

//     if (result && result.accessToken) {
//       const accessToken = result.accessToken
//       return accessToken
//     } else {
//       throw new Error('Failed to reissue access token.')
//     }
//   } catch (error) {
//     throw new Error('Failed to request token reissue.')
//   }
// }

// const checkFirstLogin = async (result: B2BSignInResponse) => {
//   store.isMassSignUpFirstLogin = result.isMassSignUpFirstLogin
//   if (result.isMassSignUpFirstLogin === true) {
//     store.state.PwChangeMassModal = true
//   }
// }
// // jwt 토큰 관련 end
