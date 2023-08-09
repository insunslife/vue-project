<template>
  <div class="modal-wrap">
    <div class="modal-content question-popup">
      <div class="modal-head">
        <h4>학습문의</h4>
        <button type="button" class="btn-modal-close" @click="closeModal('MyClassQnaModal')">
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="qna-title">
          <strong>{{ 'myClass.className' }}</strong>
          <span>{{ 'myClass.lectureName' }}</span>
        </div>
        <form>
          <ul>
            <li>
              <label for="" class="modal-tit">문의내용</label>
              <textarea
                v-model="contents"
                id="inquiryTxt"
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
                <input
                  type="text"
                  class="file-txt"
                  :value="questionFilePath ? decodeURIComponent(questionFilePath) : '파일을 선택해 주세요.'"
                />
                <div class="form-btn">
                  <input id="input_file" class="upload-btn" type="file" @change="uploadFile" />
                  <label class="file-btn" for="input_file">파일찾기</label>
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
            <div class="form-button-wrap">
              <button class="form-button white" @click="closeModal('MyClassQnaModal')">취소</button>
              <button class="form-button" :disabled="!contents" @click="handleConfirmation">확인</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="dimmed" @click="closeModal('MyClassQnaModal')"></div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import MyClassService from '@/api/service/MyClassService'
import b2bStore from '@/stores/b2bStore'
import type { ModalState } from '@/types/service/gnb'
import type { LectureQuestionAddRequest } from '@/types/service/myClass'
import { ref } from 'vue'
import FileUploadService from '@/api/service/FileUploadService'
// TODO: 위 버튼들에 걸려 있는 closeModal 다 필요한 것인지 확인 필요
const store = b2bStore()

// const myClass = ref(store.myClass)
const contents = ref<string>('')
const questionFilePath = ref<string>('')
const realFilePath = ref<string>('')

// function openModal(modalName: keyof ModalState): void {
//   store.openModal(modalName)
// }

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

// const countryCodeChange = (e: Event) => {
// const target = e.target as HTMLSelectElement
// countryCode.value = target.value
//
const handleConfirmation = (e: Event) => {
  e.preventDefault()
  // const inquiryTxtElement = document.getElementById('inquiryTxt')
  // if (isClassUnavailable.value) {
  //   alert('클래스 정보가 존재하지 않습니다.')
  //   return
  // }

  if (contents.value.trim().length === 0) {
    alert('문의 내용을 입력해주세요.')
    // inquiryTxtElement.focus()
    return
  }

  if (contents.value.length < 10) {
    alert('최소 10자 이상 입력해주세요.')
    // inquiryTxtElement.focus()
    return
  }
  addLectureQuestion()
}

async function addLectureQuestion() {
  const request: LectureQuestionAddRequest = {
    classSeq: 0,
    lectureSeq: 0,
    contents: '',
    questionFilePath: ''
  }
  const result = await MyClassService.addLectureQuestion(request)
  if (result.meta.code === 200) {
    alert('문의가 등록되었습니다.')
    contents.value = ''
    questionFilePath.value = ''

    closeModal('MyClassQnaModal')
  } else {
    alert('문의 등록 중 오류가 발생했습니다.')
  }
}

async function uploadFile(element: Event) {
  const target = element.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    const formData = new FormData()
    formData.append('attachFileType', 'IMAGE')
    formData.append('files', files[0])

    const response = await FileUploadService.uploadS3(formData)
    if (response.meta.code === 200) {
      realFilePath.value = response.data[0].filePath
      questionFilePath.value = response.data[0].originalFileName
    } else {
      alert('파일 업로드 중 오류가 발생했습니다.')
    }
  }
}
</script>

<!-- style -->
<style scoped>
.modal-wrap form {
  padding: 0 3.2rem 9.6rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 70%, rgba(247, 247, 252, 1) 30%);
}
</style>
