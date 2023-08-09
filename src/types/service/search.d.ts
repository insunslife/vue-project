// 상품 리스트 검색
export interface SearchPackagesRequest {
  pageIndex: number // 페이지 위치 (기본값 1)
  pageSize: number // 페이지 내 개수 (기본값 20)
  searchWord: string // 검색어
  b2bCategorySeq?: number // B2B 카테고리 시퀀스
  B2BLevelCodeEnum?: string // 패키지 레벨 : BASIC-입문 / BEGIN-초급- / MIDDLE-중급 / HIGH-고급 / EXAM-수험 / ETC-기타
  isRegister: boolean // 수강신청 가능 클래스 여부
}

// export enum B2BLevelCodeEnum {
//   BASIC = '입문',
//   BEGIN = '초급',
//   MIDDLE = '중급',
//   HIGH = '고급',
//   EXAM = '수험',
//   ETC = '기타'
// }

// 상품 리스트 검색
export interface SearchPackagesResponse {
  totalCount: number
  searchPackages: SearchPackageInfo[]
}

// 상품 검색 정보
export interface SearchPackageInfo {
  packageSeq: number // 패키지 시퀀스
  thumbnailPath: string // 썸네일 URL 경로
  title: string // 패키지 제목
  categoryName: string // 카테고리명
  teacherSeq: number // 강사 시퀀스
  teacherName: string // 강사명
  starPoint: number // 별점
  levelCode: string // 패키지 레벨코드
  // levelCodeName: string // 패키지 레벨명 TODO: 백엔드 소스엔 없어서 확인해봐야 함.
  stage: number // 차수 (어드민 차시)
  includeBook: boolean // 교재포함 여부
  classRegistrationStartDate: string // 수강신청 시작일 yyyy.MM.dd
  classRegistrationEndDate: string // 수강신청 종료일 yyyy.MM.dd
  classDurationSettingType: string // 수강기간 설정 유형
  classStartDate: string // 수강 시작일 yyyy.MM.dd
  classEndDate: string // 수강 종료일 yyyy.MM.dd
  classAvailableDays: number // 수강 가능일
  expenseDisplayYn: string // 교육비 노출 여부 (Y/N)
  exceptOptionSalePrice: number // 옵션 제외 판매가(판매금액)
  isRegister: boolean // 수강신청 가능여부
  phaseToPackageSeq: number // 기수에 연결 된 패키지 시퀀스
  packageFreeLecture: PackageFreeLectureDTO // 상품 무료(OT)강의 정보
  levelCodeName: string // 패키지 레벨명
}

// 상품 무료(OT)강의 정보
export interface PackageFreeLectureDTO {
  packageSeq: number // 상품 시퀀스
  packageName: string // 상품 명
  classSeq: number // 클래스 시퀀스
  classSortOrder: number // 클래스 순번
  className: string // 클래스명
  lectureSeq: number // 강의 시퀀스
  lectureTitle: string // 강의명
  lectureSortOrder: number // 강의 순번
  curriculumAssetSeq: number // 커리큘럼 에셋 시퀀스
  mediaContentKey: string // 미디어 컨텐츠 키
}
