// 게시판 B2B WEB 용
import { getData } from '@/api/config/client'
import type { FindNoticeListRequest, FindNoticeListResponse, NoticeDetailResponse } from '@/types/service/notice'

class NoticeService {
  url = import.meta.env.VITE_API_URL
  // 공지사항 리스트
  async findNoticeList(request: FindNoticeListRequest): Promise<FindNoticeListResponse> {
    try {
      const response = await getData<FindNoticeListResponse>(`${this.url}/b2b/notice/list`, {
        params: request
      })
      console.log('findNoticeList response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('findNoticeList: ' + error)
    }
  }

  // 공지사항 상세
  async getNoticeDetail(serviceNoticeSeq: number): Promise<NoticeDetailResponse> {
    try {
      const response = await getData<NoticeDetailResponse>(`${this.url}/b2b/notice/detail/${serviceNoticeSeq}`)
      console.log('getNoticeDetail response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('getNoticeDetail: ' + error)
    }
  }
}

export default new NoticeService()
