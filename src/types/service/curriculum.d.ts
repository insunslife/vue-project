// 강의 미디어 에셋 완료 처리
export interface CurriculumMediaCompleteRequest {
  assetType: AssetTypeEnum
  duration: number
  progress: number
  studyGroupUserSeq: number // 반 유저 시퀀스 TODD: extend
  curriculumAssetSeq: number // 커리큘럼 에셋 시퀀스 TODD: extend
}

export enum AssetTypeEnum {
  MEDIA,
  EXPRESSION,
  TRAINING,
  MISSION
}

// 콜러스 재생 Key 정보
export interface KollusPlayerKeyVO {
  jwt: string
  link: string
}

// 웹용 커리큘럼 조회
export interface WebCurriculumResponse {
  classSeq: number // 클래스 번호
  className: string // 클래스명
  thumbnailPath: string // 썸네일 이미지 경로
  teacherName: string // 강사명
  lectureCount: number // 강의 수
  mediaCompleteLectureCount: number // 시청완료 강의 수
  mediaIncompleteLectureCount: number // 미시청 강의 수
  contentType: string // 강의 구성 타입
  pdfFilePath: string // 클래스 강의자료 경로 (학습자료 전체 다운로드)
  beginDate: string // 수강기간 시작일 yyyy-MM-dd
  closeDate: string // 수강기간 종료일 yyyy-MM-dd
  remainingDays: number // 남은 수강일
  lectures: WebCurriculumLecture[] // 강의 목록
}

// 웹용 커리큘럼 강의 정보
export interface WebCurriculumLecture {
  lectureSeq: number // 강의 시퀀스
  title: string // 강의명
  sortOrder: number // 정렬 순서
  lectureType: string // 강의 타입
  audioFilePath: string // MP 파일 경로
  audioFileName: string // MP 파일명
  achievementRate: number // 달성율
  completeYn: string // 완강 여부
  mediaCompleteYn: string // 시청 완료 여부 (assets중 모든 MEDIA 타입의 시청을 완료한 경우 Y)
  assets: WebCurriculumAsset[] // 강의 구성 콘텐츠 에셋
  mediaAssets: WebCurriculumAsset[] // 강의 영상 에셋 목록
  attachFiles: LectureAttachFileDTO[] // 첨부파일
  questionSeq: number // 질문 번호
  replyStatus: string // 답변상태 (null : 질문 없음, N : 대기, Y : 답변완료)
}

// 웹용 커리큘럼 에셋 정보
export interface WebCurriculumAsset {
  sortOrder: number // 정렬 순서
  curriculumAssetSeq: number // 커리큘럼 에셋 시퀀스
  assetType: string // 에셋 타입
  assetTypeName: string // 에셋 타입명
  contentsType: string // 콘텐츠 타입
  contentsTypeName: string // 콘텐츠 타입명
  mediaContentKey: string // 미디어 키
  duration: number // 재생시간(ms)
  durationMin: number // 재생시간(분)
  durationMinSec: string // 재생시간(mm:ss)
  completeYn: string // 완료 여부
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
