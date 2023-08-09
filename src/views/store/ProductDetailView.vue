<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="product-detail-col">
    <div class="inner-col">
      <div class="prod-thumb">
        <img :src="packageDetail?.thumbnailPath" alt="product detail thumbnail image" />
      </div>

      <div class="prod-info-wrap">
        <div ref="prodFixed" class="prod-fixed-menu">
          <div class="category">
            <span>{{ packageDetail?.b2bCategorySeqName2 }}·{{ packageDetail?.b2bCategorySeqName3 }}</span>
            <span>{{ packageDetail?.teacherName }}</span>

            <div v-if="teacherList?.length - 1 !== 0">&nbsp;외 {{ teacherList.length - 1 }}명</div>
          </div>
          <h3 class="prod-tit">{{ packageDetail?.title }}</h3>
          <ul class="prod-info-list">
            <!-- TODO: levelCode levelCodeName으로 수정해야 함 -->
            <li>{{ packageDetail?.levelCodeName }}</li>
            <li>{{ packageDetail?.stage }}차시</li>
            <li v-if="packageDetail?.includeBook && packageDetail.tagDisplayYn === 'Y'">교재포함</li>
          </ul>
          <em class="prod-grade">{{ packageDetail?.starPoint }}</em>
          <ul class="prod-date-info">
            <li v-if="packageDetail?.classRegistrationStartDate">
              <span class="application">수강신청</span>{{ packageDetail.classRegistrationEndDate }} ~
              {{ packageDetail.classRegistrationEndDate }}
            </li>
            <li v-if="packageDetail?.classDurationSettingType">
              <span class="period">수강기간</span>
              <div v-if="packageDetail.classDurationSettingType === 'FIXED'">
                {{ packageDetail.classStartDate }} ~ {{ packageDetail.classEndDate }}
              </div>
              <div v-if="packageDetail.classDurationSettingType === 'FLEXIBLE'">
                수강신청일로부터 {{ packageDetail.classAvailableDays }}일간 수강
              </div>
            </li>
            <li v-if="packageDetail?.reviewDays">
              <span class="review">복습기간</span>수강 종료일로부터 {{ packageDetail.reviewDays }}일
            </li>
            <li><span class="completion">수료기준</span>진도율 80%</li>
          </ul>
          <strong v-if="packageDetail?.expenseDisplayYn === 'Y'" class="mobile-price"
            >{{ addComma(Number(packageDetail.exceptOptionSalePrice)) }}원</strong
          >
          <div class="prod-bottom-menu">
            <strong v-if="packageDetail?.expenseDisplayYn === 'Y'" class="prod-price"
              >{{ addComma(Number(packageDetail.exceptOptionSalePrice)) }}원</strong
            >
            <strong v-if="packageDetail?.expenseDisplayYn === 'Y' && priceVisible" class="prod-bottom-price"
              >{{ addComma(Number(packageDetail?.exceptOptionSalePrice)) }}원</strong
            >
            <div class="button-wrap">
              <button
                v-if="packageDetail?.packageFreeLectureDTO"
                type="button"
                class="white"
                @click="
                  openFreePlayer(
                    packageDetail.packageFreeLectureDTO.className,
                    packageDetail.packageFreeLectureDTO.lectureTitle,
                    packageDetail.packageFreeLectureDTO.lectureSortOrder,
                    packageDetail.packageFreeLectureDTO.curriculumAssetSeq,
                    packageDetail.packageFreeLectureDTO.mediaContentKey
                  )
                "
              >
                미리보기
              </button>
              <button v-if="packageDetail?.isRegister === true" type="button" @click="addStudyEntrance">
                수강신청
              </button>
              <button v-if="packageDetail?.isRegister === false" type="button" class="disabled">수강신청</button>
            </div>
            <button
              v-if="packageDetail?.expenseDisplayYn === 'Y'"
              type="button"
              class="btn-prod-bottom"
              @click="togglePrice"
            ></button>
          </div>
        </div>
      </div>
      <div class="prod-tab-wrap">
        <ul class="prod-tab">
          <li class="active">
            <button type="button" @click="clickScroll('.intro')">과정소개</button>
          </li>
          <li>
            <button type="button" @click="clickScroll('.curri')">커리큘럼</button>
          </li>
          <li>
            <button type="button" @click="clickScroll('.teacher')">강사소개</button>
          </li>
          <li v-if="additionList.length !== 0">
            <button type="button" @click="clickScroll('.book')">관련교재</button>
          </li>
        </ul>
        <div class="prod-content-wrap">
          <div id="1" class="prod-content intro">
            <h4>과정소개</h4>
            <div class="prod-box">
              <div class="intro-list">
                <div v-html="packageDetail?.processContent"></div>
              </div>
            </div>
          </div>
          <div id="2" class="prod-content curri">
            <h4>커리큘럼</h4>
            <div class="class-wrap">
              <div
                v-for="(curriculum, idx) in curriculumList"
                :key="curriculum.productSeq"
                class="curri-class"
                :seq="idx"
              >
                <div class="curri-tit-wrap">
                  <h5 class="curri-tit">
                    Class {{ idx + 1 }}.<br />
                    {{ curriculum.className }}
                    <span> (총 강의 수 {{ curriculum.lectureCount }}개)</span>
                  </h5>
                  <em class="total-timer"><span>총 학습시간</span> {{ curriculum.studyTime }}</em>
                </div>
                <ul
                  v-for="(courseItem, courseItemIdx) in curriculum.courses"
                  :key="courseItem.courseName"
                  class="chapter-list"
                  :seq="courseItemIdx"
                >
                  <li>
                    <h6 @click="curriculumOpen($event)">
                      <span>{{ courseItemIdx + 1 }}.</span>{{ courseItem.courseName }}
                    </h6>
                    <em class="chapter-total-time">{{ courseItem.studyTime }}</em>
                    <ul
                      v-for="(lecturesItem, lecturesItemIdx) in courseItem.lectures"
                      :key="lecturesItem.lectureTitle"
                      class="chapter-box"
                      :seq="lecturesItemIdx"
                    >
                      <li>
                        <p class="chapter-tit">
                          <span class="chapter-order">{{ lecturesItemIdx + 1 }}강</span>{{ lecturesItem.lectureTitle }}
                        </p>
                        <span class="chapter-timer">{{ lecturesItem.studyTime }}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="3" class="prod-content teacher">
            <h4>강사소개</h4>
            <div v-for="teacher in packageDetail?.teacherResponses" :key="teacher.teacherName" class="prod-box">
              <div class="teacher-profile">
                <img :src="teacher.profileFilePath" alt="강사이미지" />
                <span class="teacher-name">{{ teacher.teacherName }}</span>
              </div>
              <div class="teacher-info">
                <div v-html="teacher.introduction"></div>
              </div>
            </div>
          </div>
          <div v-if="additionList.length !== 0" id="4" class="prod-content book">
            <h4>관련교재</h4>
            <div v-for="addition in packageDetail?.additionResponses" :key="addition.additionSeq" class="prod-box">
              <div class="textbook-box">
                <img :src="addition.additionImagePath" alt="교재" />
                <div class="text-box">
                  <h5><span>강의</span>교재를 소개합니다</h5>
                  <p class="book-name">{{ addition.additionName }}</p>
                  <span class="book-publisher">{{ addition.publisher }} / {{ addition.isbnCode }}</span>
                </div>
              </div>
              <div class="intro-list">
                <div v-html="addition.additionContent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <WinPopup ref="PopupFreePlayer"></WinPopup>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StoreService from '@/api/service/StoreService'
import type { CommonResponse } from '@/types/commonResponse'
import type {
  PackageDetailCurriculumResponse,
  CurriculumClassesVO,
  FindStorePackageDetailResponse,
  FindStorePackageDetailRequest,
  AddStoreStudyEntranceRequest,
  TeacherResponse,
  AdditionResponse
} from '@/types/service/store'
import WinPopup from '@/components/player/WinPopup.vue'

const route = useRoute()
const router = useRouter()

// const teacherLength = ref<number>(teacherList.value.length)

// const isFixed = ref<boolean>(false)
// const footerScrollTop = ref<number>(0)
// const footerTransitionEnd = ref<boolean>(false)
// function fixedClass() {
//   return { prodFixed: !footerTransitionEnd.value && isFixed.value }
// }
const packageSeq = ref<number>(0)

onMounted(() => {
  packageSeq.value = Number(route.params.packageSeq)
  window.scrollTo(0, 0)
  document.addEventListener('scroll', onScroll)
  getPackageDetailCurriculumList()
  getPackageDetail()
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})

onUnmounted(() => {
  document.removeEventListener('scroll', onScroll)
})

const priceVisible = ref<boolean>(false)

function togglePrice() {
  priceVisible.value = !priceVisible.value
  let openBtn = document.querySelector('.btn-prod-bottom')
  if (priceVisible.value) {
    openBtn?.classList.add('active')
  } else {
    openBtn?.classList.remove('active')
  }
}

function addComma(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const freePlayerPopup = ref()
function openFreePlayer(
  className: string,
  lectureTitle: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lectureSortOrder: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  curriculumAssetSeq: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mediaContentKey: string
) {
  let uri = '/player/free'
  let width = 773
  let height = 562
  let left = screen.width ? (screen.width - width) / 2 : 0
  let top = screen.height ? (screen.height - height) / 2 : 0
  let attr = 'top=' + top + ',left=' + left + ',width=' + width + ',height=' + height + ',scrollbars=no'

  freePlayerPopup.value.openWinPopup(uri, 'popupFreePlayer', attr, {
    className: className,
    lectureTitle: lectureTitle
  })
}

function clickScroll(moveTarget: string) {
  const element = document.querySelector(moveTarget) as HTMLElement | null
  window.scrollTo(0, element ? element.offsetTop - 15 : 0)
}

const prodFixed = ref()
function onScroll() {
  let targetSection = document.querySelectorAll('.prod-content') as NodeListOf<HTMLElement>
  let windowScrollY = window.scrollY
  let prodDetailTab = document.querySelector('.prod-tab') as HTMLElement
  let prodTabWrap = document.querySelector('.prod-tab-wrap') as HTMLElement
  if (windowScrollY + 20 > prodTabWrap.offsetTop) {
    prodDetailTab.classList.add('fixed')
  } else {
    prodDetailTab.classList.remove('fixed')
  }

  for (let i = 0; i < targetSection.length; i++) {
    if (windowScrollY >= targetSection[i].offsetTop - 82) {
      let sectionId = targetSection[i].id
      let tabList = document.querySelectorAll('.prod-tab li')

      for (let j = 0; j < tabList.length; j++) {
        tabList[j].classList.remove('active')
      }
      tabList[Number(sectionId) - 1].classList.add('active')
    }
  }

  const prodFixedMenu = prodFixed.value as HTMLElement
  const scrollBottom = window.scrollY + window.innerHeight
  const footer = document.querySelector('.footer') as HTMLElement
  const footerTop = footer.offsetTop + 200

  if (scrollBottom >= footerTop) {
    prodFixedMenu.classList.add('prod-fixed-bottom')
  } else {
    prodFixedMenu.classList.remove('prod-fixed-bottom')
  }
}

function onResize() {
  onScroll()
}

const curriculumList = ref<CurriculumClassesVO[]>([])
// curriculumPackages
async function getPackageDetailCurriculumList() {
  const result: PackageDetailCurriculumResponse = await StoreService.getPackageDetailCurriculumList(packageSeq.value)
  curriculumList.value = result.curriculumClasses
}

// TODO: 잘되는지 확인해야 함. ProductListView levelEg 함수와 비교해서 수정해야 함.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function getLevelName(levelCode: string): string {
//   const levelMap: { [key: string]: string } = {
//     '': '난이도',
//     BASIC: '입문',
//     BEGIN: '초급',
//     MIDDLE: '중급',
//     HIGH: '고급',
//     EXAM: '수험',
//     ETC: '기타'
//   }
//   return levelMap[levelCode] || ''
// }

const packageDetail = ref<FindStorePackageDetailResponse>()
const teacherList = ref<TeacherResponse[]>([])
const additionList = ref<AdditionResponse[]>([])
// const levelName = ref<string>('')
// detailPackages
async function getPackageDetail() {
  const request: FindStorePackageDetailRequest = {
    packageSeq: packageSeq.value
  }
  const result: FindStorePackageDetailResponse = await StoreService.getPackageDetail(request)
  if (result) {
    packageDetail.value = result
    teacherList.value = result.teacherResponses
    additionList.value = result.additionResponses
    // levelName.value = getLevelName(result.levelCode)
  } else {
    router.push('/error')
  }
}

// postClass
async function addStudyEntrance() {
  const request: AddStoreStudyEntranceRequest = {
    packageSeq: packageSeq.value
  }
  const result: CommonResponse<void> = await StoreService.addStudyEntrance(request)
  if (result.meta.code === 200) {
    alert(result.meta.message)
    router.push('/myclass/ListEnrollView')
  } else {
    alert(result.meta.message)
  }
}

function curriculumOpen(event: MouseEvent) {
  const target = event.target as HTMLElement
  target.parentElement?.classList.toggle('active')
}
</script>

<!-- style -->
<style scoped>
.product-detail-col .inner-col {
  display: grid;
  grid-template-columns: 1fr 35.5rem;
  gap: 7rem 6rem;
  padding: 3rem 0 12rem;
}
.product-detail-col .inner-col .prod-thumb {
  height: 53.6rem;
  overflow: hidden;
}
@media screen and (min-width: 1024px) and (max-width: 1200px) {
  .product-detail-col .inner-col .prod-thumb {
    height: 44.66vw;
  }
}
.product-detail-col .inner-col .prod-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.product-detail-col .prod-fixed-menu {
  position: fixed;
  min-width: 32rem;
}

.product-detail-col .category {
  display: flex;
  font-weight: 700;
  font-size: 1.4rem;
  color: #a0a0b6;
  line-height: 1.5;
}
.product-detail-col .category span + span::before {
  content: '';
  display: inline-block;
  width: 1px;
  height: 1rem;
  margin: 0 0.5rem 0 0.5rem;
  background: #cfcfda;
}
.product-detail-col .prod-tit {
  margin-top: 1rem;
  font-size: 2rem;
  line-height: 1.4;
}
.product-detail-col .prod-info-list {
  margin-top: 1.4rem;
}
.product-detail-col .prod-info-list li {
  display: inline-block;
  vertical-align: middle;
  padding: 0.3rem 0.8rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: #269cff;
  background: #e9f5ff;
  border-radius: 0.4rem;
}
.product-detail-col .prod-info-list li + li {
  margin-left: 0.4rem;
}
.product-detail-col .prod-grade {
  display: block;
  margin-top: 2rem;
  font-weight: 500;
  font-size: 1.6rem;
  color: #28284b;
}
.product-detail-col .prod-grade::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
  margin: -0.3rem 0.5rem 0 0;
  background: url(@/assets/images/ico_pc_star_72x72yellow.png) no-repeat center / 100%;
}
.product-detail-col .prod-date-info {
  margin-top: 2rem;
}
.product-detail-col .prod-date-info li {
  display: flex;
  gap: 1.4rem;
  font-size: 1.4rem;
  line-height: 1.42;
}
.product-detail-col .prod-date-info li + li {
  margin-top: 1.4rem;
}
.product-detail-col .prod-date-info span {
  color: #8d8da0;
}
.product-detail-col .prod-date-info span::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
  margin: -0.3rem 0.5rem 0 0;
  background-repeat: no-repeat;
  background-size: 100%;
}
.product-detail-col .prod-date-info span.application::before {
  background-image: url(@/assets/images/ico_prod_list01_60x60.png);
}
.product-detail-col .prod-date-info span.period::before {
  background-image: url(@/assets/images/ico_prod_list02_60x60.png);
}
.product-detail-col .prod-date-info span.review::before {
  background-image: url(@/assets/images/ico_prod_list03_60x60.png);
}
.product-detail-col .prod-date-info span.completion::before {
  background-image: url(@/assets/images/ico_prod_list04_60x60.png);
}
.product-detail-col .mobile-price {
  display: none;
}

.product-detail-col .prod-bottom-menu .prod-price {
  display: block;
  padding-top: 1rem;
  font-size: 2.8rem;
  text-align: right;
  border-top: 1px solid #e7e7f0;
  margin-top: 1.4rem;
}
.product-detail-col .prod-bottom-menu .prod-bottom-price {
  display: none;
}
.product-detail-col .prod-bottom-menu .prod-bottom-price .btn-prod-bottom {
  display: none;
}
.product-detail-col .prod-bottom-menu .button-wrap {
  display: flex;
  gap: 0.8rem;
  margin-top: 4rem;
}
.product-detail-col .prod-bottom-menu .button-wrap > * {
  flex: 1;
  padding: 1.3rem 0;
  font-size: 1.6rem;
  text-align: center;
  background: #ffb900;
  border-radius: 0.4rem;
}
.product-detail-col .prod-bottom-menu .button-wrap .white {
  background: #fff;
  border: 1px solid #dfdfea;
}
.product-detail-col .prod-bottom-menu .button-wrap .disabled {
  color: #fff;
  background: #cfcfda;
  pointer-events: none;
}

.product-detail-col .prod-tab-wrap .prod-tab.fixed {
  position: fixed;
  top: 8rem;
  left: 50%;
  width: 100%;
  max-width: 1200px;
  padding-right: 41.5rem;
  z-index: 1;
  transform: translateX(-50%);
  box-sizing: border-box;
}
.product-detail-col .prod-tab-wrap .prod-tab {
  display: flex;
}
.product-detail-col .prod-tab-wrap .prod-tab li {
  position: relative;
  flex: 1;
  font-size: 1.4rem;
  color: #28284b;
  text-align: center;
  border: solid #e7e7e0;
  border-width: 1px 0;
  border-left: 1px solid #e7e7f0;
  background: #fff;
}
.product-detail-col .prod-tab-wrap .prod-tab li button {
  display: block;
  width: 100%;
  padding: 1.5rem 0;
}
.product-detail-col .prod-tab-wrap .prod-tab li:last-of-type {
  border-right: 1px solid #e7e7f0;
}
.product-detail-col .prod-tab-wrap .prod-tab li.active {
  background: #28284b;
  border: solid #28284b;
  border-width: 1px 0;
  color: #fff;
  z-index: 1;
}
.product-detail-col .prod-tab-wrap .prod-tab li.active button {
  background: #28284b;
  color: #fff;
}

.product-detail-col .prod-content {
  padding-top: 10rem;
}
.product-detail-col .prod-content-wrap h4 {
  margin-bottom: 1rem;
  font-size: 2.4rem;
}
.product-detail-col .prod-content-wrap .prod-box {
  margin-top: 1rem;
  border-top: 0.3rem solid #000;
  border-bottom: 1px solid #b7b7c8;
}
.product-detail-col .prod-content-wrap .intro-list li {
  margin: 3rem 0;
  text-align: left;
}
.product-detail-col .prod-content-wrap .intro-list h5 {
  font-size: 1.8rem;
}

.product-detail-col .prod-content-wrap .intro-list {
  margin-top: 0.6rem;
  padding-left: 1.5rem;
  padding-bottom: 3rem;
  padding-top: 3rem;
  font-size: 1.4rem;
  line-height: 1.7;
  text-indent: -1.5rem;
}
.product-detail-col .curri-class {
  position: relative;
  border-bottom: 1px solid #b7b7c8;
}
.product-detail-col .curri-class + .curri-class {
  margin-top: 7rem;
}
.product-detail-col .curri-tit {
  padding: 1rem 0;
  font-size: 2rem;
  border-bottom: 0.3rem solid #000;
}
.product-detail-col .curri-tit br {
  display: none;
}
.product-detail-col .curri-tit span {
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: 1.2rem;
}
.product-detail-col .total-timer {
  position: absolute;
  top: 1.3rem;
  right: 0;
  font-weight: 700;
  font-size: 1.2rem;
  color: #ff9900;
}
.product-detail-col .total-timer::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.3rem;
  background: url(@/assets/images/ico_total_timer_48x48.png) no-repeat center / 100%;
}

.product-detail-col .chapter-list > li {
  position: relative;
  height: 6.2rem;
  overflow: hidden;
}
.product-detail-col .chapter-list > li::after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 2.4rem;
  right: 2.3rem;
  width: 1.6rem;
  height: 1.6rem;
  background: url(@/assets/images/ico_pc_arrowdown_48x48navy.png) no-repeat center / 100%;
}
.product-detail-col .chapter-list > li h6 {
  padding: 2.3rem 10.5rem 2.3rem 2.5rem;
  font-weight: 500;
  font-size: 1.4rem;
  cursor: pointer;
}
.product-detail-col .chapter-list > li h6 span {
  display: inline-block;
  min-width: 9.2rem;
  font-weight: 700;
}
.product-detail-col .chapter-list > li h6 span::before {
  content: 'Chapter ';
}
.product-detail-col .chapter-list .chapter-total-time {
  position: absolute;
  top: 2.5rem;
  right: 5.6rem;
  font-weight: 500;
  color: #717188;
  font-size: 1.2rem;
  z-index: -1;
}
.product-detail-col .chapter-list .chapter-box {
  padding: 1.8rem 2.5rem;
  font-size: 1.2rem;
  background: #f7f7fc;
}
.product-detail-col .chapter-list .chapter-box li {
  display: flex;
  justify-content: space-between;
}
.product-detail-col .chapter-list .chapter-box li + li {
  margin-top: 1.6rem;
}
.product-detail-col .chapter-list .chapter-box p {
  position: relative;
  max-width: 70%;
  padding-left: 4.5rem;
}
.product-detail-col .chapter-list .chapter-order {
  position: absolute;
  top: 0.2rem;
  left: 0;
  font-weight: 500;
  color: #717188;
}
.product-detail-col .chapter-list .chapter-timer {
  font-weight: 500;
  color: #717188;
}
.product-detail-col .chapter-list > li.active {
  height: auto;
}

.product-detail-col .chapter-list > li.active::after {
  transform: rotate(180deg);
}

.product-detail-col .teacher .prod-box {
  display: flex;
}
.product-detail-col .prod-box + .prod-box {
  margin-top: 0;
  border-top: none;
}
.product-detail-col .teacher .prod-box .teacher-profile {
  padding: 3rem 2.5rem 4rem;
  background: #f7f7fc;
}
.product-detail-col .prod-box .teacher-profile img {
  width: 10.4rem;
  border-radius: 50%;
  overflow: hidden;
}
.product-detail-col .prod-box .teacher-profile .teacher-name {
  display: block;
  width: 8.4rem;
  margin: 1.4rem auto;
  padding: 0.75rem 0;
  font-weight: 700;
  font-size: 1.6rem;
  text-align: center;
  background: #ffb900;
  border-radius: 10rem;
}
.product-detail-col .prod-box .teacher-info {
  width: 100%;
  padding: 3rem;
  font-size: 1.4rem;
  line-height: 1.42;
  overflow-wrap: break-word;
}

.product-detail-col .prod-box .teacher-info strong {
  display: block;
  color: #000;
}

.product-detail-col .textbook-box {
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
  padding: 4rem 6rem;
  color: #28284b;
  background: #f7f7fc;
  border: 1px solid #e7e7f0;
  border-radius: 0.8rem;
}

.product-detail-col .textbook-box img {
  width: 16.4rem;
  height: 16.4rem;
  margin-right: 3rem;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
}
.product-detail-col .textbook-box .text-box h5 {
  font-size: 2.4rem;
  line-height: 1.25;
}
.product-detail-col .textbook-box .text-box h5 span {
  display: block;
  color: #ff9900;
}
.product-detail-col .textbook-box .text-box .book-name {
  margin-top: 1.8rem;
  font-size: 1.8rem;
}
.product-detail-col .textbook-box .text-box .book-publisher {
  display: block;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  color: #8d8da0;
}

.product-detail-col .procedure .prod-box {
  border-bottom: 0;
}
.product-detail-col .prod-box .item-list {
  grid-template-columns: repeat(3, 1fr);
  margin-top: 3rem;
}
.product-detail-col .prod-box .item-list li {
  position: relative;
  padding-bottom: 6rem;
  font-size: 1.6rem;
}
.product-detail-col .prod-box .item-list li .category {
  padding: 1.5rem 0 0.8rem;
  font-weight: 500;
}
.product-detail-col .prod-box .item-list li strong {
  padding: 0;
}
.product-detail-col .prod-box .item-list .btn-prod-preview {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  font-weight: 400;
  font-size: 1.4rem;
  text-align: center;
  border: 1px solid #dfdfea;
  border-radius: 0.4rem;
}
@media screen and (max-width: 1024px) {
  .product-detail-col .inner-col {
    display: block;
    padding: 0;
  }
  .product-detail-col .inner-col .prod-thumb {
    width: 100%;
    height: 68vw;
  }
  .product-detail-col .inner-col .prod-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .product-detail-col .prod-fixed-menu {
    position: relative;
    min-width: auto;
    padding: 3.6rem 4.2rem 7.6rem;
  }
  .product-detail-col .category {
    font-size: 2.4rem;
  }
  .product-detail-col .category span + span::before {
    height: 1.5rem;
  }
  .product-detail-col .prod-tit {
    margin-top: 2.4rem;
    font-size: 3.8rem;
  }
  .product-detail-col .prod-info-list {
    margin-top: 2.4rem;
  }
  .product-detail-col .prod-info-list li {
    padding: 0.4rem 1.2rem;
    font-size: 2.4rem;
  }
  .product-detail-col .prod-grade {
    margin-top: 2.5rem;
    font-size: 2.8rem;
  }
  .product-detail-col .prod-grade::before {
    width: 4rem;
    height: 4rem;
    margin: -0.7rem 0.5rem 0 0;
  }
  .product-detail-col .prod-date-info {
    margin-top: 4rem;
  }
  .product-detail-col .prod-date-info li {
    gap: 3.2rem;
    font-size: 2.4rem;
  }
  .product-detail-col .prod-date-info li + li {
    margin-top: 3rem;
  }
  .product-detail-col .prod-date-info span::before {
    width: 4rem;
    height: 4rem;
    margin: -0.5rem 0.5rem 0 0;
  }
  .product-detail-col .mobile-price {
    display: block;
    padding: 2rem 0 0;
    margin-top: 2.2rem;
    font-size: 4.8rem;
    text-align: right;
    border-top: 1px solid #e7e7f0;
  }

  .prod-bottom-menu {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 2.6rem 4.2rem;
    background: #fff;
    z-index: 20;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    transition: all 0.3s;
  }

  .product-detail-col .prod-bottom-menu .prod-price {
    display: none;
  }
  .product-detail-col .prod-bottom-menu .prod-bottom-price {
    display: block;
    position: relative;
    margin-bottom: 2.5rem;
    font-size: 4.4rem;
    border-top: none;
    text-align: right;
  }
  .product-detail-col .prod-bottom-menu .prod-bottom-price::before {
    content: '교육비';
    position: absolute;
    top: 50%;
    left: 0;
    font-size: 2.5rem;
    font-weight: 500;
    color: #3b3b4d;
    transform: translateY(-50%);
  }

  .prod-bottom-menu .btn-prod-bottom {
    position: absolute;
    top: -5.8rem;
    left: 50%;
    width: 18rem;
    height: 6rem;
    background: url(@/assets/images/ico_btn_bottom_menu_540x180.png) no-repeat center / 100%;
    transform: translateX(-50%);
  }
  .prod-bottom-menu .btn-prod-bottom.active {
    position: absolute;
    top: -5.8rem;
    left: 50%;
    width: 18rem;
    height: 6rem;
    background: url(@/assets/images/ico_btn_bottom_menu_down_540x180.png) no-repeat center / 100%;
    transform: translateX(-50%);
  }
  .product-detail-col .prod-bottom-menu .button-wrap {
    margin-top: 0;
  }
  .product-detail-col .prod-bottom-menu .button-wrap > * {
    padding: 2.3rem 0;
    font-size: 2.8rem;
  }

  .product-detail-col .prod-tab-wrap .prod-tab li {
    font-size: 2.4rem;
  }
  .product-detail-col .prod-tab-wrap .prod-tab li button {
    padding: 2.1rem 0;
  }
  .product-detail-col .prod-tab-wrap .prod-tab li:last-of-type {
    border-right: 0;
  }
  .product-detail-col .prod-tab-wrap .prod-tab li:first-of-type {
    border-left: 0;
  }
  .product-detail-col .prod-tab-wrap .prod-tab.fixed {
    top: 21.4rem;
    left: 0;
    width: 100%;
    padding-right: 0;
    transform: none;
  }

  .product-detail-col .prod-content-wrap {
    padding: 0 4.2rem 10rem;
  }
  .product-detail-col .prod-content {
    padding-top: 10rem;
  }
  .product-detail-col .prod-content-wrap h4 {
    margin-bottom: 1.8rem;
    font-size: 3.2rem;
  }

  .product-detail-col .prod-content-wrap .intro-list li {
    margin: 4rem 0;
  }
  .product-detail-col .prod-content-wrap .intro-list h5 {
    font-size: 2.8rem;
  }
  .product-detail-col .prod-content-wrap .intro-list {
    margin-top: 1.2rem;
    padding-left: 0;
    font-size: 2.4rem;
    text-indent: 0;
  }
  .product-detail-col .curri-tit {
    padding: 1.8rem 13rem 1.8rem 0;
    font-size: 2.8rem;
    line-height: 1.35;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .product-detail-col .curri-tit br {
    display: block;
  }
  .product-detail-col .curri-tit span {
    display: none;
  }
  .product-detail-col .curri-tit-wrap {
    position: relative;
  }
  .product-detail-col .total-timer {
    top: auto;
    bottom: 1.8rem;
    font-size: 2.4rem;
  }
  .product-detail-col .total-timer span {
    display: none;
  }
  .product-detail-col .total-timer::before {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0;
  }
  .product-detail-col .chapter-list > li {
    height: 10.1rem;
  }
  .product-detail-col .chapter-list > li h6 {
    padding: 3.6rem 15rem 3.6rem 0;
    font-weight: 700;
    font-size: 2.8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .product-detail-col .chapter-list > li h6 span {
    min-width: 11rem;
  }
  .product-detail-col .chapter-list > li h6 span::before {
    content: '0';
  }
  .product-detail-col .chapter-list .chapter-total-time {
    top: 3.5rem;
    right: 5rem;
    font-size: 2.4rem;
    font-weight: 500;
    color: #717188;
  }
  .product-detail-col .chapter-list > li::after {
    top: 3.5rem;
    right: 0;
    width: 3.2rem;
    height: 3.2rem;
  }
  .product-detail-col .chapter-list .chapter-box {
    padding: 2.7rem 3.5rem;
    font-size: 2.4rem;
  }
  .product-detail-col .chapter-list .chapter-box p {
    padding-left: 10rem;
    max-width: 80%;
  }

  .product-detail-col .teacher .prod-box .teacher-profile {
    padding: 4rem 3.5rem;
  }
  .product-detail-col .prod-box .teacher-profile .teacher-name {
    width: 10.4rem;
    margin-top: 1.8rem;
    font-size: 2rem;
  }
  .product-detail-col .prod-box .teacher-info {
    padding: 4rem 3rem;
    font-size: 2.4rem;
  }
  .product-detail-col .prod-box .teacher-info li + li {
    margin-top: 4rem;
  }

  .product-detail-col .textbook-box {
    margin-top: 2rem;
    padding: 3rem 4rem;
  }
  .product-detail-col .textbook-box img {
    margin-right: 3.4rem;
  }
  .product-detail-col .textbook-box .text-box .book-name {
    font-size: 2rem;
  }
  .product-detail-col .textbook-box .text-box .book-publisher {
    margin-top: 0.5rem;
    font-size: 1.6rem;
  }

  .product-detail-col .prod-box .item-list {
    grid-template-columns: 1fr;
    margin-top: 4rem;
    gap: 3rem 0;
  }
  .product-detail-col .prod-box .item-list li {
    padding-bottom: 0;
    font-size: 2.8rem;
  }
  .product-detail-col .prod-box .item-list li::after {
    content: '';
    display: block;
    clear: both;
  }
  .product-detail-col .prod-box .item-list li .img-box {
    float: left;
    width: 32.4rem;
    margin-right: 3rem;
  }
  .product-detail-col .prod-box .item-list li .category {
    padding-top: 3.2rem;
  }
  .product-detail-col .prod-box .item-list .btn-prod-preview {
    display: none;
  }
}

@media screen and (max-height: 750px) {
  .product-detail-col .prod-fixed-menu.prod-fixed-bottom {
    position: absolute;
    bottom: 12rem;
  }
}
</style>
