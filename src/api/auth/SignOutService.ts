import { deleteData } from '@/api/config/client'
import type { B2BSignOutRequest } from '@/types/auth/signOut'

class SignOutService {
  url = import.meta.env.VITE_AUTH_API_URL
  // 로그아웃
  async signOut(payload: B2BSignOutRequest): Promise<void> {
    try {
      const response = await deleteData<void>(`${this.url}/b2b/sign-out/${payload}`)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('signOut: ' + error)
    }
  }
}

export default new SignOutService()
