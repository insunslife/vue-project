import { getData } from '@/api/config/client'
import type {
  BannerResponse,
  FindDisplayMainPackagesResponse,
  FindMyClassRunningListResponse,
  HomepageLogoResponse,
  LoginNoticeResponse,
  MainFaqResponse,
  MainFixedNoticeResponse,
  MainNoticeResponse
} from '@/types/service/mainPage'
import { MainPackageDisplayTypeEnum } from '@/types/service/serviceEnum'

class MainPageService {
  url = import.meta.env.VITE_API_URL
  // 고객사 로고 조회
  async getLogo(): Promise<HomepageLogoResponse> {
    try {
      const response = await getData<HomepageLogoResponse>(`${this.url}/b2b/mainPage/logo`)
      console.log('getLogo response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getLogo: ' + error)
    }
  }

  // 고객사 로고 조회 - 사이트 코드 (로그인 페이지용)
  async getLogoBySiteCode(siteCode: string): Promise<HomepageLogoResponse> {
    try {
      const response = await getData<HomepageLogoResponse>(`${this.url}/b2b/mainPage/logo/sitecode`, {
        headers: {
          'Origin-Site-Code': siteCode
        }
      })
      console.log('getLogoBySiteCode response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getLogoBySiteCode: ' + error)
    }
  }

  // 메인 배너 리스트 조회
  async getBannerList(): Promise<BannerResponse[]> {
    try {
      const response = await getData<BannerResponse[]>(`${this.url}/b2b/mainPage/banner/list`)
      console.log('getBanners response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getBanners: ' + error)
    }
  }

  // 메인 클래스 리스트 조회
  async getDisplayMainPackages(request: MainPackageDisplayTypeEnum): Promise<FindDisplayMainPackagesResponse> {
    try {
      const response = await getData<FindDisplayMainPackagesResponse>(`${this.url}/b2b/mainPage/package/list`, {
        params: {
          displayType: request
        }
      })
      console.log('getDisplayMainPackages response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getDisplayMainPackages: ' + error)
    }
  }

  // 메인 상단고정 공지사항 조회
  async getNotice(): Promise<MainFixedNoticeResponse> {
    try {
      const response = await getData<MainFixedNoticeResponse>(`${this.url}/b2b/mainPage/fixed-notice`)
      console.log('getNotice response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getNotice: ' + error)
    }
  }

  // 메인 공지사항 리스트 조회
  async getNoticeList(count: number): Promise<MainNoticeResponse[]> {
    try {
      const response = await getData<MainNoticeResponse[]>(`${this.url}/b2b/mainPage/notice/list`, {
        params: {
          count
        }
      })
      console.log('getNotices response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getNotices: ' + error)
    }
  }

  // 메인 자주묻는질문(Faq) 리스트 조회
  async getFaqList(count: number): Promise<MainFaqResponse[]> {
    try {
      const response = await getData<MainFaqResponse[]>(`${this.url}/b2b/mainPage/faq/list`, {
        params: {
          count
        }
      })
      console.log('getFaqs response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getFaqs: ' + error)
    }
  }

  // 메인 수강중인 강의 리스트 조회
  async getMyClassRunning(count: number): Promise<FindMyClassRunningListResponse> {
    try {
      const response = await getData<FindMyClassRunningListResponse>(`${this.url}/b2b/mainPage/class-running/list`, {
        params: {
          count
        }
      })
      console.log('getMyClassRunning response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getMyClassRunning: ' + error)
    }
  }

  // 로그인 공지사항 조회
  async getLoginNotice(siteCode: string): Promise<LoginNoticeResponse> {
    try {
      const response = await getData<LoginNoticeResponse>(`${this.url}/b2b/mainPage/login/notice`, {
        headers: {
          'Origin-Site-Code': siteCode
        }
      })
      console.log('getLoginNotice response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getLoginNotice: ' + error)
    }
  }
}

export default new MainPageService()
