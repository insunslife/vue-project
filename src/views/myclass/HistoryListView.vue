<template>
  <section class="my-page-col">
    <section class="inner-col">
      <div class="lnb-wrap">
        <MyClassLnb />
        <section class="inquiry-content history">
          <HeaderSub :sub-title="'수강이력'" />
          <span v-if="!noClasses" class="sub-text display-pc">
            야나두 학습 앱 전용 상품 이용자의 학습 편의 향상을 위해 PC에서 동영상 강의 수강을 지원하고 있습니다.
          </span>
          <div v-if="!noClasses" class="class-info-box app">
            <div class="class-info-top">
              <div class="class-info">
                <strong>야나두 학습 앱에서 수강하실 수 있습니다. </strong>
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
          <div class="class-cont">
            <div v-if="active" class="tooltip-box on">
              <button class="close display-pc" @click="active = false"></button>
              <strong class="tooltip-title display-m">수강신청 및 취소 주의사항</strong>
            </div>
            <ul class="accordion-list">
              <!-- 수료 finish 클래스 -->
              <li
                v-for="myClassEnd in myClassEndList"
                :key="myClassEnd.studyEntranceSeq"
                :class="{ active: isActive, finish: myClassEnd.completionYn === 'Y' }"
              >
                <div class="title">
                  <div class="title-text">
                    <span class="class-badge">{{ myClassEnd.completionYnName }}</span>
                    <strong class="class-title" @click="btnClick(myClassEnd)">{{ myClassEnd.title }}</strong>
                    <div class="class-date">
                      <span>{{ myClassEnd.categoryName }} ∙ {{ myClassEnd.teacherName }}</span>
                      <span><em>수강기간</em> {{ myClassEnd.classStartDate }} ~ {{ myClassEnd.classEndDate }}</span>
                      <span v-show="myClassEnd.repeatStartDate != null"
                        ><em>복습기간</em> {{ myClassEnd.repeatStartDate }} ~ {{ myClassEnd.repeatEndDate }}</span
                      >
                    </div>
                  </div>
                </div>
                <button
                  v-if="myClassEnd.completionYn === 'Y'"
                  type="button"
                  class="btn-certificate btn-package"
                  @click="openModal('CertificatePackageModal', myClassEnd.studyGroupUserSeq)"
                >
                  패키지 수료증 받기
                </button>
                <button
                  v-if="myClassEnd.findClassResponses.length !== 0"
                  type="button"
                  class="btn-accordion-view"
                  @click="btnClick(myClassEnd)"
                >
                  {{ myClassEnd.findClassResponses.length }}개의 클래스 {{ active ? '접기' : '펼쳐보기' }}
                </button>
                <div
                  v-for="myclassSub in myClassEnd.findClassResponses"
                  :key="myclassSub.classSeq"
                  class="sub-class"
                  :class="{
                    finish: myclassSub.completionYn === 'Y'
                  }"
                >
                  <div class="title">
                    <div class="title-text">
                      <span class="class-badge">{{ myclassSub.completionYnName }} </span>
                      <strong class="class-title">{{ myclassSub.className }}</strong>
                      <div class="class-date">
                        <span>{{ myclassSub.categoryName }} ∙ {{ myclassSub.teacherName }}</span>
                      </div>
                    </div>
                    <div v-if="myclassSub.completionYn === 'Y'" class="class-stamp">
                      <button
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
            <div v-if="noClasses" class="no-list">
              <p>
                수강하신 강의가 없습니다.<br />
                지금 학습을 시작해 볼까요?
              </p>
              <span class="btn-go-list" @click="goCategorySeq">과정 보러가기</span>
            </div>
          </div>
        </section>
      </div>
    </section>
    <Teleport to="#modals">
      <CertificateModal v-if="store.state.CertificateModal == true" />
      <CertificatePackageModal v-if="store.state.CertificatePackageModal == true" />
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import type { FindMyClassEndsResponse } from '@/types/service/myClass'
import MyClassService from '@/api/service/MyClassService'
import { onMounted, ref } from 'vue'
import b2bStore from '@/stores/b2bStore'
import { useRouter } from 'vue-router'
import type { FindGnbMenuListWithChildResponse } from '@/types/service/gnb'
import GnbService from '@/api/service/GnbService'
import MyClassLnb from '@/components/common/MyClassLnb.vue'
import HeaderSub from '@/components/common/HeaderSub.vue'
import CertificateModal from '@/components/modal/CertificateModal.vue'
import CertificatePackageModal from '@/components/modal/CertificatePackageModal.vue'

const router = useRouter()
const store = b2bStore()

const myClassEndList = ref<FindMyClassEndsResponse[]>([])
const active = ref<boolean>(false)
const noClasses = ref<boolean>(false)
const isActive = ref<boolean>(false)

onMounted(() => {
  getMyClassEnds()
})

// 수강종료 클래스 (수강이력)
async function getMyClassEnds() {
  const result: FindMyClassEndsResponse[] = await MyClassService.getMyClassEnds()
  myClassEndList.value = result
}

function openModal(modalName: string, studyGroupUserSeq: number) {
  console.log(modalName)
  console.log(studyGroupUserSeq)

  // this.$store.dispatch('openModal', modalName);
  // this.$store.dispatch('studyGroupUserSeqToMyClass', studyGroupUserSeq);
  // this.$store.dispatch('studyGroupUserSeqToMyClassPackage', studyGroupUserSeq);
}

function btnClick(myClassEnd: FindMyClassEndsResponse) {
  console.log(myClassEnd)
  isActive.value = !isActive.value
  // myClassEnd.isActive = !myClassEnd.isActive;
  // myclass.active = !myclass.active;
}

const gnbList = ref<FindGnbMenuListWithChildResponse[]>([])
async function goCategorySeq() {
  const result: FindGnbMenuListWithChildResponse[] = await GnbService.getGnbListWithChild()
  gnbList.value = result
  router.push('/store/ProductListView/' + gnbList.value[0].childGnbMenus[0].categorySeq)
}

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function studyGroupUserSeqToMyClassPackage(studyGroupUserSeq: number) {
  console.log(studyGroupUserSeq)
  // this.$this.$tore.dispatch('setStudyGroupUserSeqToMyClass', {
  //   studyGroupUserSeq: studyGroupUserSeq
  // })
}
</script>
