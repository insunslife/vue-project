// /* eslint-disable vue/no-unused-components */
// // declare global {
// export interface ModalState {
//   [key: string]: boolean
//   MyInquiry: boolean
//   LoginWrapModal: boolean
//   Login: boolean
//   IdFind: boolean
//   IdFindComplate: boolean
//   PwFind: boolean
//   PwFindChange: boolean
//   PwChangeComplate: boolean
//   PwChangeMass: boolean
//   OverseasSignUp: boolean
//   Join: boolean
//   JoinComplate: boolean
//   Inquiry: boolean
//   complate: boolean
//   Qrcode: boolean
//   Certificate: boolean
//   PackageCertificate: boolean
//   MyclassQna: boolean
//   DeviceReset: boolean
// }

// export interface GnbMenuSubList {
//   b2bGnbSeq: number
//   parentSeq: number
//   gnbName: string
//   connectionType: string
//   categorySeq: number
//   link: string
//   depth: number
//   sortOrder: number
//   childGnbMenus: GnbMenuSubList[]
//   updatedAt: string // 'yyyy-MM-dd HH:mm:ss'
// }

// // gnb 메뉴 nested 구조 response
// export interface FindGnbMenuListWithChildResponse {
//   b2bGnbSeq: number
//   gnbName: string
//   connectionType: string
//   categorySeq: number
//   link: string
//   depth: number
//   sortOrder: number
//   childGnbMenus: GnbMenuSubList[]
//   updatedAt: string // 'yyyy-MM-dd HH:mm:ss'
// }

// export interface InquiryCategoryItem {
//   categoryCode: number
//   categoryName: string
// }

// export interface InquiryCategoryList {
//   serviceType: string
//   serviceTypeName: string
//   categoryList: InquiryCategoryItem[]
// }

// export interface B2BInquiryAddRequest {
//   category: number
//   contents: string
//   inquiryFilePath: string
// }

// export interface MainFixedNoticeResponse {
//   serviceNoticeSeq: number
//   title: string
// }

// export interface BannerResponse {
//   sortOrder: number
//   bannerFilePath: string
//   link: string
// }

// export interface DisplayMainPackageInfo {
//   groupTitle: string
//   sortOrder: number
//   thumbnailPath: string
//   categoryName: string
//   teacherName: string
//   packageName: string
//   starPoint: number
//   levelCode: string
//   includeBook: boolean
//   stage: number
//   packageSeq: number
// }

// export interface FindDisplayMainPackagesResponse {
//   groupTitle: string
//   displayMainPackageInfo: DisplayMainPackageInfo[]
// }

// // B2B 메인 공지사항 response
// export interface MainNoticeResponse {
//   serviceNoticeSeq: number
//   title: string
// }

// export interface MyClassRunningResponse {
//   studyEntranceSeq: number
//   packageSeq: number
//   remainingDays: number
//   packageName: string
//   categoryName: string
//   teacherName: string
// }

// // 백엔드가 이렇게 명영되어 있어서 그냥 사용 FindMyClassRunningListResponse
// // FindMyClassLearningListResponse - 수강중인 클래스 정보
// export interface FindMyClassRunningListResponse {
//   totalCount: number
//   myClasses: MyClassRunningResponse[]
// }

// export interface FaqGroupResponse {
//   code: string
//   value: string
// }

// export interface FaqResponse {
//   faqSeq: number
//   faqGroup: string
//   title: string
//   contents: string
// }

// // 51000
// // 67000
// // 25000
// // 10000
// // 13400
// // 175000
// // 20000
// // 4800
// // 30000
// // 5000
// // 62000

// // }
