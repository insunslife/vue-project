import { getData } from '@/api/config/client'
import type { CommonResponse } from '@/types/commonResponse'
import type {
  CurriculumMediaCompleteRequest,
  KollusPlayerKeyVO,
  WebCurriculumResponse
} from '@/types/service/curriculum'

class CurriculumService {
  url = import.meta.env.VITE_API_URL
  // 웹용 커리큘럼 (강의리스트) response = WebCurriculumResponse.class)
  async getWebCurriculum(studyGroupUserSeq: number): Promise<WebCurriculumResponse> {
    try {
      const response = await getData<WebCurriculumResponse>(`${this.url}/v2/curriculum/web/${studyGroupUserSeq}`)
      console.log('getWebCurriculum response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getWebCurriculum: ' + error)
    }
  }

  // 영상 에셋 완료 처리
  async completeCurriculumMediaAsset(request: CurriculumMediaCompleteRequest): Promise<CommonResponse<boolean>> {
    try {
      const response = await getData<CommonResponse<boolean>>(`${this.url}/v2/curriculum/complete/media`, {
        params: request
      })
      console.log('completeCurriculumMediaAsset response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('completeCurriculumMediaAsset: ' + error)
    }
  }

  // mediaContentKey=${this.mediaContentKey}&curriculumAssetSeq=${this.curriculumAssetSeq
  // 콜러스 재생 key 발급 KollusPlayerKeyVO
  async getKey(
    mediaContentKey: string,
    curriculumAssetSeq: number,
    studyGroupUserSeq?: number,
    download?: string
  ): Promise<KollusPlayerKeyVO> {
    try {
      const response = await getData<KollusPlayerKeyVO>(`${this.url}/v2/curriculum/kollus/get-key`, {
        params: {
          mediaContentKey,
          studyGroupUserSeq,
          curriculumAssetSeq,
          download
        }
      })
      console.log('getKey response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getKey: ' + error)
    }
  }
}

export default new CurriculumService()
