<template>
  <section class="my-page-col bg-white-col">
    <section class="inner-col">
      <div class="lnb-wrap">
        <MyClassLnb />
        <section class="inquiry-content">
          <HeaderSub :sub-title="'수강중인 클래스'" />
          <div class="display-pc" :class="{ 'class-info-box': true, fail: runningDetail?.mediaProgressRate !== 100 }">
            <div class="class-info-top">
              <div class="class-info">
                <!-- 진도율 80% 이상일 경우 수료 -->
                <span v-if="(runningDetail?.mediaProgressRate || 0) < 80" class="class-badge"
                  >{{ runningDetail?.completionYnName }}
                  <em v-if="runningDetail?.completionYn === 'N'">진도율미달</em></span
                >
                <strong>{{ runningDetail?.className }}</strong>
                <div class="class-info-text">
                  <span>{{ runningDetail?.teacherName }}</span>
                  <span>{{ runningDetail?.contentType }} 총 {{ runningDetail?.classLectureCount }}강</span>
                  <span>수강기간 {{ runningDetail?.beginDate }} ~ {{ runningDetail?.closeDate }}</span>
                </div>
              </div>
              <button
                v-if="(runningDetail?.mediaProgressRate || 0) > 80"
                type="button"
                class="class-btn-wrap print btn-certificate"
                @click="certificateModal(Number(runningDetail?.studyGroupUserSeq))"
              >
                수료증 출력
              </button>
            </div>
            <div v-if="runningDetail?.completionYn === 'N'" class="progressbar">
              <div
                class="perc-fill-list"
                :class="{
                  dis: runningDetail.mediaProgressRate !== 80
                }"
              >
                <div class="bar" :style="{ '--percentage': `${runningDetail.mediaProgressRate}%` }">
                  <span
                    class="percentage-text"
                    :class="{
                      completed: runningDetail.mediaProgressRate > 0,
                      uncompleted: runningDetail.mediaProgressRate === 0
                    }"
                  >
                    {{ runningDetail.mediaProgressRate }}%
                  </span>
                </div>
                <span class="value">80% 이상 학습 필수</span>
                <div class="percentage-info">
                  <span>진도율</span>
                  <span class="score">
                    강의 진도 {{ runningDetail.mediaCompleteLectureCount }} /
                    {{ runningDetail.classLectureCount }}
                  </span>
                </div>
              </div>
            </div>
            <ul class="list">
              <li>학습을 시작하신 날로부터 권장진도가 자동체크되며, 학습을 완료하면 진도율이 100%로 표기됩니다.</li>
              <li>모든 미션은 야나두 앱에서만 제공되며, PC와 모바일 앱 간의 이어보기는 연동되지 않습니다.</li>
            </ul>
          </div>
          <div class="class-cont display-pc">
            <div class="class-tab-wrap">
              <ul class="sub-menu">
                <li
                  v-for="(tab, index) in tabs"
                  :key="index"
                  :class="{ active: activeTab === index }"
                  @click="changeTab(index)"
                >
                  <a href="#">{{ tab }}</a>
                </li>
              </ul>
              <span
                v-show="activeTab === 0 && runningDetail?.pdfFilePath !== ''"
                class="btn-download-all"
                @click="attachFileDownload(runningDetail?.pdfFilePath)"
                >학습자료 전체 다운로드
              </span>
              <select v-show="activeTab === 1" v-model="lectureSeq" @change="getLectureQuestionList()">
                <option value="">전체</option>
                <option
                  v-for="lecture in runningDetail?.lectures"
                  :key="lecture.lectureSeq"
                  :value="lecture.lectureSeq"
                >
                  {{ lecture.title }}
                </option>
              </select>
            </div>
            <div class="tab-content">
              <!-- 강의리스트 tab -->
              <ul v-show="activeTab === 0" class="lecture-list">
                <li
                  v-for="lecture in runningDetail?.lectures"
                  :key="lecture.lectureSeq"
                  :class="{ dis: lecture.mediaCompleteYn === 'N' }"
                >
                  <div class="title">
                    <div class="title-text">
                      <span class="class-badge">{{ lecture.mediaCompleteYn === 'N' ? '미수강' : '수강완료' }}</span>
                      <strong
                        class="class-title"
                        @click="openPlayer(Number(runningDetail?.studyGroupUserSeq), lecture.curriculumSeq)"
                        >{{ lecture.sortOrder }}. {{ lecture.title }}</strong
                      >
                      <strong class="class-duration">총 강의시간 {{ lecture.durationMin }}분</strong>
                    </div>
                    <div class="class-download">
                      <div
                        v-for="attachFile in lecture.attachFiles"
                        :key="attachFile.seq"
                        :class="{ 'btn-download': true, on: active }"
                        @click="toggleActive(attachFile)"
                      >
                        <div v-show="active" class="download-box">
                          <strong>학습자료 받기</strong>
                          <ul>
                            <li>
                              <a href="javascript:void(0);" @click="attachFileDownload(attachFile.attachFilePath)">
                                <em class="ellipsis">{{ attachFile.attachFileName }}</em
                                >.{{ attachFile.attachFileExtension }}
                                <i class="ico-download"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <button class="btn-question" @click="myclassQnaModal(lecture)">질문하기</button>
                    </div>
                  </div>
                  <div v-show="lecture.mediaAssets.length > 1" class="lecture-sub-class" :class="{ active: active }">
                    <button type="button" class="btn-accordion-view" @click="accordion">
                      {{ lecture.mediaAssets.length }}개 강의 보기
                    </button>
                    <ul v-show="active">
                      <li v-for="mediaAsset in lecture.mediaAssets" :key="mediaAsset.curriculumAssetSeq">
                        <div class="title">
                          <div class="title-text">
                            <span
                              class="class-title"
                              @click="openPlayer(mediaAsset.lectureSeq, mediaAsset.curriculumAssetSeq)"
                            >
                              {{ lecture.sortOrder }}-{{ mediaAsset.sortOrder }}.
                              {{ mediaAsset.contentsTypeName }}</span
                            ><span class="class-duration">강의시간 {{ mediaAsset.durationMin }}분</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              <!-- 학습문의 tab -->
              <div v-show="activeTab === 1">
                <ul v-if="questionList" class="table-area">
                  <li>
                    <span class="class-name ellipsis">강의명</span>
                    <strong class="title">문의 내용</strong>
                    <span>작성일</span>
                    <span>ID</span>
                    <span>답변여부</span>
                  </li>
                  <li v-for="question in questionList.lectureQuestionsResponses" :key="question.questionSeq">
                    <a href="#" @click.prevent="goToDetail(question.questionSeq)">
                      <span class="class-name ellipsis">{{ question.lectureTitle }}</span>
                      <div class="title">
                        <strong class="ellipsis">{{ question.contents }}</strong>
                      </div>
                      <span class="date">{{ question.registDate }}</span>
                      <span class="user-id">{{ question.registUserId }}</span>
                      <span
                        class="answer"
                        :class="{
                          active: question.replyStatus === 'Y'
                        }"
                        >{{ question.replyStatus === 'Y' ? '답변완료' : '대기' }}</span
                      >
                    </a>
                  </li>
                </ul>
                <ul v-else-if="questionList === undefined" class="table-area table-empty-list">
                  <li>
                    <img src="@/assets/images/ico_pc_inquiry_no_80x80.png" />
                    <span class="table-empty">등록된 문의가 없습니다.</span>
                  </li>
                </ul>
                <PaginationList
                  v-if="questionList?.totalCount"
                  :total-page="Math.ceil(questionList.totalCount / pageSize)"
                  @page-change="handlePageChange"
                />
              </div>
            </div>
          </div>
          <div class="myclass-login display-m">
            <p>
              PC버전과 야나두앱에서만<br />
              이용할 수 있는 서비스입니다.
            </p>
          </div>
        </section>
      </div>
    </section>
    <form ref="fileForm" method="post" action="https://api.yanadoo.co.kr/download">
      <input id="filePath" type="hidden" name="filePath" value="" />
    </form>
    <Teleport to="#modals">
      <MyClassQnaModal v-if="store.state.MyClassQnaModal == true" />
      <CertificateModal v-if="store.state.CertificateModal == true" />
    </Teleport>
    <WinPopup ref="popupPlayer"></WinPopup>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MyClassLnb from '@/components/common/MyClassLnb.vue'
import HeaderSub from '@/components/common/HeaderSub.vue'
import PaginationList from '@/components/PaginationList.vue'
import MyClassService from '@/api/service/MyClassService'
import type {
  FindLectureQuestionsResponse,
  FindLectureQuestionsRequest,
  FindMyClassRunningDetailRequest,
  FindMyClassRunningDetailResponse,
  LectureAttachFileDTO,
  MyClassRunningClassLecturesDTO
} from '@/types/service/myClass'
import CertificateModal from '@/components/modal/CertificateModal.vue'
import MyClassQnaModal from '@/components/modal/MyClassQnaModal.vue'
import { useStore } from '@/stores/b2bStore'
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router'
import WinPopup from '@/components/player/WinPopup.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const tabs = ref<Array<string>>(['강의리스트', '학습문의'])
const pageIndex = ref<number>(1)
const pageSize = ref<number>(10)
const lectureSeq = ref<number>(0)

const idx = ref<LocationQueryValue | LocationQueryValue[]>()
const tab = ref<LocationQueryValue | LocationQueryValue[]>()
onMounted(() => {
  idx.value = route.query.idx
  tab.value = route.query.tab
  getMyClassRunningDetail()
  // getLectureQuestionList();
  // if (Number(tab.value) == 2) {
  //   changeTab(1);
  // }
})

const runningDetail = ref<FindMyClassRunningDetailResponse>()
// 강의리스트
async function getMyClassRunningDetail() {
  const request: FindMyClassRunningDetailRequest = {
    studyGroupUserSeq: Number(idx.value)
  }
  const result: FindMyClassRunningDetailResponse = await MyClassService.getMyClassRunningDetail(request)
  runningDetail.value = result
}

const questionList = ref<FindLectureQuestionsResponse>()
// 학습문의
async function getLectureQuestionList() {
  const request: FindLectureQuestionsRequest = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    classSeq: runningDetail.value?.classSeq,
    lectureSeq: lectureSeq.value
  }
  const result: FindLectureQuestionsResponse = await MyClassService.getLectureQuestionList(request)
  questionList.value = result
}

// 학습자료 다운로드 TODO: 구현해야 함.
const active = ref<boolean>(false)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toggleActive(lectureAttachFile: LectureAttachFileDTO) {
  active.value = !active.value
}

// 학습자료 전체 다운로드
const fileForm = ref<HTMLFormElement | null>(null)
function attachFileDownload(attachFilePath?: string) {
  if (attachFilePath == '' || attachFilePath == null) {
    alert('해당파일이 없습니다.')
  } else {
    if (fileForm.value) {
      const filePathInput = fileForm.value.querySelector('#filePath')
      if (filePathInput) {
        ;(filePathInput as HTMLInputElement).value = attachFilePath
        fileForm.value.submit()
      }
    }
  }
}

function goToDetail(questionSeq: number) {
  router.push(`/myclass/QnaLearningDetailView?idx=${questionSeq}&sgus=${idx.value}&from=myclassQna`)
}

const activeTab = ref<number>(0)
function changeTab(index: number) {
  activeTab.value = index
  if (index == 0) {
    getMyClassRunningDetail()
  } else {
    getLectureQuestionList()
  }
}

function myclassQnaModal(lecture: MyClassRunningClassLecturesDTO) {
  store.state.MyClassQnaModal = true
  store.myClass = lecture
}

function certificateModal(studyGroupUserSeq: number) {
  store.state.CertificateModal = true
  store.studyGroupUserSeqToMyClass = studyGroupUserSeq
}

// function openModal(modalName: string, studyGroupUserSeq: number, lecture?: MyClassRunningClassLecturesDTO) {
//   console.log('lecture', lecture)
// let myClassInfo = {
//   className: myClass.value.className,
//   classSeq: myClass.value.classSeq,
//   lectureName: lecture.title,
//   lectureSeq: lecture.lectureSeq,
//   studyGroupUserSeq: myClass.value.studyGroupUserSeq,
// };
// this.$store.dispatch('openModal', modalName);
// this.$store.dispatch('setMyClassQna', myClassInfo); //질문하기 modal
// this.$store.dispatch('studyGroupUserSeqToMyClass', this.myClass.studyGroupUserSeq); //질문하기 modal내용을 학습문의 list에 전달하기 위함
// }

function accordion(event: Event) {
  const target = event.currentTarget as HTMLElement
  const ulElement = target.nextElementSibling as HTMLElement
  const isActive = ulElement.style.display === 'block'
  ulElement.style.display = isActive ? 'none' : 'block'
  target.parentElement?.classList.toggle('active', !isActive)
}

function handlePageChange(page: number) {
  pageIndex.value = page
  getLectureQuestionList()
}

// declare global {
//   interface Window {
//     daum: any
//   }
// }

// const popupPlayer = ref<Window | WinPopup>(null)
const popupPlayer = ref()
function openPlayer(studyGroupUserSeq: number, curriculumAssetSeq: number) {
  let uri = '/player'
  let width = 1048
  let height = 562
  let left = screen.width ? (screen.width - width) / 2 : 0
  let top = screen.height ? (screen.height - height) / 2 : 0
  let attr = 'top=' + top + ',left=' + left + ',width=' + width + ',height=' + height + ',scrollbars=no'

  popupPlayer.value.openWinPopup(uri, 'popupPlayer', attr, {
    studyGroupUserSeq: studyGroupUserSeq,
    curriculumAssetSeq: curriculumAssetSeq
  })
}
</script>
