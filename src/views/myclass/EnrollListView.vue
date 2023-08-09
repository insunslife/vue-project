<template>
  <section class="my-page-col">
    <section class="inner-col">
      <div class="lnb-wrap">
        <MyClassLnb />
        <section class="inquiry-content">
          <HeaderSub :sub-title="'수강신청 클래스'" :active="active" @toggle-active="toggleActive" />
          <span v-if="!noClasses" class="sub-text display-pc">
            야나두 학습 앱 전용 상품 이용자의 학습 편의 향상을 위해 PC에서 동영상 강의 수강을 지원하고 있습니다.
          </span>
          <div class="class-cont">
            <div class="tooltip-box">
              <strong class="tooltip-title display-m" :class="{ on: mActive }" @click="mActive = !mActive"
                >수강신청 및 취소 주의사항</strong
              >

              <ul v-show="active || mActive" class="tooltip-list">
                <li>
                  수강신청하신 과정을 안내해 드립니다. 수강 시작일부터 [수강중인 클래스]탭에서 강의를 수강하시면 됩니다.
                </li>
                <li>취소를 원하시는 과정의 취소 버튼을 누르시면 해당 과정이 수강취소됩니다.</li>
                <li>수강신청기간이 종료되면 취소가 불가합니다.</li>
              </ul>
            </div>
            <ul class="package-list">
              <!-- 수강 신청 전 대기기간 ready클래스 -->
              <li
                v-for="myClass in myClassRegistList"
                :key="myClass.studyEntranceSeq"
                :class="{ active: isActive, ready: !myClass.classAvailableDays }"
              >
                <div class="title">
                  <div class="title-text">
                    <div class="class-category">
                      <span>{{ myClass.categoryName }}</span
                      ><span>{{ myClass.teacherName }}</span>
                    </div>
                    <strong class="class-title" @click="btnClick(myClass)">{{ myClass.title }}</strong>
                    <div class="class-date">
                      <span
                        ><em>수강신청기간</em> {{ myClass.classRegistrationStartDate }}~{{
                          myClass.classRegistrationEndDate
                        }}</span
                      >
                      <span><em>수강기간</em> {{ myClass.classStartDate }}~{{ myClass.classEndDate }}</span>
                    </div>
                  </div>
                  <div class="class-rule-box">
                    <div class="class-rule">
                      <strong>수료기준</strong>
                      <span>진도율80% / 평가 80점 이상</span>
                      <span>만족도 조사 참여 必</span>
                    </div>
                    <span v-if="myClass.learningStartDday !== 0" class="dday"
                      >수강시작 D-{{ myClass.learningStartDday }}</span
                    >
                    <button v-else type="button" class="btn-cancel" @click="cancelClass(myClass.studyEntranceSeq)">
                      수강 취소
                    </button>
                  </div>
                </div>
                <button type="button" class="btn-accordion-view" @click="btnClick(myClass)">
                  패키지에 포함된 강의를 확인하세요!
                </button>
                <div class="sub-class-list">
                  <dl v-for="classInfo in myClass.findClassNameResponses" :key="classInfo.teacherSeq">
                    <dt>{{ classInfo.teacherName }}</dt>
                    <dd>{{ classInfo.className }}</dd>
                  </dl>
                </div>
              </li>
            </ul>
            <div v-if="noClasses" class="no-list">
              <p>
                현재 수강 신청 중인 강의가 없습니다. <br />
                지금 학습을 시작해 볼까요?
              </p>
              <span class="btn-go-list" @click="goCategorySeq">과정 보러가기</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import GnbService from '@/api/service/GnbService'
import MyClassService from '@/api/service/MyClassService'
import HeaderSub from '@/components/common/HeaderSub.vue'
import MyClassLnb from '@/components/common/MyClassLnb.vue'
import type { FindGnbMenuListWithChildResponse } from '@/types/service/gnb'
import type { CancelMyClassRegistrationRequest, FindMyClassRegistrationsResponse } from '@/types/service/myClass'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const myClassRegistList = ref<FindMyClassRegistrationsResponse[]>([])
const active = ref<boolean>(false)
const mActive = ref<boolean>(false)
const noClasses = ref<boolean>(false)
const isActive = ref<boolean>(false)
// function filteredClassInfo() {
//   return myClassRegistList.value.filter((myClass) => !myClass.cancelled)
// }

onMounted(() => {
  getMyClassRegistrations()
  // document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  // document.removeEventListener('click', handleClickOutside)
})

// 수강신청
async function getMyClassRegistrations() {
  const result: FindMyClassRegistrationsResponse[] = await MyClassService.getMyClassRegistrations()
  myClassRegistList.value = result
}

async function cancelClass(studyEntranceSeq: number) {
  const conf = confirm('수강을 취소하시겠습니까?')
  if (!conf) return
  const request: CancelMyClassRegistrationRequest = {
    studyEntranceSeq: studyEntranceSeq
  }
  const result = await MyClassService.cancel(request)
  if (result.meta.code === 200) {
    alert('수강 취소가 완료되었습니다.')
  } else {
    alert('수강취소에 실패하였습니다.')
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function btnClick(myClass: FindMyClassRegistrationsResponse) {
  isActive.value = !isActive.value
  // myClass.isActive = !myClass.isActive
}

function toggleActive() {
  active.value = !active.value
}

// TODO: 왜 필요한지 모르겠음
// function handleClickOutside(event: HTMLElement) {
//   const target = event as HTMLElement
//   if (!target.closest('.tooltip')) {
//     active.value = false
//   }
// }

// GNB 메뉴
const gnbList = ref<FindGnbMenuListWithChildResponse[]>([])
async function goCategorySeq() {
  const result: FindGnbMenuListWithChildResponse[] = await GnbService.getGnbListWithChild()
  gnbList.value = result
  router.push('/store/ProductListView/' + gnbList.value[0].childGnbMenus[0].categorySeq)
}
</script>
