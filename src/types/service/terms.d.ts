export interface FindTermsRequest {
  termsType: string
  termsSeq: number | string
}

export interface FindTermsResponse {
  termsSeq: number
  terms: Terms
  termsList: Terms[]
}

// 약관 정보 (브랜드 구분 포함)
export interface Terms {
  termsSeq: number
  brandCode: string
  termsType: string
  title: string
  content1: string
  content2: string
  revisionDate: string // 'yyyy-MM-dd HH:mm:ss'
  useYn: string // 사용 여부 (Y : 사용 / N : 삭제)
  registDate: string // 등록일
  updateDate: string // 수정일
  registUserSeq: number // 등록자
  updateUserSeq: number // 수정자
}
