// FILE RESPONSE 정보
export interface FileResponseVO {
  fileSize: number // 파일 사이즈
  originalExtension: string // 타입
  filePath: string // 파일 경로
  decodedFilePath: string // 파일 경로 (URL decoded)
  originalFileName: string // 기존 파일 명
  saveFileName: string // 저장 파일 명
  thumbnailFile?: FileResponseVO // 썸네일 파일 정보
}
