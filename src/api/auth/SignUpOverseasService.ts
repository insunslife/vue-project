import { getData, postData } from '@/api/config/client'
import type {
  B2BOverseasSignUpRequest,
  B2BOverseasSignUpResponse,
  VerifyOverseasSignUpMailRequest,
  VerifyOverseasSignUpMailResponse
} from '@/types/auth/signUp'

class SignUpOverseasService {
  url = import.meta.env.VITE_AUTH_API_URL
  // 해외거주자 가입메일 인증
  async verifyOverseasSignUpMail(payload: VerifyOverseasSignUpMailRequest): Promise<VerifyOverseasSignUpMailResponse> {
    try {
      const response = await getData<VerifyOverseasSignUpMailResponse>(`${this.url}/b2b/overseas/sign-up/verify/cc`, {
        params: payload
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('verifyOverseasSignUpMail: ' + error)
    }
  }

  // 해외거주자 회원 가입
  async signUp(payload: B2BOverseasSignUpRequest): Promise<B2BOverseasSignUpResponse> {
    try {
      const response = await postData<B2BOverseasSignUpResponse>(`${this.url}/b2b/overseas/sign-up/overseas`, payload)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('signUp: ' + error)
    }
  }
}

export default new SignUpOverseasService()
