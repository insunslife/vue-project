// axiosConfig.js
// import axios from 'axios'
// import b2bStore from '@/store/b2bStore'
// import router from '@/router'
// import { ref } from 'vue'
// const store = b2bStore()
// Create an instance of Axios with your custom configuration
// const axiosInstance = axios.create({
//   baseURL: 'https://dev.yanadoo.co.kr/b2b',
//   timeout: 10000 // Request timeout in milliseconds
// headers: {
//   'Content-Type': 'application/json'
// }
// })

// axiosInstance.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// )
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// )

// let isTokenRefreshing = ref(false)
// let requestsQueue = ref([])
// let requestsErrorQueue = ref([])

// axiosInstance.interceptors.request.use(
//   (config) => {
//     store.dispatch('loadComplate', true)
//     if (config && config.headers) {
//       config.headers['Origin-Site-Code'] = store.state.siteCode
//       const accessToken = store.state.accessToken
//       if (store.state.loggedIn && accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`
//       }
//       if (config.url?.includes('https://dev-auth.yanadoo.co.kr/b2b/sign-in/reissue/access-token')) {
//         const refreshToken = store.state.refreshToken
//         config.headers.Authorization = `Bearer ${refreshToken}`
//       }
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// axiosInstance.interceptors.response.use(
//   async (response) => {
//     store.dispatch('loadComplate', false)
//     if (response.config.url === 'https://dev-auth.yanadoo.co.kr/b2b/sign-in') {
//       const responseData = response.data.data
//       const accessToken = responseData.accessToken
//       const refreshToken = responseData.refreshToken
//       const userName = responseData.user.name
//       const userProfileImage = responseData.user.profileImageUrl
//       store.dispatch('registerUser', { userName, userProfileImage })
//       store.dispatch('token', { accessToken, refreshToken })
//       store.dispatch('login', true)

//       if (responseData.isMassSignUpFirstLogin === true) {
//         checkFirstLogin(responseData)
//       } else {
//         router.replace('/')
//       }
//     }

//     return response
//   },
//   async (error) => {
//     store.dispatch('loadComplate', false)
//     if (error.response && error.response.status === 401) {
//       const originalRequest = error.config
//       const accessToken = store.state.accessToken
//       const refreshToken = store.state.refreshToken

//       if (
//         originalRequest.url === 'https://dev-auth.yanadoo.co.kr/b2b/sign-in/reissue/access-token'
//       ) {
//         store.dispatch('logout')
//         return Promise.reject(error)
//       }

//       if (accessToken && !originalRequest._retry) {
//         originalRequest._retry = true

//         const retryRequest = new Promise((resolve, reject) => {
//           requestsQueue.value.push(() => {
//             originalRequest.headers.Authorization = `Bearer ${store.state.accessToken}`
//             resolve(axios(originalRequest))
//           })
//           requestsErrorQueue.push(() => {
//             reject('Failed to reissue token')
//           })
//         })

//         if (!isTokenRefreshing) {
//           isTokenRefreshing = true

//           try {
//             const newAccessToken = await reissueToken(refreshToken)
//             store.dispatch('refresh', newAccessToken)
//             await flushRequestsQueue()

//             return retryRequest
//           } catch (error) {
//             isTokenRefreshing = false
//             store.dispatch('logout')
//             rejectRequestsErrorQueue()

//             return Promise.reject(error)
//           }
//         } else {
//           return retryRequest
//         }
//       } else {
//         store.dispatch('logout')
//         return Promise.reject(error)
//       }
//     }

//     return Promise.reject(error)
//   }
// )

// async function flushRequestsQueue() {
//   const requests = [...requestsQueue]
//   requestsQueue = []

//   const processedRequests = requests.map((retryRequest) => {
//     return retryRequest(store.state.accessToken)
//   })

//   return Promise.all(processedRequests)
// }

// async function rejectRequestsErrorQueue() {
//   const requests = [...requestsErrorQueue]
//   requestsErrorQueue = []

//   const processedRequests = requests.map((rejectRequest) => {
//     return rejectRequest()
//   })

//   return Promise.all(processedRequests)
// }

// async function reissueToken(refreshToken) {
//   try {
//     const response = await axios.get(
//       `${process.env.VUE_APP_AUTH_API_URL}/sign-in/reissue/access-token`,
//       {
//         headers: {
//           Authorization: `Bearer ${refreshToken}`
//         }
//       }
//     )
//     const responseData = response.data.data

//     if (responseData && responseData.accessToken) {
//       const accessToken = responseData.accessToken
//       return accessToken
//     } else {
//       throw new Error('Failed to reissue access token.')
//     }
//   } catch (error) {
//     throw new Error('Failed to request token reissue.')
//   }
// }

// const checkFirstLogin = async (responseData) => {
//   store.commit('setIsMassSignUpFirstLogin', responseData.isMassSignUpFirstLogin)
//   if (responseData.isMassSignUpFirstLogin === true) {
//     store.commit('openModal', 'PwChangeMass')
//   }
// }

// export default axiosInstance

