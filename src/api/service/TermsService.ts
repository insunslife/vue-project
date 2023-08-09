import { getData } from '@/api/config/client'
import type { FindTermsRequest, FindTermsResponse } from '@/types/service/terms'

class TermsService {
  url = import.meta.env.VITE_API_URL
  // 이용약관 / 개인정보처리방침
  async getTerms(request: FindTermsRequest): Promise<FindTermsResponse> {
    try {
      const response = await getData<FindTermsResponse>(`${this.url}/b2b/terms/`, {
        params: request
      })
      console.log('getTerms response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getTerms: ' + error)
    }
  }
}

export default new TermsService()
