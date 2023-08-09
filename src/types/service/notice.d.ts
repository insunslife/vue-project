export interface FindNoticeListRequest {
  index: number // 페이지 위치 (기본값 1)
  size: number // 페이지 내 개수 (기본값 20)
}

export interface FindNoticeListResponse {
  totalCount: number
  noticeList: ServiceNoticeInfo[]    
}

export interface ServiceNoticeInfo {
  serviceNoticeSeq: number
  title: string
  registDate: string // 'yyyy-MM-dd HH:mm'
  fixYn: string
  newNoticeYn: string
}

// 공지사항 상세 정보
export interface NoticeDetailResponse {
  serviceNoticeSeq: number
  title: string
  contents: string
  fixYn: string
  fixDate: string // 상단고정 일시 (까지)
  registDate: string // 등록일
  newNoticeYn: string // NEW 공지 여부 (Y: 공지 등록시간 기준 24시간 내, N: 그 외)
  serviceNoticeAttachFiles: ServiceNoticeAttachFileDTO[] // 공지사항 첨부 파일 목록
}

// 공지사항 첨부 파일 정보
export interface ServiceNoticeAttachFileDTO {
  seq: number // 공지사항 첨부파일 시퀀스
  serviceNoticeSeq: number // 공지사항 시퀀스
  attachFileType: string // 첨부파일 타입
  attachFilePath: string // 파일경로
  attachFileName: string // 파일명
  sortOrder: number // 순서
}

