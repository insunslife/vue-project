import { getData } from '@/api/config/client'
import type { FaqGroupListResponse, FaqListResponse, FindFaqRequest, FindFaqsResponse } from '@/types/service/faq'

class FaqService {
  url = import.meta.env.VITE_API_URL
  // B2B 자주묻는질문(FAQ) WEB 전용
  // https://dev.yanadoo.co.kr/b2b/faq/group
  // 그룹 (카테고리) 목록 조회
  async getGroupList(): Promise<FaqGroupListResponse[]> {
    try {
      const response = await getData<FaqGroupListResponse[]>(`${this.url}/b2b/faq/group`)
      console.log('getGroupList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getGroupList: ' + error)
    }
  }

  // TODO: faqGroup 코드 값들 찾아야 함.
  // https://dev.yanadoo.co.kr/b2b/faq/group/{faqGroupSeq}
  // https://dev.yanadoo.co.kr/b2b/faq/list?faqGroup=ALL&pageIndex=1&pageSize=10&titleContents=
  // FAQ 페이징 목록 조회
  async getList(request: FindFaqRequest): Promise<FindFaqsResponse> {
    try {
      const response = await getData<FindFaqsResponse>(`${this.url}/b2b/faq/list`, {
        params: request
        // params: Object.entries(request)
        //   .map(([key, value]) => `${key}=${value}`)
        //   .join('&')
      })
      console.log('getList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getList: ' + error)
    }
  }

  // FAQ 특정 항목 조회
  async getFaqResponse(faqSeq: number): Promise<FaqListResponse> {
    try {
      const response = await getData<FaqListResponse>(`${this.url}/b2b/faq/${faqSeq}`)
      console.log('getFaqResponse response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getFaqResponse: ' + error)
    }
  }
}

export default new FaqService()
