// 공통 리스트 조회(조건, 페이징, 정렬) 정보
export interface CommonSearchSpec {
  index: number // 페이지 위치 (기본값 1)
  size: number // 페이지 내 개수 (기본값 20)
  keys: string[] // 조건 키
  types: string[] // 조건 종류(like, equal, greaterOrEqual, lessOrEqual, greater, less, in, between)
  values: string[] // 조건 값(between, in = XXX, AAA)
  sortKey?: string // 정렬 키
  sortType?: string // 정렬 종류(asc, desc)
}
