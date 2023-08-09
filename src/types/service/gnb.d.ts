// gnb 메뉴 nested 구조 response
export interface FindGnbMenuListWithChildResponse {
  b2bGnbSeq: number
  gnbName: string
  connectionName: string
  connectionType: string
  categorySeq: number
  link: string
  depth: number
  sortOrder: number
  childGnbMenus: ListSubGnbMenuDTO[]
  // updatedAt?: string // 'yyyy-MM-dd HH:mm:ss'
}

export interface ListSubGnbMenuDTO {
  b2bGnbSeq: number
  parentSeq: number
  gnbName: string
  connectionName: string
  connectionType: string
  categorySeq: number
  link: string
  depth: number
  sortOrder: number
  childGnbMenus: ListSubGnbMenuDTO[]
  // updatedAt?: string // 'yyyy-MM-dd HH:mm:ss'
}

export interface ModalState {
  CertificateModal: boolean
  CertificatePackageModal: boolean
  DeviceResetConfirmModal: boolean
  IdFindComplateModal: boolean
  IdFindModal: boolean
  InquiryConfirmModal: boolean
  InquiryModal: boolean
  JoinComplateModal: boolean
  JoinModal: boolean
  LoginWrapModal: boolean
  MyClassQnaModal: boolean
  MyClassQRCodeModal: boolean
  MyInquiryModal: boolean
  OverseasSignUpModal: boolean
  PwChangeComplateModal: boolean
  PwChangeMassModal: boolean
  PwChangeModal: boolean
  PwFindChangeModal: boolean
  PwFindModal: boolean
}
