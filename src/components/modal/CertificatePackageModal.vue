<template>
  <div id="certificateModal" class="modal-wrap">
    <div class="modal-content">
      <div class="modal-head">
        <h4>수료증</h4>
        <button type="button" class="btn-modal-close" @click="closeModal('CertificatePackageModal')">
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
                  <span>교육과정명</span><strong class="ellipsis line-clamp-2">{{ idCard?.packageName }}</strong>
                </li>
                <li>
                  <span>수 강 기 간</span><strong> {{ idCard?.classBeginDate }}~{{ idCard?.classCloseDate }}</strong>
                </li>
                <li>
                  <span>진 도 율</span
                  ><strong
                    >{{ idCard?.progressRate }}%<em
                      >(전체 {{ idCard?.totalLectureCount }}강의 중 {{ idCard?.completeLectureCount }}강의 수강)</em
                    ></strong
                  >
                </li>
              </ul>
              <p>
                위 사람은 주식회사 야나두에서<br />상기 교육과정을 위와 같이 수료함을 증명합니다.<strong>{{
                  currentDate
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

<!-- script -->
<script setup lang="ts">
import LearningHistoryService from '@/api/service/LearningHistoryService'
import b2bStore from '@/stores/b2bStore'
import type { ModalState } from '@/types/service/gnb'
import type { PackageIdentificationCardResponse } from '@/types/service/learningHistory'
import html2canvas from 'html2canvas'
import { onMounted, ref } from 'vue'

const store = b2bStore()

const studyGroupUserSeq = ref<number>(0)
const idCard = ref<PackageIdentificationCardResponse>()
const currentDate = ref<string>('')

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

onMounted(() => {
  fnPackageGetView(studyGroupUserSeq.value)
  currentDate.value = formatDate(new Date().toString())
})

async function fnPackageGetView(studyGroupUserSeq: number) {
  const result: PackageIdentificationCardResponse = await LearningHistoryService.getPackageIdentificationCard(
    studyGroupUserSeq
  )
  if (result) {
    idCard.value = result
    idCard.value.classBeginDate = formatDate(result.classBeginDate)
    idCard.value.classCloseDate = formatDate(result.classCloseDate)
  }
}

function formatDate(dateString: string) {
  if (!dateString) {
    return ''
  }
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
