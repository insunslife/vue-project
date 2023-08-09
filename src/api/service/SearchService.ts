import { getData } from '@/api/config/client'
import type { SearchPackagesRequest, SearchPackagesResponse } from '@/types/service/search'

// https://dev.yanadoo.co.kr/b2b/search/packages?isRegister=false&pageIndex=1&pageSize=10&searchWord=%25EC%2598%2581%25EC%2596%25B4

class SearchService {
  url = import.meta.env.VITE_API_URL
  // 상품 리스트 검색
  async searchPackages(request: SearchPackagesRequest): Promise<SearchPackagesResponse> {
    try {
      const response = await getData<SearchPackagesResponse>(`${this.url}/b2b/search/packages`, {
        params: request
      })
      console.log('searchPackages response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('searchPackages: ' + error)
    }
  }
}

export default new SearchService()
