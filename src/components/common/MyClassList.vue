<template>
  <section class="inner-col">
    <div class="lnb-wrap">
      <MyClassLnb />
      <section class="inquiry-content running-class">
        <HeaderSub :sub-title="'수강중인 클래스'" />
        <span v-if="!noClasses" class="sub-text display-pc"
          >야나두 학습 앱 전용 상품 이용자의 학습 편의 향상을 위해 PC에서 동영상 강의 수강을 지원하고 있습니다.
        </span>
        <div v-if="!noClasses" class="class-info-box app">
          <div class="class-info-top">
            <div class="class-info">
              <strong>야나두 학습 앱에서 수강하실 수 있습니다.</strong>
              <span
                >앱에서만 제공하는<br />
                다양한 학습 서비스를 이용해보세요.</span
              >
            </div>
            <div class="class-qrcode display-pc">
              <img src="@/assets/images/img_qrcode.png" alt="qrcode" />
            </div>
          </div>
          <button type="button" class="display-m btn btn-go-app" @click="getAppLink()">앱에서 수강하기</button>
        </div>
        <div v-if="noClasses" class="no-list">
          <p>
            현재 수강 중인 강의가 없습니다.<br />
            지금 학습을 시작해 볼까요?
          </p>
          <span class="btn-go-list" @click="goCategorySeq">과정 보러가기</span>
        </div>
        <div v-else class="class-cont">
          <ul class="accordion-list">
            <li
              v-for="(myClassRunning, index) in myClassRunningList"
              :key="myClassRunning.studyEntranceSeq"
              :class="{
                finish: myClassRunning.completionYn === 'Y',
                review: myClassRunning.reviewYn === 'Y',
                active: Number(studyEntranceSeq) == myClassRunning.studyEntranceSeq || isActive
              }"
            >
              <div class="title">
                <div class="title-text">
                  <span
                    v-if="myClassRunning.completionYn === 'Y' && myClassRunning.reviewYn === 'N'"
                    class="class-badge"
                    >D-{{ myClassRunning.remainingDays }}
                    <em>{{ myClassRunning.completionYnName }}</em>
                  </span>
                  <span
                    v-if="myClassRunning.completionYn === 'N' && myClassRunning.reviewYn === 'N'"
                    class="class-badge"
                    >D-{{ myClassRunning.remainingDays }}
                  </span>
                  <span v-if="myClassRunning.reviewYn === 'Y'" class="class-badge">복습</span>
                  <button
                    v-if="myClassRunning.reviewYn === 'Y'"
                    :class="['tooltip', 'display-pc', { on: activeTooltipIndex === index }]"
                    :data-index="index"
                    @click="toggleActiveClass(index)"
                  ></button>
                  <div v-if="myClassRunning.reviewYn === 'Y'" class="tooltip-box display-pc">
                    <ul v-show="activeTooltipIndex === index" class="tooltip-list">
                      <li>복습 클래스는 복습 가능 기간을 참고하여 종료일까지 복습하시면 됩니다.</li>
                      <li>복습과정은 진도체크와 평가가 진행되지 않습니다.</li>
                      <li>복습기간이 종료된 강의는 수강이 불가합니다.</li>
                      <li>문의 사항이 있으시면 고객센터로 문의해 주세요.</li>
                    </ul>
                  </div>

                  <strong
                    v-if="myClassRunning.packageTypeCode !== 'CLASS'"
                    class="class-title"
                    @click="btnClick(myClassRunning)"
                  >
                    <em v-if="myClassRunning.reviewYn === 'Y'">[복습]</em>
                    {{ myClassRunning.packageName }}
                  </strong>

                  <strong
                    v-if="myClassRunning.packageTypeCode === 'CLASS'"
                    class="class-title class-only"
                    @click="goToDetail(myClassRunning.studyGroupUserSeq)"
                  >
                    <em v-if="myClassRunning.reviewYn === 'Y'">[복습]</em>
                    {{ myClassRunning.packageName }}
                  </strong>
                  <div v-if="myClassRunning.reviewYn === 'N'" class="class-date class-status">
                    <span
                      >수료여부<em :class="{ dis: myClassRunning.completionYn === 'N' }" class="complete">{{
                        myClassRunning.completionYnName
                      }}</em></span
                    >
                    <span
                      >클래스수<em>{{ myClassRunning.classCount }}</em></span
                    >
                    <span
                      >수강기간<em>{{ myClassRunning.beginDate }}~{{ myClassRunning.closeDate }}</em></span
                    >
                  </div>
                  <div v-if="myClassRunning.reviewYn === 'Y'" class="class-date class-status">
                    <span
                      >클래스수<em>{{ myClassRunning.classCount }}</em></span
                    >
                    <span
                      >수강기간<em>{{ myClassRunning.beginDate }}~{{ myClassRunning.closeDate }}</em></span
                    >
                    <span v-if="myClassRunning.reviewYn === 'Y'"
                      >복습기간<em>{{ myClassRunning.reviewStartDate }}~{{ myClassRunning.reviewCloseDate }}</em></span
                    >
                  </div>
                </div>
                <!-- 단과 강의 수강 80%완료 
                <div
                  v-if="myClassRunning.completionYn === 'Y' && myClassRunning.packageTypeCode == 'CLASS'"
                  class="class-stamp"
                >
                  <ul>
                    <li v-if="myClassRunning.mediaProgressRate > 80" class="success">진도율<br />달성완료</li>
                    <li v-else>80%이상<br />진도율</li>
                  </ul>
                  <button
                    v-if="myClassRunning.completionYn === 'Y' && myClassRunning.packageTypeCode === 'CLASS'"
                    type="button"
                    class="btn-certificate"
                    @click="openModal('CertificateModal', myClassRunning.studyGroupUserSeq)"
                  >
                    수료증 받기
                  </button>
                </div>
                -->
              </div>
              <!-- 패키지 강의 수강 80%완료 -->
              <button
                v-if="myClassRunning.completionYn === 'Y' && myClassRunning.packageTypeCode !== 'CLASS'"
                type="button"
                class="btn-certificate btn-package"
                @click="openModal('CertificatePackageModal', myClassRunning.studyGroupUserSeq)"
              >
                패키지 수료증 받기
              </button>

              <button
                v-if="myClassRunning.packageTypeCode !== 'CLASS'"
                type="button"
                class="btn-accordion-view"
                @click="btnClick(myClassRunning)"
              >
                {{ myClassRunning.classCount }}개의 클래스
                {{ active ? '접기' : '펼쳐보기' }}
              </button>

              <div
                v-for="myclassSub in myClassRunning.classes"
                :key="myclassSub.classSeq"
                class="sub-class"
                :class="{
                  finish: myclassSub.completionYn === 'Y',
                  review: myclassSub.reviewYn === 'Y'
                }"
              >
                <div class="title">
                  <div class="title-text">
                    <span v-if="myclassSub.completionYn === 'Y' && myclassSub.reviewYn === 'N'" class="class-badge"
                      >D-{{ myclassSub.remainingDays }}
                      <em>{{ myclassSub.completionYnName }}</em>
                    </span>
                    <span v-if="myclassSub.completionYn === 'N' && myclassSub.reviewYn === 'N'" class="class-badge"
                      >D-{{ myclassSub.remainingDays }}
                    </span>
                    <span v-if="myclassSub.reviewYn === 'Y'" class="class-badge"> 복습 </span>
                    <strong class="class-title" @click="goToDetail(myclassSub.studyGroupUserSeq)">{{
                      myclassSub.className
                    }}</strong>
                    <div v-if="myclassSub.reviewYn === 'N'" class="class-date">
                      <span>{{ myclassSub.teacherName }}</span>
                    </div>
                    <div v-if="myclassSub.reviewYn === 'Y'" class="class-date">
                      <span>{{ myclassSub.categoryName }}<em class="dot"></em>{{ myclassSub.teacherName }}</span>
                    </div>
                  </div>
                  <div v-if="myclassSub.reviewYn === 'N'" class="class-stamp">
                    <ul>
                      <li v-if="myclassSub.mediaProgressRate > 80" class="success">진도율<br />달성완료</li>
                      <li v-else>80%이상<br />진도율</li>
                    </ul>
                    <button
                      v-if="myclassSub.completionYnName === '수료'"
                      type="button"
                      class="btn-certificate"
                      @click="openModal('CertificateModal', myclassSub.studyGroupUserSeq)"
                    >
                      수료증 받기
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FindGnbMenuListWithChildResponse } from '@/types/service/gnb'
import GnbService from '@/api/service/GnbService'
import MyClassService from '@/api/service/MyClassService'
import type { FindMyClassRunningResponse } from '@/types/service/myClass'
import HeaderSub from './HeaderSub.vue'
import MyClassLnb from './MyClassLnb.vue'

const route = useRoute()
const router = useRouter()

const myClassRunningList = ref<FindMyClassRunningResponse[]>()
const active = ref<boolean>(false)
const isActive = ref<boolean>(false)

const noClasses = ref<boolean>(false)
const activeTooltipIndex = ref<number>(-1)

function studyEntranceSeq() {
  const query = new URLSearchParams(route.query as Record<string, string>)
  return query.get('studyEntranceSeq')
}

onMounted(() => {
  getMyClassRunning()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 수강중인 클래스
async function getMyClassRunning() {
  const result: FindMyClassRunningResponse[] = await MyClassService.getMyClassRunning()
  myClassRunningList.value = result
}

function openModal(modalName: string, studyGroupUserSeq: number) {
  console.log('openModal', modalName, studyGroupUserSeq)
  // this.$store.dispatch('openModal', modalName);
  // this.$store.dispatch('studyGroupUserSeqToMyClass', studyGroupUserSeq); //단과 수료증 modal
  // this.$store.dispatch('studyGroupUserSeqToMyClassPackage', studyGroupUserSeq); //패키지 수료증 modal
}

function goToDetail(studyGroupUserSeq: number) {
  router.push(`/myClass/DetailMyClassView?idx=${studyGroupUserSeq}`)
}

//복습일 때 tooltip toggle
function toggleActiveClass(index: number) {
  activeTooltipIndex.value = activeTooltipIndex.value !== index ? index : -1
}

const handleClickOutside = () => (event: HTMLElement) => {
  if (!event.closest('.tooltip')) {
    active.value = false
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function btnClick(myClassRunning: FindMyClassRunningResponse) {
  isActive.value = !isActive.value
}

// 컨텐츠 없을 경우 과정보러가기 버튼 랜딩 경로
const gnbList = ref<FindGnbMenuListWithChildResponse[]>([])
async function goCategorySeq() {
  const result: FindGnbMenuListWithChildResponse[] = await GnbService.getGnbListWithChild()
  gnbList.value = result
  router.push('/store/ListProductView/' + gnbList.value[0].childGnbMenus[0].categorySeq)
}

// 모바일에서 노출되는 앱에서 수강하기 버튼 클릭했을 때 디바이스 확인을 위해 User-agent 사용
function getAppLink() {
  const userAgent = navigator.userAgent.toLowerCase()

  // Android 기기일 때 && Chrome 브라우저일 때
  if (userAgent.includes('android') || userAgent.includes('chrome')) {
    window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.yanadoo.app2'
  }

  // iOS 기기일 때 && Safari 브라우저일 때
  if (
    (userAgent.includes('iphone') || userAgent.includes('ipad')) &&
    userAgent.includes('safari') &&
    !userAgent.includes('chrome')
  ) {
    window.location.href = 'https://apps.apple.com/kr/app/id1539582420'
  }
}

//수료증 modal에 Vuex 사용
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setStudyGroupUserSeq(studyGroupUserSeq: number) {
  console.log('setStudyGroupUserSeq', studyGroupUserSeq)
  // store.dispatch('setMyClassStudySeq', {
  //   studyGroupUserSeq: studyGroupUserSeq,
  // });
}
</script>
