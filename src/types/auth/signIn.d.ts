// Web 로그인 payload
export interface B2BSignInRequest {
  deviceType: number // 디바이스 정보 (0: Web)
  siteCode: string // 사이트 코드
  userId: string // 아이디
  password: string // 비밀번호
  isKeepSignIn?: boolean // 로그인 유지 여부
}

// Web 로그인 response
export interface B2BSignInResponse {
  accessToken: string // access token
  refreshToken: string // refresh token
  user: UserInfoByB2BSignInByWeb // 회원 정보
  isMassSignUpFirstLogin: boolean // 일괄 가입 최초 로그인 여부
  lastLoginDateTime: string // 마지막 로그인 일시 yyyy-MM-dd HH:mm:ss
}

export interface UserInfoByB2BSignInByWeb {
  name: string // 이름
  profileImageUrl: string // 프로필 이미지 URL
}

// access token 재발급 response
export interface B2BReissueAccessTokenResponse {
  accessToken: string // access token
}

// ID 찾기 payload
export interface B2BFindUserIdRequest {
  userName: string // 이름
  certificationType: CertificationMethod // 인증 방법 CELLPHONE or EMAIL
  countryCode?: string // 국가코드 (82가 기본값)
  cellPhone?: string // 핸드폰번호
  email?: string // 이메일
  companyCode: string // 기업 고유 코드
  pcc: string // 최종 확인 인증코드
}

// export enum CertificationMethod {
//   CELLPHONE,
//   EMAIL
// }

// ID 찾기 response
export interface B2BFindUserIdResponse {
  userId: string // 아이디
  signUpDate: string // 가입일자 yyyy.MM.dd
}

// 비밀번호 찾기 payload
export interface B2BFindPasswordRequest {
  userId: string // 아이디
  userName: string // 이름
  certificationType: CertificationMethod // 인증 방법 CELLPHONE or EMAIL
  countryCode?: string // 국가코드 (82가 기본값)
  cellPhone?: string // 핸드폰번호
  email?: string // 이메일
  companyCode: string // 기업 고유 코드
  pcc: string // 최종 확인 인증코드
}

// 비밀번호 찾기용 비밀번호 변경 payload
export interface B2BFindLaterChangePasswordRequest {
  cpcc: string // 비밀번호 변경용 인증코드
  newPassword: string // 변경할 신규 비밀번호
}

export interface B2BFindPasswordResponse {
  cpcc: string // 비밀번호 변경용 인증코드
}

// 최초 로그인한 일괄가입자 정보 조회 response
export interface B2BGetFirstSignInMassMeResponse {
  cellPhone: string // 핸드폰번호
  email: string // 이메일
}

// 최초 로그인한 일괄가입자 비밀번호 변경 payload
export interface B2BChangePasswordOfFirstSignInMassUserRequest {
  cellPhone: string // 핸드폰번호
  email: string // 이메일
  password: string // 비밀번호
  isTermsAgree: boolean // 이용약관 동의 여부
  isPrivacyAgree: boolean // 개인정보 수집 및 이용 동의 여부
}
