import { deleteData, getData, postData, putData } from '@/api/config/client'
import type { CommonSearchSpec } from '@/types/commonSearchSpec'
import type { CommonResponse } from '@/types/commonResponse'
import type {
  FindMyClassRegistrationsResponse,
  CancelMyClassRegistrationRequest,
  FindMyClassRunningResponse,
  FindMyClassRunningDetailResponse,
  FindMyClassRunningDetailRequest,
  FindLectureQuestionsRequest,
  UserLectureQuestionsResponse,
  FindMyClassEndsResponse,
  FindMyClassGnbMenuIconsResponse,
  FindUserLectureQuestionsRequest,
  LectureQuestionResponse,
  LectureQuestionAddRequest,
  KollusDevice,
  FindInquiriesResponse,
  ListInquiryServiceCategoryResponse,
  InquiryResponse,
  B2BInquiryAddRequest,
  B2BInquiryEditRequest,
  MyClassCurrentLectureWebRequest,
  KollusDeviceApllicationVO,
  FindLectureQuestionsResponse
} from '@/types/service/myClass'

class MyClassService {
  url = import.meta.env.VITE_API_URL
  // 수강신청
  async getMyClassRegistrations(): Promise<FindMyClassRegistrationsResponse[]> {
    try {
      const response = await getData<FindMyClassRegistrationsResponse[]>(`${this.url}/b2b/myClass/web/class-registration`)
      console.log('getMyClassRegistrations response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getMyClassRegistrations: ' + error)
    }
  }

  // 수강취소
  async cancel(request: CancelMyClassRegistrationRequest): Promise<CommonResponse<void>> {
    try {
      const response = await putData<CommonResponse<void>>(`${this.url}/b2b/myClass/web/class-registration/cancel/`, {
        request
      })
      console.log('cancel response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('cancel: ' + error)
    }
  }

  // 수강중인 클래스
  async getMyClassRunning(): Promise<FindMyClassRunningResponse[]> {
    try {
      const response = await getData<FindMyClassRunningResponse[]>(`${this.url}/b2b/myClass/web/class-running`)
      console.log('getMyClassRunning response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getMyClassRunning: ' + error)
    }
  }

  // 수강중인 클래스 > 클래스 상세
  async getMyClassRunningDetail(request: FindMyClassRunningDetailRequest): Promise<FindMyClassRunningDetailResponse> {
    try {
      const response = await getData<FindMyClassRunningDetailResponse>(`${this.url}/b2b/myClass/web/class-running/detail`, {
        params: request
      })
      console.log('getMyClassRunningDetail response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getMyClassRunningDetail: ' + error)
    }
  }

  // 수강중인 클래스 > 클래스 상세 > 학습 문의 페이징 목록 조회 (web)FindLectureQuestionsResponse
  async getLectureQuestionList(request: FindLectureQuestionsRequest): Promise<FindLectureQuestionsResponse> {
    try {
      const response = await getData<FindLectureQuestionsResponse>(
        `${this.url}/b2b/myClass/web/class-running/question/lecture/list`,
        {
          params: request
        }
      )
      console.log('getLectureQuestionList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getLectureQuestionList: ' + error)
    }
  }

  // 수강종료 클래스 (수강이력)
  async getMyClassEnds(): Promise<FindMyClassEndsResponse[]> {
    try {
      const response = await getData<FindMyClassEndsResponse[]>(`${this.url}/b2b/myClass/web/class-end`)
      console.log('getMyClassEnds response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getMyClassEnds: ' + error)
    }
  }

  // 좌측 GNB 메뉴 - N 아이콘
  async getMyClassGnbMenuIcons(): Promise<FindMyClassGnbMenuIconsResponse[]> {
    try {
      const response = await getData<FindMyClassGnbMenuIconsResponse[]>(`${this.url}/b2b/myClass/web/gnbMenuIcons`)
      console.log('getMyClassGnbMenuIcons response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getMyClassGnbMenuIcons: ' + error)
    }
  }

  // 문의내역 - 학습문의 탭 - 유저 학습(강의) 문의 페이징 목록 조회 (Web)
  async getUserLectureQuestionList(request: FindUserLectureQuestionsRequest): Promise<UserLectureQuestionsResponse[]> {
    try {
      const response = await getData<UserLectureQuestionsResponse[]>(
        `${this.url}/b2b/myClass/web/question/lecture/list`,
        {
          params: request
        }
      )
      console.log('getUserLectureQuestionList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getUserLectureQuestionList: ' + error)
    }
  }

  // 학습(강의) 문의 상세 조회
  async getLectureQuestion(questionSeq: number): Promise<LectureQuestionResponse> {
    try {
      const response = await getData<LectureQuestionResponse>(
        `${this.url}/b2b/myClass/web/question/lecture/${questionSeq}`
      )
      console.log('getLectureQuestion response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getLectureQuestion: ' + error)
    }
  }

  // 학습(강의) 문의 등록
  async addLectureQuestion(request: LectureQuestionAddRequest): Promise<CommonResponse<void>> {
    try {
      const response = await postData<CommonResponse<void>>(`${this.url}/b2b/myClass/web/question/lecture`, request)
      console.log('addLectureQuestion response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('addLectureQuestion: ' + error)
    }
  }

  // 리스트 조회(헤더 토큰 추가 필요)
  async getDeviceList(): Promise<KollusDevice[]> {
    try {
      const response = await getData<KollusDevice[]>(`${this.url}/b2b/myClass/web/device-management`)
      console.log('getDeviceList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getList: ' + error)
    }
  }

  // 초기화 신청(헤더 토큰 추가 필요)
  async resetApplication(request: KollusDeviceApllicationVO[]): Promise<CommonResponse<void>> {
    try {
      const response = await putData<CommonResponse<void>>(
        `${this.url}/b2b/myClass/web/device-management/application/reset`,
        request
      )
      console.log('application response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('application: ' + error)
    }
  }

  // 일대일 문의 페이징 목록 조회 (마이페이지)
  async getInquiryList(request: CommonSearchSpec): Promise<FindInquiriesResponse> {
    try {
      const response = await getData<FindInquiriesResponse>(`${this.url}/b2b/myClass/web/inquiry/list`, {
        params: request
      })
      console.log('getInquiryList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getInquiryList: ' + error)
    }
  }

  // 일대일 문의 서비스 카테고리 목록 조회
  async getServiceCategoryList(): Promise<ListInquiryServiceCategoryResponse[]> {
    try {
      const response = await getData<ListInquiryServiceCategoryResponse[]>(
        `${this.url}/b2b/myClass/web/inquiry/service/category/list`
      )
      console.log('getServiceCategoryList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getServiceCategoryList: ' + error)
    }
  }

  // 일대일 문의 상세 조회
  async getInquiryDetail(inquirySeq: number): Promise<InquiryResponse> {
    try {
      const response = await getData<InquiryResponse>(`${this.url}/b2b/myClass/web/inquiry/${inquirySeq}`)
      console.log('getInquiryDetail response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getInquiryDetail: ' + error)
    }
  }

  // 일대일 문의 등록
  async addInquiry(request: B2BInquiryAddRequest): Promise<CommonResponse<void>> {
    try {
      const response = await postData<CommonResponse<void>>(`${this.url}/b2b/myClass/web/inquiry`, request)
      console.log('addInquiry response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('addInquiry: ' + error)
    }
  }

  // 일대일 문의 수정
  async editInquiry(request: B2BInquiryEditRequest): Promise<void> {
    try {
      const response = await putData<void>(`${this.url}/b2b/myClass/web/inquiry`, request)
      console.log('editInquiry response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('editInquiry: ' + error)
    }
  }

  // 일대일 문의 삭제
  async removeInquiry(inquirySeq: number): Promise<void> {
    try {
      const response = await deleteData<void>(`${this.url}/b2b/myClass/web/inquiry/${inquirySeq}`)
      console.log('removeInquiry response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('removeInquiry: ' + error)
    }
  }

  // 현재 재생 강의 저장 - 웹 버젼
  async currentLecture(request: MyClassCurrentLectureWebRequest): Promise<CommonResponse<void>> {
    try {
      const response = await postData<CommonResponse<void>>(`${this.url}/v2/myClass/currentLecture/web`, request)
      console.log('currentLecture response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('currentLecture: ' + error)
    }
  }
}

export default new MyClassService()
