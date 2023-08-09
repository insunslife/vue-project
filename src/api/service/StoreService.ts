// B2B 스토어
import { getData, postData } from '@/api/config/client'
import type {
  AddStoreStudyEntranceRequest,
  B2BCategoryInfo,
  FindStorePackageDetailRequest,
  FindStorePackageDetailResponse,
  FindStorePackagesRequest,
  FindStorePackagesResponse,
  PackageDetailCurriculumResponse
} from '@/types/service/store'
import type { CommonResponse } from '@/types/commonResponse'

class StoreService {
  url = import.meta.env.VITE_API_URL
  // B2B 패키지 카테고리 리스트 조회
  async getB2BCategories(categorySeq: number): Promise<B2BCategoryInfo[]> {
    try {
      const response = await getData<B2BCategoryInfo[]>(`${this.url}/b2b/store/package-category/list`, {
        params: {
          categorySeq
        }
      })
      console.log('getB2BCategories response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getB2BCategories: ' + error)
    }
  }

  // B2B 패키지 리스트 조회 페이징
  async getPackageListWithPage(request: FindStorePackagesRequest): Promise<FindStorePackagesResponse> {
    try {
      const response = await getData<FindStorePackagesResponse>(`${this.url}/b2b/store/package/list`, {
        params: request
      })
      console.log('getPackageListWithPage response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getPackageListWithPage: ' + error)
    }
  }

  // 상품 상세 조회
  async getPackageDetail(request: FindStorePackageDetailRequest): Promise<FindStorePackageDetailResponse> {
    try {
      const response = await getData<FindStorePackageDetailResponse>(`${this.url}/b2b/store/package/detail`, {
        params: request
      })
      console.log('getPackageDetail response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getPackageDetail: ' + error)
    }
  }

  // 상품 정보 상세 커리큘럼 목록 조회
  async getPackageDetailCurriculumList(packageSeq: number): Promise<PackageDetailCurriculumResponse> {
    try {
      const response = await getData<PackageDetailCurriculumResponse>(
        `${this.url}/b2b/store/sale/package/${packageSeq}/curriculum/list`
      )
      console.log('getPackageDetailCurriculumList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getPackageDetailCurriculumList: ' + error)
    }
  }

  // 수강 신청
  async addStudyEntrance(request: AddStoreStudyEntranceRequest): Promise<CommonResponse<void>> {
    try {
      const response = await postData<CommonResponse<void>>(`${this.url}/b2b/store/study-entrance`, request)
      console.log('addStudyEntrance response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('addStudyEntrance: ' + error)
    }
  }
}

export default new StoreService()
