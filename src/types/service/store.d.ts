import type { B2BLevelCodeEnum } from './search'

// b2b 카테고리 3depth 정보 (스토어 상품리스트 조회 옵션용)
export interface B2BCategoryInfo {
  b2bCategorySeq: number
  categoryName: string
  sortOrder: number
}

// B2B 프론트 상품리스트 조회
export interface FindStorePackagesRequest {
  pageIndex: number // 페이지 위치 (기본값 1)
  pageSize: number // 페이지 내 개수 (기본값 20)
  b2bCategorySeq: number
  levelCode: B2BLevelCodeEnum
  isRegister: boolean
}

// B2B 프론트 상품 상세 조회
export interface FindStorePackageDetailRequest {
  packageSeq: number
}

// 메인 상품 목록
export interface FindStorePackagesResponse {
  totalCount: number
  storePackageInfos: StorePackageInfo[]
}

// 메인 상품 정보
export interface StorePackageInfo {
  packageSeq: number // 패키지 시퀀스
  thumbnailPath: string // 상품 썸네일 이미지 경로
  title: string // 패키지 제목
  categoryName: string // 카테고리명
  teacherSeq: number // 강사 시퀀스
  teacherName: string // 강사명
  starPoint: number // 별점
  levelCode: string // 패키지 레벨코드
  stage: number // 차수 (어드민 차시)
  includeBook: boolean // 교재포함 여부
  classRegistrationStartDate: string // 수강신청 시작일 yyyy.MM.dd
  classRegistrationEndDate: string // 수강신청 종료일 yyyy.MM.dd
  classDurationSettingType: string // 수강기간 설정 유형
  classStartDate: string // 수강 시작일 yyyy.MM.dd
  classEndDate: string // 수강 종료일 yyyy.MM.dd
  classAvailableDays: number // 수강 가능일
  expenseDisplayYn: string // 교육비 노출 여부
  exceptOptionSalePrice: number // 옵션 제외 판매가(판매금액)
  isRegister: boolean // 수강신청 가능여부
  phaseToPackageSeq: number // 기수에 연결 된 패키지 시퀀스
  packageFreeLecture: PackageFreeLectureDTO // 미리보기 (활성화 여부는 데이터 null인지 아닌지로 판단)
}

// 메인 상품 상세
export interface FindStorePackageDetailResponse {
  packageSeq: number
  thumbnailPath: string
  b2bCategorySeq: number
  b2bCategorySeqName2: string
  b2bCategorySeqName3: string
  teacherName: string
  profileFilePath: string
  teacherResponses: TeacherResponse[]
  additionResponses: AdditionResponse[]
  levelCode: string
  levelCodeName: string // 패키지 레벨명
  tagDisplayYn: string
  includeBook: boolean
  stage: number
  title: string
  starPoint: number
  classRegistrationStartDate: string // "yyyy.MM.dd"
  classRegistrationEndDate: string // "yyyy.MM.dd"
  classDurationSettingType: string // 수강기간 설정 유형
  classStartDate: string // "yyyy.MM.dd"
  classEndDate: string // "yyyy.MM.dd"
  classAvailableDays: number // 수강 가능일
  reviewDays: number // 복습일
  exceptOptionSalePrice: number // 옵션 제외 판매가(판매금액)
  expenseDisplayYn: string // 교육비 노출 여부
  processContent: string // 과정소개
  teacherContent: string // 강사소개
  bookContent: string // 관련교재
  phaseToPackageSeq: number // 기수에 연결 된 패키지 시퀀스
  isRegister: boolean // 수강신청 가능여부
  packageFreeLectureDTO: PackageFreeLectureDTO // 미리보기 (활성화 여부는 데이터 null인지 아닌지로 판단)
}

// 강사 정보
export interface TeacherResponse {
  teacherName: string
  profileFilePath: string
  introduction: string // 강사 소개
  briefHistory: string // 강사 약력
  sortOrder: number // 강의 목록 순서
}

// 교구재(현물)
export interface AdditionResponse {
  additionSeq: number // 교구재 시퀀스
  additionName: string // 교구재명
  publisher: string // 출판사
  isbnCode: string // ISBN코드
  additionImagePath: string
  additionContent: string // 교재 소개
}

// 상품 무료(OT)강의 정보 DTO
export interface PackageFreeLectureDTO {
  packageSeq: number
  packageName: string
  classSeq: number
  classSortOrder: number
  className: string
  lectureSeq: number
  lectureTitle: string
  lectureSortOrder: number
  curriculumAssetSeq: number
  mediaContentKey: string
}

// 상품 상세 커리큘럼 정보
export interface PackageDetailCurriculumResponse {
  packageSeq: number
  displayYn: string
  curriculumClasses: CurriculumClassesVO[]
}

// 커리큘럼 클래스 정보 VO
export interface CurriculumClassesVO {
  productSeq: number
  classSeq: number
  className: string
  classLevel: string
  classLevelName: string
  sortOrder: number
  courses: CurriculumCourseVO[] // 커리큘럼 코스 목록 정보
  studyTime: string // 학습시간 hh:MM:ss
  lectureCount: number
}

// 커리큘럼 > 코스 정보
export interface CurriculumCourseVO {
  studyGroupSeq: number // 반배정 시퀀스
  studyGroupUserSeq: number // 반 유저 시퀀스
  classSeq: number // 클래스 시퀀스
  courseSeq: number // 코스 시퀀스
  courseName: string // 코스 명
  courseSortOrder: number // 코스 순서
  completeYn: string // 코스 완료 여부
  recentYn: string // 최근 코스 여부
  subjects: CurriculumSubjectVO[] // 커리큘럼 과목 목록 정보
  lectures: CurriculumLectureVO[] // 커리큘럼 강의 목록 정보
  studyTime: string // 학습시간 MM:ss
  lectureCount: number // 강의 수
}

// 커리큘럼 과목 정보 VO
export interface CurriculumSubjectVO {
  subject: Subject
  subjectSeq: number // 과목 시퀀스
  subjectType: string // 과목 타입 코드
  subjectTypeName: string // 과목 타입 명
  subjectTitle: string // 과목명
  subjectLevel: string // 과목 레벨 코드
  subjectLevelName: string // 과목 레벨 명
  teacherName: string // 강사명
  pdfFilePath: string // 학습자료 PDF 경로
  subjectSortOrder: number // 과목 순서
  lecturesTotalCount: number // 과목 총 강의 수
  progressRate: number // 진도율
  lectures: CurriculumLectureVO[] // 강의 목록
}

// 커리큘럼 강의 정보
export interface CurriculumLectureVO {
  lecture: Lecture
  lectureSeq: number // 강의 시퀀스
  classSeq: number // 클래스 시퀀스
  courseSeq: number // 코스 시퀀스
  subjectSeq: number // 과목 시퀀스
  classTitle: string // 클래스 제목
  courseTitle: string // 코스 제목
  subjectTitle: string // 과목 제목
  lectureTitle: string // 강의 제목
  subTitle: string // 강의 서브 타이틀
  teacherName: string // 강사명
  pdfFilePath: string // 학습자료 PDF 파일 경로
  pdfFileName: string // 학습자료 PDF 파일명
  audioFilePath: string // 학습자료 MP3 파일 경로
  audioFileName: string // 학습자료 MP3 파일명
  sequentialPlayYn: string // 순차 재생 여부
  lectureSource: string // 강의 출처
  playableSortOrder: number // 재생 가능 영상 순번
  likeCount: number // 좋아요 수
  likeActiveYn: string // 좋아요 여부
  lectureSortOrder: number // 강의 순서
  lectureCompleteYn: string // 강의 수강 완료 여부
  mainMediaContentKey: string // 업로드 파일 키 (첫번째 에셋미디어)
  mainUploadFileKey: string // 미디어 컨텐츠 키 (첫번째 에셋미디어)
  mainThumbnailPath: string // 썸네일 경로 (첫번째 에셋미디어)
  mainContentsScript: string // 스크립트 (첫번째 에셋미디어)
  messionStatus: string // 미션 완료 여부 ('Y':완료 / 'N':미완료 / '':미션 없음)
  trainingMissionStatus: string // AI 트레이닝 미션 완료 여부 ('Y':완료 / 'N':미완료 / '':미션 없음)
  expressionMissionStatus: string // 핵심표현 미션 완료 여부 ('Y':완료 / 'N':미완료 / '':미션 없음)
  userMissionSeq: number // 미션 seq
  assetCompleteList: RecommendLectureInfoAsset[] // 에셋 수강 완료 리스트
  assetTrainingStatus: string // AI 트레이닝 완료 여부 ('Y':완료 / 'N':미완료 / '':없음)
  assetExpressionStatus: string // 핵심표현 완료 여부 ('Y':완료 / 'N':미완료 / '':없음)
}

// 강의 정보
export interface Lecture {
  lectureSeq: number // 강의 시퀀스
  lectureType: string // 강의 타입
  title: string // 강의 제목
  subTitle: string // 강의 서브 타이틀
  teacherSeq: number // 강사 시퀀스
  categoryCode: string // 카테고리 코드
  lectureLevel: string // 레벨 코드
  pdfFilePath: string // 학습자료 PDF 파일 경로
  pdfFileName: string // 학습자료 PDF 파일명
  audioFilePath: string // 학습자료 MP3 파일 경로
  audioFileName: string // 학습자료 MP3 파일명
  missionContent: string // 미션 내용
  displayYn: string // 사용 여부
  useYn: string // 사용 여부
  sequentialPlayYn: string // 순차 재생 여부
  lectureSource: string // 강의 출처
  versionCode: string // 버전 정보
  asserMedias: AssetMedia[] // 에셋 미디어
  assetTrainings: AssetTraining[] // 에셋 트레이닝
  assetExpressions: AssetExpression[] // 에셋 핵심표현
  hashTags: HashTag[] // 해시태그
  properties: PropertyVO[] // 프로퍼티
  assetUploadStatus: string // 에셋 업로드 상태
  teacher: TblMember // 강사 정보
  teacherName: string // 강사명
  registUser: TblMember // 등록자 정보
  registUserName: string // 등록자명
  updateUser: TblMember // 수정자 정보
  updateUserName: string // 수정자명
  matchingYn: string // 강의 - 과목 매칭 여부
  lectureTypeName: string // 강의 타입 명
  categoryCodeName: string // 카테고리 명
  lectureLevelName: string // 레벨 명
  displayYnName: string // 사용 여부 명
  registDate: string // 등록일
  updateDate: string // 수정일
  registUserSeq: number // 등록자 시퀀스
  updateUserSeq: number // 수정자 시퀀스
}

// ASSET 기본 컨텐츠 정보
export interface AssetMedia {
  assetMediaSeq: number // 에셋 미디어 시퀀스
  lectureSeq: number // 강의 시퀀스
  playerType: string // 플레이어 타입(콜러스,유튜브)
  contentsType: string // 컨텐츠 타입(리얼원본,리얼해설,쉐도잉,이론편,훈련편,해설음원,단어,스토리,티칭,프리뷰)
  uploadFileKey: string // 업로드 파일 키
  coreWord: string // 핵심 어휘
  contentsScript: string // 스크립트
  assetMediaFileName: string // 에셋 미디어 파일 명
  sortOrder: number // 순서
  useYn: string // 사용 여부
  kollusMediaInfo: KollusMediaInfo // 콜러스 정보
  completeYn: string // 완강 여부
  playerTypeName: string // 플레이어 타입 명
  contentsTypeName: string // 컨텐츠 타입 명
  thumbnailPath: string // 썸네일 경로
  duration: number // 재생시간(ms)
  mediaContentKey: string // 미디어 컨텐츠 키
  posterUrl: string // 포스터 URL
  registDate: string // 등록일
  updateDate: string // 수정일
  registUserSeq: number // 등록자 시퀀스
  updateUserSeq: number // 수정자 시퀀스
}

// 콜러스 미디어 정보
export interface KollusMediaInfo {
  seq: number // 콜러스 미디어 시퀀스
  callbackTarget: string // 콜백 대상
  uploadFileKey: string // 업로드 파일 키
  duration: number // 재생시간(ms)
  mediaContentKey: string // 미디어 컨텐츠 키
  thumbnailPath: string // 썸네일 경로
  originalFileName: string // 원본 파일명
  fileKind: number // 파일 종류 1: 비디오, 2: 오디오
  fileKindName: string // 파일 종류명
}

// ASSET AI 트레이닝 정보
export interface AssetTraining {
  assetTrainingSeq: number // 에셋 트레이닝 시퀀스
  lectureSeq: number // 강의 시퀀스
  assetTrainingFileName: string // 트레이닝 파일 명
  assetTaniningFilePath: string // 트레이닝 파일 경로
  originText: string // 한글 TEXT
  translationText: string // 영어 TEXT
  sortOrder: number // 순서
  useYn: string // 사용 여부
  userAnswer: UserLectureMissionAnswer // 유저 미션 답안
  registDate: string // 등록일
  updateDate: string // 수정일
  registUserSeq: number // 등록자 시퀀스
  updateUserSeq: number // 수정자 시퀀스
}

// 사용자별 강의 미션 답변
export interface UserLectureMissionAnswer {
  seq: number // 시퀀스
  userMissionSeq: number // 사용자 미션 시퀀스
  missionType: string // 강의 미션 타입 (AI, EXPRESSION)
  relationSeq: number // 연관 시퀀스
  correctYn: string // 정답 여부
  answer: string // 답변
  attachFilePath: string // 첨부 파일 경로 (AI 트레이닝)
  duration: number // 재생시간 (AI트레이닝인 경우에만, 단위는 ms)
  useYn: string // 사용여부 (삭제시 N)
  registDate: string // 등록일
}

// ASSET 핵심표현 정보
export interface AssetExpression {
  assetExpressionSeq: number // 에셋 핵심표현 시퀀스
  lectureSeq: number // 강의 시퀀스
  playerType: string // 플레이어 타입(콜러스,유튜브)
  uploadFileKey: string // 업로드 파일 키
  expressionKorean: string // 핵심 표현 문제 (한글)
  expressionEnglish: string // 핵심 표현 문제 (영어)
  answer: string // 정답
  assetExpressionFileName: string // 핵심표현 파일 명
  sortOrder: number // 순서
  useYn: string // 사용 여부
  kollusMediaInfo: KollusMediaInfo // 콜러스 정보
  userAnswer: UserLectureMissionAnswer // 유저 미션 답안
  playerTypeName: string // 플레이어 타입 명
  thumbnailPath: string // 썸네일 경로
  duration: number // 재생시간(ms)
  mediaContentKey: string // 미디어 컨텐츠 키
  posterUrl: string // 포스터 URL
}

// 해시태그 정보
export interface HashTag {
  hashTagSeq: number // 해시태그 시퀀스
  hashTagName: string // 해시태그 명
  useYn: string // 사용 여부
  registDate: string // 등록일
  updateDate: string // 수정일
  registUserSeq: number // 등록자 시퀀스
  updateUserSeq: number // 수정자 시퀀스
}

// 강의 속성 정보
export interface PropertyVO {
  proertyCode: string // 속성 코드
  propertyName: string // 속성 명
}

// 사용자 정보
export interface TblMember {
  idNum: number // 시퀀스
  userId: string // 아이디
  userName: string // 이름
  userSeq: number // 시퀀스
}

export interface RecommendLectureInfoAsset {
  seq: number
  recommendLectureInfoSeq: number
  assetMediaSeq: number
  sortOrder: number
  completeYn: string
  playYn: string
  registDate: string
  updateDate: string
}

// V2 커리큘럼 강의 정보 VO
export interface CurriculumLectureVO {
  studyGroupSeq: number // 반배정 시퀀스
  studyGroupUserSeq: number // 반 유저 시퀀스
  classSeq: number // 클래스 시퀀스
  courseSeq: number // 코스 시퀀스
  lectureSeq: number // 강의 시퀀스
  curriculumSeq: number // 커리큘럼 시퀀스
  classTitle: string // 클래스 제목
  courseTitle: string // 코스 제목
  lectureTitle: string // 강의 제목
  subTitle: string // 강의 서브 타이틀
  courseSortOrder: number // 코스 순서
  lectureSortOrder: number // 강의 순서
  lectureType: string // 강의 타입
  completeYn: string // 강의 수강 완료 여부
  freeYn: string // 무료 강의 여부
  curriculumAssetList: CurriculumAssetVO[] // 커리큘럼 에셋 리스트
  lectureAttachFileList: LectureAttachFileDTO[] // 커리큘럼 강의 학습 자료
  curriculumAudioAsset: CurriculumAssetVO // 커리큘럼 - 오디오 영상
  curriculumMediaAssets: CurriculumAssetMediaVO[] // 커리큘럼 강의 영상 에셋 자료
  freeAssetMedia: CurriculumAssetMediaVO // 무료 강의 정보
  studyTime: string // 학습시간 MM:ss
}

// 커리큘럼 강의 정보 VO
export interface CurriculumAssetVO {
  curriculumAssetSeq: number // 커리큘럼 에셋 시퀀스
  assetType: string // 에셋 타입
  assetSeq: number // 에셋 시퀀스
  sortOrder: number // 순서
  completeYn: string // 완료 여부
  assetMedia: AssetMedia // 에셋 미디어
  assetTraining: AssetTraining // 에셋 트레이닝
  assetExpression: AssetExpression // 에셋 핵심표현
  assetMission: AssetMission // 에셋 미션
  missionType: string // 활동 미션 타입
  saveStatus: string // 미션 라이브 여부 (저장 상태) TEMPORARY : 임시 저장, COMPLETE : 라이브(저장 완료)
}

// 미션 등록 VO
export interface AssetMission {
  missionSeq: number // 미션 시퀀스
  lectureSeq: number // 강의 시퀀스
  missionName: string // 미션명
  missionType: string // 미션 타입
  saveStatus: string // 저장 상태
  missionContent: string // 미션 내용
  missionAttachFiles: MissionAttachFile[] // 미션 첨부파일
  sortOrder: number // 순서
  useYn: string // 사용 여부
  commentUseYn: string // 댓글 사용 여부
  commentDisplayType: string // 댓글 공개 방식
  commentAttachFileType: string // 첨부파일 타입
  displayYn: string // 노출 여부
  registUserSeq: number // 등록자
  updateUserSeq: number // 수정자
}

// 댓글타입 미션 본문 첨부파일
export interface MissionAttachFile {
  seq: number // 시퀀스
  missionSeq: number // 미션 시퀀스
  attachmentType: string // 첨부 파일 구분 (AUDIO, IMAGE, DOWNLOAD)
  fileType: string // 파일 타입 (IMAGE, AUDIO, VIDEO, KOLLUS)
  filePath: string // 파일 경로
  mediaContentKey: string // 미디어 컨텐츠 키 (파일 타입이 KOLLUS인 경우)
  duration: number // 재생시간 (ms, 파일 타입이 KOLLUS인 경우)
  thumbnailPath: string // 썸네일 경로 (파일 타입이 KOLLUS인 경우)
  fileSize: number // 파일용량
  registDate: string // 등록일
  sortOrder: number // 정렬순서
}

// 강의 학습자료 정보
export interface LectureAttachFileDTO {
  seq: number // 시퀀스
  lectureSeq: number // 강의 시퀀스
  attachFileType: string // 첨부파일 타입
  attachFilePath: string // 파일경로
  attachFileName: string // 파일명
  attachFileExtension: string // 파일 확장자
  sortOrder: number // 순서
}

// V2 커리큘럼 강의 영상 에셋 정보
export interface CurriculumAssetMediaVO {
  curriculumAssetSeq: number // 커리큘럼 에셋 시퀀스
  assetType: string // 에셋 타입
  mediaContentKey: string // 미디어 컨텐츠 키
}

// b2b 스토어 프론트 상품 수강신청
export interface AddStoreStudyEntranceRequest {
  packageSeq: number
}
