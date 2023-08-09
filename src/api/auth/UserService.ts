import { getData, putData } from '@/api/config/client'
import type { B2BFindMeResponse, B2BModifyMeRequest, B2BModifyPasswordRequest } from '@/types/auth/user'
import type { CommonResponse } from '@/types/commonResponse'

class UserService {
  url = import.meta.env.VITE_AUTH_API_URL
  // 회원 정보 조회
  async findMe(): Promise<B2BFindMeResponse> {
    try {
      const response = await getData<B2BFindMeResponse>(`${this.url}/b2b/user/me`)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('findMe: ' + error)
    }
  }

  // 회원정보 수정
  async modifyMe(payload: B2BModifyMeRequest): Promise<CommonResponse<void>> {
    try {
      const response = await putData<CommonResponse<void>>(`${this.url}/b2b/user/me`, payload)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('modifyMe: ' + error)
    }
  }

  // 비밀번호 변경
  async modifyPassword(payload: B2BModifyPasswordRequest): Promise<CommonResponse<void>> {
    try {
      const response = await putData<CommonResponse<void>>(`${this.url}/b2b/user/password`, payload)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('modifyPassword: ' + error)
    }
  }
}

export default new UserService()
