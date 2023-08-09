// 회원 정보 조회 response
export interface B2BFindMeResponse {
  user: UserByB2BFindMeResponse // 회원 정보
  company: CompanyByB2BFindMeResponse // 회사 관련 정보
}

export interface UserByB2BFindMeResponse {
  id: string // 아이디
  name: string // 이름
  cellPhone: string // 핸드폰번호
  email: string // 이메일
  isReceiveSms: boolean // SMS 수신동의 여부
  isReceiveEmail: boolean // EMAIL 수신동의 여부
  zipCode: string // 우편번호
  address: string // 주소
  detailAddress: string // 상세주소
}

export interface CompanyByB2BFindMeResponse {
  companyCode: string // 기업 고유 코드
  affiliateName: string // 계열사명
  employeeIdentificationNumber: string // 사번
  departmentName: string // 부서명
  position: string // 직책
  jobGrade: string // 직급
  note: string // 비고/기타
}

// 회원정보 수정 payload
export interface B2BModifyMeRequest {
  email: string // 이메일
  isReceiveSms: boolean // SMS 수신동의 여부
  isReceiveEmail: boolean // EMAIL 수신동의 여부
  zipCode: string // 우편번호
  address: string // 주소
  detailAddress: string // 상세주소
  affiliateName: string // 계열사명
  employeeIdentificationNumber: string // 사번
  departmentName: string // 부서명
  position: string // 직책
  jobGrade: string // 직급
  note: string // 비고/기타
}

// 비밀번호 변경 payload
export interface B2BModifyPasswordRequest {
  nowPassword: string // 현재 비밀번호
  newPassword: string // 변경할 비밀번호
}
