<template>
  <div id="certificateModal" class="modal-wrap">
    <div class="modal-content">
      <div class="modal-head">
        <h4>수료증</h4>
        <button type="button" class="btn-modal-close" @click="closeModal('CertificateModal')">
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="certificate-box">
          <dl id="certificatePreview">
            <dt>
              <strong class="ellipsis line-clamp-2">{{ idCard?.userName }}</strong
              ><em>(ID:{{ idCard?.userId }})</em>
            </dt>
            <dd>
              <ul>
                <li>
                  <span>교육과정명</span><strong class="ellipsis line-clamp-2">{{ idCard?.className }}</strong>
                </li>
                <li>
                  <span>수 강 기 간</span><strong> {{ idCard?.classBeginDate }}~{{ idCard?.classCloseDate }}</strong>
                </li>
                <li>
                  <span>진 도 율</span>
                  <strong
                    >{{ idCard?.progressRate }}%
                    <em>(전체 {{ idCard?.totalLectureCount }}강의 중 {{ idCard?.completeLectureCount }}강의 수강)</em>
                  </strong>
                </li>
              </ul>
              <p>
                위 사람은 주식회사 야나두에서<br />상기 교육과정을 위와 같이 수료함을 증명합니다.<strong>{{
                  formatDate()
                }}</strong>
              </p>
            </dd>
          </dl>
          <div class="btn-flex-form">
            <button class="button warning" @click="downloadCertificate">다운로드</button>
          </div>
          <div class="certificate-notice">
            <strong>유의사항</strong>
            <ul>
              <li>
                현재 수강중인 클래스와 수강완료된 클래스에 관련된 정보를 확인할 수 있으며, 신청일 기준으로 조회가
                가능합니다.
              </li>
              <li>문의사항은 학습운영센터 1600-0563으로 문의주시길 바랍니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="dimmed"></div>
  </div>
</template>

<script setup lang="ts">
import b2bStore from '@/stores/b2bStore'
import html2canvas from 'html2canvas'
import type { ModalState } from '@/types/service/gnb'
import { onMounted, ref } from 'vue'
import LearningHistoryService from '@/api/service/LearningHistoryService'
import type { IdentificationCardResponse } from '@/types/service/learningHistory'

// const props = defineProps<{ studyGroupUserSeq: number }>()
const store = b2bStore()

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

onMounted(() => {
  getLearningHistoryList(store.studyGroupUserSeqToMyClass)
})

// 학습이력 조회
const idCard = ref<IdentificationCardResponse>()
async function getLearningHistoryList(studyEntranceSeq: number) {
  idCard.value = await LearningHistoryService.getLearningHistoryList(studyEntranceSeq)
  console.log(idCard.value)
}

function formatDate(dateString?: string): string {
  const date = dateString ? new Date(dateString) : new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

function downloadCertificate() {
  const element = document.getElementById('certificatePreview')

  if (!element) {
    console.error('Element with id "certificatePreview" not found')
    return
  }

  html2canvas(element).then((canvas) => {
    const img = new Image()
    img.src = canvas.toDataURL('image/jpeg')

    const link = document.createElement('a')
    link.href = img.src
    link.download = '수강증.jpg'

    link.click()
  })
}
</script>
