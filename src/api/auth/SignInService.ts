import { getData, postData, putData } from '@/api/config/client'
import type {
  B2BChangePasswordOfFirstSignInMassUserRequest,
  B2BFindLaterChangePasswordRequest,
  B2BFindPasswordRequest,
  B2BFindPasswordResponse,
  B2BFindUserIdRequest,
  B2BFindUserIdResponse,
  B2BGetFirstSignInMassMeResponse,
  B2BReissueAccessTokenResponse,
  B2BSignInRequest,
  B2BSignInResponse
} from '@/types/auth/signIn'
import type { CommonResponse } from '@/types/commonResponse'

class SignInService {
  url = import.meta.env.VITE_AUTH_API_URL
  // Web 로그인
  async signIn(payload: B2BSignInRequest): Promise<B2BSignInResponse> {
    try {
      const response = await postData<B2BSignInResponse>(`${this.url}/b2b/sign-in`, payload)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('signIn: ' + error)
    }
  }

  // 최초 로그인한 일괄가입자 정보 조회
  async getFirstSignInMassMe(): Promise<B2BGetFirstSignInMassMeResponse> {
    try {
      const response = await getData<B2BGetFirstSignInMassMeResponse>(`${this.url}/b2b/first/mass-me`)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getFirstSignInMassMe: ' + error)
    }
  }

  // 최초 로그인한 일괄가입자 비밀번호 변경
  async changePasswordOfFirstSignInMassUser(
    payload: B2BChangePasswordOfFirstSignInMassUserRequest
  ): Promise<CommonResponse<void>> {
    try {
      const response = await putData<void>(`${this.url}/b2b/first/change-password`, payload)
      return response
    } catch (error) {
      console.error(error)
      throw new Error('changePasswordOfFirstSignInMassUser: ' + error)
    }
  }

  // access token 재발급
  async reissueAccessToken(refreshToken?: string): Promise<B2BReissueAccessTokenResponse> {
    try {
      const response = await getData<B2BReissueAccessTokenResponse>(`${this.url}/b2b/reissue/access-token`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('reissueAccessToken: ' + error)
    }
  }

  // ID 찾기
  async findUserId(payload: B2BFindUserIdRequest): Promise<B2BFindUserIdResponse> {
    try {
      const response = await postData<B2BFindUserIdResponse>(`${this.url}/b2b/sign-in/find-id`, payload)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('findUserId: ' + error)
    }
  }

  // 비밀번호 찾기
  async findPassword(payload: B2BFindPasswordRequest): Promise<B2BFindPasswordResponse> {
    try {
      const response = await postData<B2BFindPasswordResponse>(`${this.url}/b2b/sign-in/find-password`, payload)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('findPassword: ' + error)
    }
  }

  // 비밀번호 찾기용 비밀번호 변경
  async findLaterChangePassword(payload: B2BFindLaterChangePasswordRequest): Promise<CommonResponse<void>> {
    try {
      const response = await putData<CommonResponse<void>>(
        `${this.url}/b2b/sign-in/find-password/change-password`,
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('findLaterChangePassword: ' + error)
    }
  }
}

export default new SignInService()
