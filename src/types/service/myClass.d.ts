// 메인 상품 목록
export interface FindMyClassRegistrationsResponse {
  studyEntranceSeq: number
  packageSeq: number
  categoryName: string
  teacherName: string
  packageTypeCode: string
  title: string
  classRegistrationType: string
  classRegistrationStartDate: string
  classRegistrationEndDate: string
  classDurationSettingType: string
  classStartDate: string // "yyyy.MM.dd"
  classEndDate: string // "yyyy.MM.dd"
  classAvailableDays: number
  findClassNameResponses: FindClassNameResponse[]
  learningStatus: string // default REGISTRATION "수강 상태 코드값(신청:REGISTRATION/대기:WAITING/관리자:ADMIN)")
  learningStartDday: number // default 0
}

// b2b 수강신청 클래스 > 수강취소
export interface CancelMyClassRegistrationRequest {
  studyEntranceSeq: number
}

// b2b 수강중인 클래스 목록

export interface FindMyClassRunningResponse {
  studyEntranceSeq: number
  studyGroupUserSeq: number
  packageSeq: number
  packageTypeCode: string // "패키지 타입 코드 (묶음 : COMBINATION , 디지털 : CLASS)")
  packageName: string
  remainingDays: number
  completionYn: string // "수료여부 (Y, N)"
  completionYnName: string // "수료여부명 (수료, 미수료)"
  categoryName: string
  teacherName: string
  completionClassCount: number // "패키지 내 수료한 클래스 갯수"
  classCount: number // "패키지 내 총 클래스 갯수"
  beginDate: string // "수강 시작일" "yyyy.MM.dd"
  closeDate: string // "수강 종료일" "yyyy.MM.dd"
  reviewYn: string // "복습 여부 (Y, N)"
  reviewStartDate: string // "복습 시작일" "yyyy.MM.dd"
  reviewCloseDate: string // "복습 종료일" "yyyy.MM.dd"
  classes: MyClassRunningClassDTO[]
}

// b2b 수강중인 클래스 > 클래스 DTO
export interface MyClassRunningClassDTO {
  studyGroupUserSeq: number // 반배정 유저 시퀀스
  classSeq: number // 클래스 시퀀스
  className: string // 클래스 명
  remainingDays: number // 종료 D-day
  categoryName: string // 카테고리명
  teacherName: string // 강사 명
  beginDate: string // 수강 시작일 "yyyy.MM.dd"
  closeDate: string // 수강 종료일 "yyyy.MM.dd"
  mediaCompleteLectureCount: number // 클래스 영상 컨텐츠 완료 강의 수
  classLectureCount: number // 클래스 강의 수
  mediaProgressRate: number // 클래스 영상 컨텐츠 진도율(완강수/총 강의수), 완강 기준 = 영상 컨텐츠 완료
  completionYn: string // 수료여부 (Y, N)
  completionYnName: string // 수료여부명 (수료, 미수료)
  reviewYn: string // 복습 여부 (Y, N)
  reviewStartDate: string // 복습 시작일 "yyyy.MM.dd"
  reviewCloseDate: string // 복습 종료일 "yyyy.MM.dd"
}

// b2b 수강중인 클래스 상세
export interface FindMyClassRunningDetailRequest {
  studyGroupUserSeq: number
}

// b2b 수강중인 클래스 (강의리스트 포함) 상세
export interface FindMyClassRunningDetailResponse {
  studyGroupUserSeq: number
  classSeq: number
  className: string
  contentType: string // "강의 구성 타입"
  pdfFilePath: string // "클래스 강의자료 경로 (학습자료 전체 다운로드)"
  thumbnailPath: string // "썸네일 이미지 경로"
  remainingDays: number // "종료 D-day"
  categoryName: string // "카테고리 명"
  teacherName: string // "강사 명"
  beginDate: string // "수강 시작일" "yyyy.MM.dd"
  closeDate: string // "수강 종료일" "yyyy.MM.dd"
  mediaInCompleteLectureCount: number // "미시청 강의 수"
  mediaCompleteLectureCount: number // "시청완료 강의 수"
  classLectureCount: number // "클래스 강의 수"
  mediaProgressRate: number // "클래스 영상 컨텐츠 진도율(완강수/총 강의수), 완강 기준 = 영상 컨텐츠 완료"
  completionYn: string // "수료여부 (Y, N)"
  completionYnName: string // "수료여부명 (수료, 미수료)"
  reviewYn: string // "복습 여부 (Y, N)"
  reviewStartDate: string // "복습 시작일" "yyyy.MM.dd"
  reviewCloseDate: string // "복습 종료일" "yyyy.MM.dd"
  lectures: MyClassRunningClassLecturesDTO[]
}

// b2b 수강중인 클래스 > 클래스 DTO (강의리스트 포함)
export interface MyClassRunningClassLecturesDTO {
  curriculumSeq: number
  courseSeq: number
  lectureSeq: number
  title: string
  sortOrder: number
  lectureType: string
  mediaCompleteYn: string // "시청 완료 여부 (assets중 모든 MEDIA 타입의 시청을 완료한 경우 Y)"
  duration: number // "재생시간(ms)"
  durationMin: number // "재생시간(분)"
  mediaAssets: MyClassRunningClassLectureMediaAssetsDTO[]
  attachFiles: LectureAttachFileDTO[]
}

// b2b 수강중인 클래스 > 클래스 > 강의 > 영상 DTO
export interface MyClassRunningClassLectureMediaAssetsDTO {
  lectureSeq: number
  sortOrder: number
  curriculumAssetSeq: number
  assetType: string
  assetTypeName: string
  contentsType: string
  contentsTypeName: string
  duration: number // "재생시간(ms)"
  durationMin: number // "재생시간(분)"
  durationMinSec: string // "재생시간(mm:ss)"
}

// 강의 학습자료 정보
export interface LectureAttachFileDTO {
  seq: number
  lectureSeq: number
  attachFileType: string
  attachFilePath: string
  attachFileName: string
  attachFileExtension: string
  sortOrder: number
}

// B2B 프론트 학습문의 조회 Parameter
export interface FindLectureQuestionsRequest {
  pageIndex: number // default 1
  pageSize: number // default 10
  classSeq?: number
  lectureSeq?: number
}

// 유저 학습(강의) 문의 목록 (마이페이지 > 학습 문의)
export interface UserLectureQuestionsResponse {
  questionSeq: number
  classTitle: string
  contents: string
  registDate: string // "yyyy-MM-dd hh:mm:ss"
  replyStatus: string // "답변상태 (Y: 답변 완료, Y: 답변 대기)"
}

// b2b 수강이력 클래스 목록
export interface FindMyClassEndsResponse {
  studyEntranceSeq: number
  packageSeq: number
  categoryName: string
  teacherName: string
  packageTypeCode: string // "패키지 타입 코드 (묶음 : COMBINATION , 디지털 : CLASS)")
  title: string
  completionYn: string // "수료여부 (Y, N)"
  completionYnName: string // "수료여부명 (수료, 미수료)"
  classStartDate: string // "수강 시작일" "yyyy.MM.dd"
  classEndDate: string // "수강 종료일" "yyyy.MM.dd"
  repeatStartDate: string // "복습 시작일" "yyyy.MM.dd"
  repeatEndDate: string // "복습 종료일" "yyyy.MM.dd"
  studyGroupUserSeq: number
  findClassResponses: MyClassEndClassDTO[]
}

// b2b 마이클래스 GNB 메뉴 new 아이콘
export interface FindMyClassGnbMenuIconsResponse {
  learning: boolean
}

// B2B 프론트 학습문의 조회 Parameter
export interface FindUserLectureQuestionsRequest {
  pageIndex: number // default 1
  pageSize: number // default 10
  beforeMonth: number // 기간 : 전체,3,6,9,12개월
  replyStatus: string // 답변 상태 : 전체 : null,답변완료 : Y,답변대기 : N
}

// 유저 학습(강의) 문의 목록 (마이페이지 > 학습 문의)
export interface UserLectureQuestionsResponse {
  questionSeq: number
  classTitle: string
  contents: string
  registDate: string // "yyyy-MM-dd hh:mm:ss"
  replyStatus: string // "답변상태 (Y: 답변 완료, Y: 답변 대기)"
}

// B2B 프론트 학습문의 조회 Parameter
export interface FindUserLectureQuestionsRequest {
  pageIndex: number // default 1
  pageSize: number // default 10
  beforeMonth: number // 기간 : 전체,3,6,9,12개월
  replyStatus: string // 답변 상태 : 전체 : null,답변완료 : Y,답변대기 : N
}

// 학습(강의) 문의 상세 정보
export interface LectureQuestionResponse {
  questionSeq: number
  typeCode: string // "타입 코드 (LECTURE: 학습 문의, PRODUCT: 상품 문의)"
  typeName: string // "타입 명 (LECTURE: 학습 문의, PRODUCT: 상품 문의)"
  classSeq: number
  classTitle: string
  courseTitle: string
  lectureSeq: number
  lectureSortOrder: number
  lectureTitle: string
  contents: string
  questionFilePath: string // "첨부파일경로"
  registDate: string // "등록일시" "yyyy-MM-dd hh:mm:ss"
  registUserSeq: number // "등록자 시퀀스"
  registUserName: string // "문의 작성자 명"
  registUserProfileImageUrl: string // "문의 작성자 프로필 이미지 경로"
  replyStatus: string // "답변상태 (Y: 답변 완료, Y: 답변 대기)"
  answer: LectureQuestionAnswerDTO
}

// 학습(강의) 문의 답변 정보
export interface LectureQuestionAnswerDTO {
  answerDate: string // "답변일시" "yyyy-MM-dd hh:mm:ss"
  answerContent: string // "답변 본문"
  answerContents: AnswerContent[] // "답변 본문"
  answerFilePath: string // "답변 첨부파일 경로"
  answerThumbnailPath: string // "답변 작성자 썸네일 경로"
  answerUserName: string // "답변 작성자 명"
}

// 답변 내용
export interface AnswerContent {
  contentType: string // "내용 타입 (TEXT, IMAGE)"
  content: string // "내용"
}

// 학습(강의) 문의 등록 정보
export interface LectureQuestionAddRequest {
  classSeq: number
  lectureSeq: number
  contents: string
  questionFilePath: string
}

// 기기 초기화 신청 피드 정보
export interface KollusDeviceApllicationVO {
  seq: number
  reason: string
}

// 기기 정보 관리
export interface KollusDevice {
  seq: number
  userSeq: number // 사용자 고유 번호
  deviceName: string // 기기명
  playerId: string // 단말기 ID
  clientUserId: string // 회원Id
  mobileYn: string // 기기 종류 0:웹, 1:모바일웹, 2:안드로이드 App, 3:iOS App
  ipAddress: string // IP주소
  reqYn: number // 신청 유무 0:신청X, 1:신청O
  reason: string // 취소사유
  delYn: number // 삭제유무 0:삭제X, 1:삭제O
  siteCode: number // 등록 사이트
  requestDate: string // 요청일
  registDate: string // 등록일
  updateDate: string // 수정일
}

// B2B 일대일 문의내역
export interface FindInquiriesResponse {
  totalCount: number
  inquiries: InquiriesResponse[]
}

// 일대일 문의 목록 (마이페이지 > 일대일 문의)
export interface InquiriesResponse {
  inquirySeq: number
  serviceType: string // "서비스(분류) 코드"
  serviceTypeName: string // "서비스(분류) 명"
  category: number // "카테고리(분류) 코드"
  categoryName: string // "카테고리(분류) 명"
  contents: string // "문의 내용"
  registDate: string // "작성 일시" "yyyy-MM-dd hh:mm:ss"
  answerYn: string // "답변상태 (Y: 답변 완료, Y: 답변 대기)"
}

// 일대일 문의 서비스 카테고리 목록
export interface ListInquiryServiceCategoryResponse {
  serviceType: string // "서비스(분류) 코드"
  serviceTypeName: string // "서비스(분류) 명"
  categoryList: ListInquiryCategoryItem[] // "카테고리(분류) 목록"
}

// 일대일 문의 카테고리 item 목록
export interface ListInquiryCategoryItem {
  categoryCode: number // "카테고리(분류) 코드"
  categoryName: string // "카테고리(분류) 명"
}

// 일대일 문의 상세 정보
export interface InquiryResponse {
  inquirySeq: number
  serviceType: string // "서비스(분류) 코드"
  serviceTypeName: string // "서비스(분류) 명"
  category: number // "카테고리(분류) 코드"
  categoryName: string // "카테고리(분류) 명"
  contents: string // "문의 내용"
  inquiryFilePath: string // "질문 첨부파일 경로"
  registDate: string // "작성 일시" "yyyy-MM-dd hh:mm:ss"
  registUserSeq: number // "등록자 시퀀스"
  answerYn: string // "답변상태 (Y: 답변 완료, Y: 답변 대기)"
  answer: InquiryAnswerDTO // "문의 답변 정보"
}

// 일대일 문의 답변 정보
export interface InquiryAnswerDTO {
  answerDate: string // "답변 일시" "yyyy-MM-dd hh:mm:ss"
  answerContent: string // "답변 본문"
  answerContents: AnswerContent[] // 답변 본문 (APP용)
  answerFilePath: string // "답변 첨부파일 경로"
  answerThumbnailPath: string // "답변 작성자 썸네일 경로"
  answerUserName: string // "답변 작성자 명"
}

// 답변 내용
export interface AnswerContent {
  contentType: string // "내용 타입 (TEXT, IMAGE)"
  content: string // "내용"
}

// B2B 일대일 문의 등록 정보
export interface B2BInquiryAddRequest {
  serviceType: string // "서비스(분류) 코드"
  category: number // "카테고리(분류) 코드"
  contents: string // "문의 내용"
  inquiryFilePath: string // "질문 첨부파일 경로"
}

// B2B 일대일 문의 수정 정보
export interface B2BInquiryEditRequest {
  inquirySeq: number
  serviceType: string // "서비스(분류) 코드"
  category: number // "카테고리(분류) 코드"
  contents: string // "문의 내용"
  inquiryFilePath: string // "질문 첨부파일 경로"
}

// 마이클래스 현재 재생 강의 저장 (웹) Parameter
export interface MyClassCurrentLectureWebRequest {
  studyGroupUserSeq: number // 반 유저 SEQ
  curriculumAssetSeq: number // 커리큘럼 에셋 SEQ
}

// 학습 문의 목록

export interface FindLectureQuestionsResponse {
  totalCount: number
  lectureQuestionsResponses: B2BLectureQuestionsResponse[]
}

// 학습(강의) 문의 목록 정보
export interface B2BLectureQuestionsResponse {
  questionSeq: number // 문의 시퀀스
  lectureTitle: string // 강의 명
  contents: string // 문의 내용
  registDate: string // 등록일시 "yyyy.MM.dd"
  registUserSeq: number // 등록자 시퀀스
  registUserId: string // 등록자 ID
  replyStatus: string // 답변상태 (Y: 답변 완료, Y: 답변 대기)
}
