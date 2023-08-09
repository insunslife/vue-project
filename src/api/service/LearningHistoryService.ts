import { getData } from '@/api/config/client'
import type { IdentificationCardResponse, PackageIdentificationCardResponse } from '@/types/service/learningHistory'

class LearningHistoryService {
  url = import.meta.env.VITE_API_URL
  async getLearningHistoryList(studyGroupUserSeq: number): Promise<IdentificationCardResponse> {
    try {
      const response = await getData<IdentificationCardResponse>(
        `${this.url}/v2/learning-history/identification-card/${studyGroupUserSeq}`
      )
      console.log('getLearningHistoryList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getLearningHistoryList: ' + error)
    }
  }

  // 수강증 조회 (패키지), response = PackageIdentificationCardResponse.class)
  async getPackageIdentificationCard(studyGroupUserSeq: number): Promise<PackageIdentificationCardResponse> {
    try {
      const response = await getData<PackageIdentificationCardResponse>(
        `${this.url}/v2/learning-history/identification-card/package/${studyGroupUserSeq}`
      )
      console.log('getPackageIdentificationCard response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getPackageIdentificationCard: ' + error)
    }
  }
}

export default new LearningHistoryService()
