// B2B 고객사 로고
export interface HomepageLogoResponse {
  logoFilePath: string
}

// b2b 메인 배너
export interface BannerResponse {
  sortOrder: number
  bannerFilePath: string
  link: string
}

// B2B 메인 패키지
export interface FindDisplayMainPackagesResponse {
  groupTitle: string
  displayMainPackages: DisplayMainPackageInfo[]
}

export interface DisplayMainPackageInfo {
  groupTitle: string
  sortOrder: number
  thumbnailPath: string
  categoryName: string
  teacherName: string
  packageName: string
  starPoint: number
  levelCode: string
  includeBook: boolean
  stage: number
  packageSeq: number
}

// B2B 메인 상단고정 공지사항
export interface MainFixedNoticeResponse {
  serviceNoticeSeq: number
  title: string
}

// B2B 메인 공지사항
export interface MainNoticeResponse {
  serviceNoticeSeq: number
  title: string
}

// B2B 메인 자주묻는질문(Faq)
export interface MainFaqResponse {
  faqSeq: number
  title: string
}

// b2b 메인 - 수강중인 클래스 정보
export interface FindMainMyClassRunningResponse {
  studyEntranceSeq: number
  packageSeq: number
  remainingDays: number
  packageName: string
  categoryName: string
  teacherName: string
}

// b2b 메인 - 수강중인 클래스 목록
export interface FindMyClassRunningListResponse {
  totalCount: number
  myClasses: FindMainMyClassRunningResponse[]
}

// B2B 로그인페이지 공지사항
export interface LoginNoticeResponse {
  loginNoticeDisplayYn: string
  loginNoticeContent: string
}

// export enum MainPackageDisplayTypeEnum {
//   TOP, // 인기 클래스
//   PICK // 추천 클래스
// }
