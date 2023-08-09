// GNB B2B Web 용
// GNB nested 구조 조회
import { getData } from '@/api/config/client'
import type { FindGnbMenuListWithChildResponse } from '@/types/service/gnb'

class GnbService {
  url = import.meta.env.VITE_API_URL
  async getGnbListWithChild(): Promise<FindGnbMenuListWithChildResponse[]> {
    try {
      const response = await getData<FindGnbMenuListWithChildResponse[]>(`${this.url}/b2b/gnb/list-with-child`)
      console.log('getGnbListWithChild response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getGnbListWithChild: ' + error)
    }
  }
}

export default new GnbService()
