import { getData, postData } from '@/api/config/client'
import type {
  B2BIssueCertificationCodeByNoSignInRequest,
  B2BIssueCertificationCodeBySignInRequest,
  B2BIssueDisposableJWTResponse,
  B2BVerifyCertificationCodeByNoSignInRequest,
  B2BVerifyCertificationCodeBySignInRequest,
  B2BVerifyCertificationCodeBySignInResponse,
  B2BVerifyCertificationCodeNoSignInResponse
} from '@/types/auth/certification'
import type { CommonResponse } from '@/types/commonResponse'

class CertificationService {
  url = import.meta.env.VITE_AUTH_API_URL
  // 인증번호 발급 API 호출용 일회성 JWT 발급
  // https://dev.yanadoo.co.kr/b2b/certification/issue/d-jwt
  async issueDisposableJWT(issuer: string): Promise<B2BIssueDisposableJWTResponse> {
    try {
      const response = await getData<B2BIssueDisposableJWTResponse>(`${this.url}/b2b/certification/issue/d-jwt`, {
        headers: {
          Audience: issuer // TODO: yanadoo 고정인지 확인해야 함.
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('issueDisposableJWT: ' + error)
    }
  }

  // 인증번호 발급 (비 로그인용)
  async nsiIssueCertificationCode(payload: B2BIssueCertificationCodeByNoSignInRequest): Promise<CommonResponse<void>> {
    try {
      const response = await postData<void>(`${this.url}/b2b/certification/nsi/issue/cc`, payload)
      return response
    } catch (error) {
      console.error(error)
      throw new Error('nsiIssueCertificationCode: ' + error)
    }
  }

  // 인증번호 인증 (비 로그인용)
  async nsiVerifyCertificationCode(
    payload: B2BVerifyCertificationCodeByNoSignInRequest
  ): Promise<B2BVerifyCertificationCodeNoSignInResponse> {
    try {
      const response = await postData<B2BVerifyCertificationCodeNoSignInResponse>(
        `${this.url}/b2b/certification/nsi/verify/cc`,
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('nsiVerifyCertificationCode: ' + error)
    }
  }

  // 인증번호 발급 (로그인)
  async siIssueCertificationCode(payload: B2BIssueCertificationCodeBySignInRequest): Promise<CommonResponse<void>> {
    try {
      const response = await postData<CommonResponse<void>>(`${this.url}/b2b/certification/si/issue/cc`, payload)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('siIssueCertificationCode: ' + error)
    }
  }

  // 인증번호 인증 (로그인)
  async siVerifyCertificationCode(
    payload: B2BVerifyCertificationCodeBySignInRequest
  ): Promise<B2BVerifyCertificationCodeBySignInResponse> {
    try {
      const response = await postData<B2BVerifyCertificationCodeBySignInResponse>(
        `${this.url}/b2b/certification/si/verify/cc`,
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('siVerifyCertificationCode: ' + error)
    }
  }
}

export default new CertificationService()
