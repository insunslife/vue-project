// 수강증 정보 (클래스)
export interface IdentificationCardResponse {
  userName: string // 유저 명
  userId: string // 유저 ID
  studyGroupSeq: number // 반배정 시퀀스
  studyGroupUserSeq: number // 반 유저 시퀀스
  classBeginDate: string // 클래스 오픈일
  classCloseDate: string // 클래스 종료일
  learningStatus: string // 수강 상태(수강중, 수강 완료)
  classSeq: number // 클래스 시퀀스
  className: string // 클래스 명 (교육과정명)
  classText: string // 클래스 설명
  progressRate: number // 진도율
  myAchievementRate: number // 달성률
  attendanceDays: number // 출석일
  totalAttendanceRate: number // 출석률
  totalLectureCount: number // 총 강의 개수
  completeLectureCount: number // 완료 강의 개수
}

// 수강증 정보 (패키지)
export interface PackageIdentificationCardResponse {
  userName: string // 유저 명
  userId: string // 유저 ID
  studyGroupSeq: number // 반배정 시퀀스
  studyGroupUserSeq: number // 반 유저 시퀀스
  classBeginDate: string // 클래스 오픈일
  classCloseDate: string // 클래스 종료일
  learningStatus: string // 수강 상태(수강중, 수강 완료)
  packageSeq: number // 패키지 시퀀스
  packageName: string // 패키지 명 (교육과정명)
  packageSubTitle: string // 패키지 부제목
  progressRate: number // 진도율
  myAchievementRate: number // 달성률
  attendanceDays: number // 출석일
  totalAttendanceRate: number // 출석률
  totalLectureCount: number // 총 강의 개수
  completeLectureCount: number // 완료 강의 개수
}
