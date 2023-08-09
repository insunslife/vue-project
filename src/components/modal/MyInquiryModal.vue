<template>
  <div id="inquiryModal" class="modal-wrap">
    <div class="modal-content question-popup">
      <div class="modal-head">
        <h4>1:1 문의</h4>
        <button type="button" class="btn-modal-close" @click="closeModal('MyInquiryModal')">
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <ul>
            <li>
              <strong class="modal-tit">문의분류</strong>
              <select v-model="categoryCode" required class="classification">
                <option :value="Number(0)" disabled>문의 분류를 선택해 주세요.</option>
                <option
                  v-for="categoryItem in categoryItemList"
                  :key="categoryItem.categoryName"
                  :value="categoryItem.categoryCode"
                >
                  {{ categoryItem.categoryName }}
                </option>
              </select>
            </li>
            <li>
              <strong class="modal-tit">문의내용</strong>
              <textarea
                id="inquiryTxt"
                v-model="contents"
                placeholder="현재 문의량이 많아 답변이 지연되고 있습니다. 순차적으로 답변 드리고 있으며, 빠른 답변이 될 수 있도록 하겠습니다. 불편을 드려 죄송합니다."
                maxlength="1000"
              ></textarea>
              <p class="count-txt">
                <span>{{ contents.length }}</span
                >/1000
              </p>
            </li>

            <!-- file -->
            <li>
              <strong class="modal-tit">첨부파일</strong>
              <div class="form-style02 file-wrap">
                <input class="file-txt" :value="selectFileName" disabled />
                <div class="form-btn">
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/"
                    class="file-upload"
                    @change="uploadFile"
                    @click="resetFile"
                  />
                  <label class="file-btn" for="fileUpload">파일찾기</label>
                </div>
              </div>
              <span class="form-guide">파일은 2MB 이하, jpg, png, gif 형식만 등록 가능 합니다.</span>
            </li>
            <!-- // file -->
          </ul>
          <div class="question-notice">
            <strong>문의 작성 안내</strong>
            <ul>
              <li>
                약관 및 법률에 위배(비속어, 허위사실 등), 해석이 불가능하거나 문의 외 다른 목적의 글을 작성한 경우
                관리자에 의해 사전 동의 없이 미게시 될 수 있습니다.
              </li>
              <li>작성하신 내용은 홍보, 이벤트 등 다양한 방법으로 활용될 수 있습니다.</li>
            </ul>
          </div>
          <div class="form-button-wrap">
            <button type="button" class="form-button white" @click="closeModal('MyInquiryModal')">취소</button>
            <button type="button" class="form-button" :disabled="!contents" @click="addInquiry">확인</button>
          </div>
        </form>
      </div>
    </div>
    <div class="dimmed"></div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '@/stores/b2bStore'
import type { ModalState } from '@/types/service/gnb'
import MyClassService from '@/api/service/MyClassService'
import type {
  B2BInquiryAddRequest,
  ListInquiryCategoryItem,
  ListInquiryServiceCategoryResponse
} from '@/types/service/myClass'
import FileUploadService from '@/api/service/FileUploadService'
import type { FileResponseVO } from '@/types/service/fileUpload'

const store = useStore()
const uploadImg = ref<FileResponseVO>()
const emits = defineEmits(['update-inquiries'])

// 초기화
onMounted(() => {
  getCategoryList()
})

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

// 일대일 문의 서비스 카테고리 목록 조회
const serviceType = ref<string>('')
const categoryList = ref<Array<ListInquiryServiceCategoryResponse>>([])
const categoryItemList = ref<Array<ListInquiryCategoryItem>>([])
async function getCategoryList() {
  const result: ListInquiryServiceCategoryResponse[] = await MyClassService.getServiceCategoryList()
  if (result) {
    categoryList.value = result
    categoryItemList.value = result[3].categoryList
    serviceType.value = result[3].serviceType
  }
}

// 파일 업로드 TODO: 파일 업로드 API 연동이 이미지만 하고 있어서 수정 필요
const selectFilePath = ref<string>('')
const selectFileName = ref<string>('파일을 선택해 주세요.')
async function uploadFile(element: Event) {
  const target = element.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    const formData = new FormData()
    formData.append('attachFileType', 'IMAGE')
    formData.append('files', files[0])

    const response = await FileUploadService.uploadS3(formData)
    if (response.meta.code === 200) {
      selectFilePath.value = response.data[0].filePath
      selectFileName.value = response.data[0].originalFileName
      uploadImg.value = response.data[0].thumbnailFile
    } else {
      // alert('파일 업로드 중 오류가 발생했습니다.')
      alert(response.meta.message)
    }
  }
}

// 파일 선택 취소
const resetFile = () => {
  selectFilePath.value = ''
  selectFileName.value = ''
}

// 일대일 문의 등록
const categoryCode = ref<number>(0)
const contents = ref<string>('')
async function addInquiry() {
  const request: B2BInquiryAddRequest = {
    serviceType: serviceType.value,
    category: categoryCode.value,
    contents: contents.value,
    inquiryFilePath: uploadImg.value ? uploadImg.value.filePath : ''
  }
  const result = await MyClassService.addInquiry(request)
  if (result.meta.code === 200) {
    alert('등록되었습니다. \n문의내용은 MY클래스 > 문의하기 에서 확인하실 수 있습니다.')
    closeModal('MyInquiryModal')
    emits('update-inquiries')
  } else {
    alert(result.meta.message)
  }
}
</script>

<!-- style -->
<style scoped>
.modal-wrap form {
  padding: 0 3.2rem 9.6rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 70%, rgba(247, 247, 252, 1) 30%);
}

@media screen and (max-width: 1024px) {
  .modal-content {
    height: 77.5vh;
  }
  .modal-wrap form {
    padding-bottom: 19.4rem;
  }
}
</style>
