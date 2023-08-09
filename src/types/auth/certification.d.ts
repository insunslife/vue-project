import type { CertificationMethod } from './signIn'

// 인증번호 발급 API 호출용 일회성 JWT 발급
export interface B2BIssueDisposableJWTResponse {
  jwt: string // 일회성 JWT
}

// 인증번호 발급 (비 로그인용) payload
export interface B2BIssueCertificationCodeByNoSignInRequest {
  token: string // 일회성 JWT
  certificationType: CertificationMethod // 인증 방법 CELLPHONE or EMAIL
  countryCode?: string // 국가코드 (82가 기본값)
  cellPhone?: string // 핸드폰번호
  email?: string // 이메일
}

// 인증번호 인증 (비 로그인용) response
export interface B2BVerifyCertificationCodeNoSignInResponse {
  pcc: string // 최종 확인 인증코드
}

// 인증번호 인증 (비 로그인용) payload
export interface B2BVerifyCertificationCodeByNoSignInRequest {
  certificationType: CertificationMethod // 인증 방법 CELLPHONE or EMAIL
  countryCode?: string // 국가코드 (82가 기본값)
  cellPhone?: string // 핸드폰번호
  email?: string // 이메일
  certNumber: string // 인증번호
}

// 인증번호 발급 (로그인) payload
export interface B2BIssueCertificationCodeBySignInRequest {
  certificationType: CertificationMethod // 인증 방법 CELLPHONE or EMAIL
  countryCode?: string // 국가코드 (82가 기본값)
  cellPhone?: string // 핸드폰번호
  email?: string // 이메일
}

// 인증번호 인증 (로그인) payload
export interface B2BVerifyCertificationCodeBySignInRequest {
  certificationType: CertificationMethod // 인증 방법 CELLPHONE or EMAIL
  countryCode?: string // 국가코드 (82가 기본값)
  cellPhone?: string // 핸드폰번호
  email?: string // 이메일
  certNumber: string // 인증번호
}

// 인증번호 인증 (로그인) response
export interface B2BVerifyCertificationCodeBySignInResponse {
  pcc: string // 최종 확인 인증코드
}
