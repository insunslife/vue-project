// 개별가입 가능여부 확인 response
export interface B2BIsIndividualResponse {
  isIndividual: boolean
}

// 회원가입시에 입력할 추가사항 조회 response
export interface B2BSearchSignUpAdditionalItemResponse {
  isAffiliateName: boolean // 계열사명 입력 여부
  isEmployeeIdentificationNumber: boolean // 사번 입력 여부
  isDepartmentName: boolean // 부서명 입력 여부
  isPosition: boolean // 직책 입력 여부
  isJobGrade: boolean // 직급 입력 여부
  isNote: boolean // 비고/기타 입력 여부
}

// B2B 회원가입 payload
export interface B2BSignUpRequest {
  userId: string // 아이디
  password: string // 비밀번호
  userName: string // 이름
  countryCode: string // 국가코드
  cellPhone: string // 핸드폰번호
  email: string // 이메일
  companyCode: string // 기업 고유 코드
  isTermsAgree: boolean // 이용약관 동의 여부
  isPrivacyProvideAgree: boolean // 개인정보 수집 및 이용 동의 여부
  affiliateName?: string // 계열사명
  employeeIdentificationNumber?: string // 사번
  departmentName?: string // 부서명
  position?: string // 직책
  jobGrade?: string // 직급
  note?: string // 비고/기타
  pcc: string // 최종 확인 인증코드
}

// B2B 회원가입 response
export interface B2BSignUpResponse {
  userId: string // 아이디
  userName: string // 이름
}

// ##### overseas ##### //
// 해외거주자 가입메일 인증 payload
export interface VerifyOverseasSignUpMailRequest {
  token: string // 인증코드
}

// 해외거주자 가입메일 인증 response
export interface VerifyOverseasSignUpMailResponse {
  email: string // 이메일
  companyCode: string // 기업 고유 코드
}

// 해외거주자 회원 가입 payload
export interface B2BOverseasSignUpRequest {
  userId: string // 아이디
  password: string // 비밀번호
  userName: string // 이름
  email: string // 이메일
  companyCode: string // 기업 고유 코드
  isTermsAgree: boolean // 이용약관 동의 여부
  isPrivacyProvideAgree: boolean // 개인정보 수집 및 이용 동의 여부
  affiliateName?: string // 계열사명
  employeeIdentificationNumber?: string // 사번
  departmentName?: string // 부서명
  position?: string // 직책
  jobGrade?: string // 직급
  note?: string // 비고/기타
  pcc: string // 최종 확인 인증코드
}

// 해외거주자 회원 가입 response
export interface B2BOverseasSignUpResponse {
  userId: string // 아이디
  userName: string // 이름
  siteCode: string // 사이트 코드
}
