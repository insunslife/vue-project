// types/commonResponse.ts

// import axios, { AxiosResponse } from 'axios'
// import type { CommonResponseMeta } from './commonResponseMeta'
/** Axios Response 데이터 형식
 *  config : 요청에 대한 axios 구성 설정
 *  data 서버가 제공한 응답 데이터
 *  headers : 헤더 정보
 *  request : 요청
 *  status : 응답 HTTP 상태 코드
 *  statusText : 응답 HTTP 상태 메시지
 */

// 본인 서버에서 내려주는 응답 구조
// export interface APIResponse<T> {
//   statusCode: number // 상태코드 (보인 서버상태코드)
//   errorCode: number // 에러코드 (본인 서버에러코드)
//   message: string // 메시지
//   result: T // 데이터 내용
//   timestamp: Date // 시간
// }

export interface CommonResponseMeta {
  code: number
  message: string
  dateTime: string // "yyyy-MM-dd HH:mm:ss
  sId: string // // 서버 IP 마지막 자리
}

export interface CommonResponse<T> {
  data: T
  meta: CommonResponseMeta
}

// export interface APIResponse<T> {
//   data: T
//   commonResponseMeta: CommonResponseMeta
// }

// TODO: Axios 라이브러리에서 import한 Response 인터페이스
// interface AxiosResponse<T = any, D = any> {
//   data: T
//   status: number
//   statusText: string
//   headers: RawAxiosResponseHeaders | AxiosResponseHeaders
//   config: InternalAxiosRequestConfig<D>
//   request?: any
// }
