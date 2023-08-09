import { getData, postData } from '@/api/config/client'
import type {
  B2BIsIndividualResponse,
  B2BSearchSignUpAdditionalItemResponse,
  B2BSignUpRequest,
  B2BSignUpResponse
} from '@/types/auth/signUp'

class SignUpService {
  url = import.meta.env.VITE_AUTH_API_URL
  // 개별가입 가능여부 확인
  async isIndividual(siteCode: string): Promise<B2BIsIndividualResponse> {
    try {
      const response = await getData<B2BIsIndividualResponse>(`${this.url}/b2b/sign-up/is-individual`, {
        headers: {
          'Origin-Site-Code': siteCode
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('isIndividual: ' + error)
    }
  }

  // 회원가입시에 입력할 추가사항 조회
  async searchSignUpAdditionalItem(siteCode: string): Promise<B2BSearchSignUpAdditionalItemResponse> {
    try {
      const response = await getData<B2BSearchSignUpAdditionalItemResponse>(`${this.url}/b2b/sign-up/additional-item`, {
        headers: {
          'Origin-Site-Code': siteCode
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('searchSignUpAdditionalItem: ' + error)
    }
  }

  // B2B 회원가입
  async signUp(payload: B2BSignUpRequest): Promise<B2BSignUpResponse> {
    try {
      const response = await postData<B2BSignUpResponse>(`${this.url}/b2b/sign-up`, payload)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('signUp: ' + error)
    }
  }
}

export default new SignUpService()
