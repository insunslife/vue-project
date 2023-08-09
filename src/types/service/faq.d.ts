// FAQ 그룹 (카테고리) 목록
export interface FaqGroupListResponse {
  code: string
  value: string
}

// FAQ 목록
export interface FaqListResponse {
  faqSeq: number
  faqGroup: string
  title: string
  contents: string
}

// B2B 프론트 자주묻는질문(FAQ) 조회
export interface FindFaqRequest {
  pageIndex: number // default 1
  pageSize: number // default 10
  faqGroup: string
  titleContents: string
}

// FAQ 목록
export interface FindFaqsResponse {
  totalCount: number
  response: FaqListResponse[]
}

// B2B 메인 자주묻는질문(Faq)
export interface MainFaqResponse {
  faqSeq: number
  title: string
}  


// FAQ 상세
export interface FindFaqDetailResponse {
  faqSeq: number
  faqGroup: string
  title: string
  contents: string
}




