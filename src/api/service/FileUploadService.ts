import { postData } from '@/api/config/client'
import type { FileResponseVO } from '@/types/service/fileUpload'
import type { CommonResponse } from '@/types/commonResponse'

// public CommonResponse uploadS3(
//  @RequestPart("attachFileType") String attachFileType,
//  @RequestPart(value = "directoryType", required = false) String directoryType,
//  @RequestPart(value = "directory", required = false) String directory,
//  @RequestPart("files") @ApiParam(value = "파일 (복수 첨부 가능)") final MultipartFile[] files) {
//     return new CommonResponse(fileService.uploadS3(directoryType, directory, files, attachFileType));
// }
class FileUploadService {
  url = import.meta.env.VITE_API_URL
  async uploadS3(formData: any): Promise<CommonResponse<FileResponseVO[]>> {
    try {
      const response = await postData<CommonResponse<FileResponseVO[]>>(`${this.url}/v2/file/upload`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
      console.log('uploadS3 response : ', response)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('uploadS3: ' + error)
    }
  }
}

export default new FileUploadService()

// /v2/file/upload
