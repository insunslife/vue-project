<template>
  <section class="content">
    <Teleport to="#topBanner">
      <TopBanner
        v-if="topBannerView == true && fixedNotice !== undefined"
        :fixed-notice="fixedNotice"
        @topbanner-close="topBannerView = false"
      />
    </Teleport>
    <section class="main-info-col">
      <div class="inner-col">
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 2500, disableOnInteraction: false }"
          class="main-banner-slide"
          @swiper="mainBannerSlide"
          @slideChange="mainSlideChange"
        >
          <swiper-slide v-for="(banner, index) in bannerList" :key="index">
            <a v-if="banner.link !== ''" :href="banner.link" target="_blank">
              <img :src="banner.bannerFilePath" :alt="'배너 이미지' + banner.sortOrder" />
            </a>
            <img v-else :src="banner.bannerFilePath" :alt="'배너 이미지' + banner.sortOrder" />
          </swiper-slide>
        </swiper>
        <div class="my-info">
          <div class="my-tit-wrap">
            <h3>
              {{ store.getSignIn?.user.name }}님,<br />
              <em>{{ myClassList?.totalCount }}개</em> 강의를 수강중이에요.
            </h3>
            <RouterLink to="/myclass/MyClassListView" class="btn-my-info">MY클래스</RouterLink>
          </div>
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :watch-overflow="true"
            navigation
            class="my-info-slide"
            @swiper="myInfoSlide"
            @slideChange="myInfoChange"
          >
            <swiper-slide v-if="myClassList?.totalCount == 0">
              <h4 class="empty">수강중인 클래스가 없습니다.</h4>
            </swiper-slide>
            <swiper-slide v-else v-for="(classRunning, index) in myClassList?.myClasses" :key="index">
              <RouterLink :to="`/myclass/MyClassListView?studyEntranceSeq=${classRunning.studyEntranceSeq}`">
                <em class="d-day">D-{{ classRunning.remainingDays }}</em>
                <h4 class="ellipsis line-clamp-1">{{ classRunning.packageName }}</h4>
                <span
                  >{{ classRunning.categoryName }}
                  <span v-if="classRunning.teacherName !== null">·</span>
                  {{ classRunning.teacherName }}</span
                >
              </RouterLink>
            </swiper-slide>
          </swiper>
        </div>
        <div class="service-info">
          <p>
            전화상담이 필요하신가요?
            <strong>1600.0563</strong>
          </p>
          <ul>
            <li>평일 : 09:00 ~ 18:00</li>
            <li>점심시간 : 12:00 ~ 13:00</li>
          </ul>
        </div>
      </div>
    </section>
    <section class="my-class-col">
      <div class="inner-col">
        <h3 class="section-tit">내게 맞는 강의를 찾아보세요</h3>
        <form>
          <input v-model="searchWord" type="text" placeholder="교육과정을 검색해보세요" name="search-word" />
          <select
            v-model="searchCategoryMain"
            class="main-category"
            name="main-search-category"
            @change="changeCategory"
          >
            <option value="" selected disabled>과정</option>
            <option v-for="(gnb, index) in store.gnbList" :key="index" :value="gnb.categorySeq">
              {{ gnb.gnbName }}
            </option>
          </select>
          <select v-model="searchCategorySub" name="search-category02">
            <option value="" selected disabled>카테고리</option>
            <option v-for="(category, index) in gnbSubList" :key="index" :value="category.categorySeq">
              {{ category.gnbName }}
            </option>
          </select>
          <button type="submit" class="btn-yellow" @click="goSearch()">검색</button>
        </form>
      </div>
    </section>

    <section v-if="topPackageLength > 0" class="high-click-col">
      <div class="inner-col">
        <h3 class="section-tit">{{ topPackage?.groupTitle }}</h3>
        <ul class="item-list">
          <li v-for="(top, index) in topPackage?.displayMainPackages" :key="index">
            <RouterLink :to="`/store/ProductDetailView/${top.packageSeq}`">
              <div class="img-box">
                <img :src="top.thumbnailPath" :alt="top.packageName" />
              </div>
              <div class="category">
                {{ top.categoryName }} <span v-if="top.teacherName !== ''">·</span>
                {{ top.teacherName }}
              </div>
              <strong>{{ top.packageName }}</strong>
              <div class="item-more">
                <div class="category">
                  {{ top.categoryName }} <span v-if="top.teacherName !== ''">·</span>
                  {{ top.teacherName }}
                </div>
                <strong>{{ top.packageName }}</strong>
                <ul>
                  <li>난이도 : {{ top.levelCode }}</li>
                  <li>총 강의 수 : {{ top.stage }}개</li>
                  <li v-if="top.includeBook == true">교재포함</li>
                </ul>
                <button type="button" class="btn-yellow more-view">자세히보기</button>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
    <section v-if="pickPackageLength > 0" class="recommend-col">
      <div class="inner-col">
        <h3 class="section-tit">{{ pickPackage?.groupTitle }}</h3>
        <div class="scroll-wrap">
          <ul class="item-list">
            <li v-for="(pick, index) in pickPackage?.displayMainPackages" :key="index">
              <RouterLink :to="`/store/ProductDetailView/${pick.packageSeq}`">
                <div class="img-box">
                  <img :src="pick.thumbnailPath" :alt="pick.packageName" />
                </div>
                <div class="category">
                  {{ pick.categoryName }} <span v-if="pick.teacherName !== ''">·</span>
                  {{ pick.teacherName }}
                </div>
                <strong>{{ pick.packageName }}</strong>
                <span class="grade">{{ pick.starPoint }}</span>
                <div class="item-more">
                  <div class="category">
                    {{ pick.categoryName }} <span v-if="pick.teacherName !== ''">·</span>
                    {{ pick.teacherName }}
                  </div>
                  <strong>{{ pick.packageName }}</strong>
                  <span class="grade">{{ pick.starPoint }}</span>
                  <ul>
                    <li>난이도 : {{ pick.levelCode }}</li>
                    <li>총 강의 수 : {{ pick.stage }}개</li>
                    <li v-if="pick.includeBook == true">교재포함</li>
                  </ul>
                  <button type="button" class="btn-yellow more-view">자세히보기</button>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="notice-col">
      <div class="inner-col">
        <div class="notice-box">
          <h3 class="section-tit">공지사항</h3>
          <RouterLink to="/service/NoticeView" class="notice-more">+ 더보기</RouterLink>
          <ul>
            <li v-for="(notice, index) in noticeList" :key="index">
              <RouterLink :to="`/service/NoticeDetailView/${notice.serviceNoticeSeq}`" class="ellipsis line-clamp-1">{{
                notice.title
              }}</RouterLink>
            </li>
          </ul>
        </div>
        <div class="notice-box">
          <h3 class="section-tit">자주묻는질문</h3>
          <RouterLink to="/service/FaqView" class="notice-more">+ 더보기</RouterLink>
          <ul>
            <li v-for="(faq, index) in faqList" :key="index">
              <RouterLink :to="`/service/FaqView?faqSeq=${faq.faqSeq}`" class="ellipsis line-clamp-1"
                >Q. {{ faq.title }}</RouterLink
              >
            </li>
            <!-- faqDetailTo+faq.faqSeq -->
          </ul>
        </div>
        <button class="btn-qna" @click="openModal('MyInquiryModal')">1:1 문의</button>
      </div>
    </section>
    <Teleport to="#modals">
      <MyInquiryModal v-if="store.state.MyInquiryModal == true" />
    </Teleport>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TopBanner from '@/components/TopBanner.vue'
import MyInquiryModal from '@/components/modal/MyInquiryModal.vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import router from '@/router/index'
import { useStore } from '@/stores/b2bStore'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import type {
  BannerResponse,
  FindDisplayMainPackagesResponse,
  MainFixedNoticeResponse,
  MainNoticeResponse,
  MainFaqResponse,
  FindMyClassRunningListResponse
} from '@/types/service/mainPage'
import { MainPackageDisplayTypeEnum } from '@/types/service/serviceEnum'
import MainPageService from '@/api/service/MainPageService'
import type { ListSubGnbMenuDTO, ModalState } from '@/types/service/gnb'

const store = useStore()

const modules = [Navigation, Pagination, Autoplay]
const mainBannerSlide = (mainBanner: any) => {
  return mainBanner
}

const mainSlideChange = () => {}
const myInfoSlide = (infoSlide: any) => {
  return infoSlide
}
const myInfoChange = () => {}

const topBannerView = ref<boolean>(true)

// computed: {
//   ...mapState(['modalState'])
// }

onMounted(() => {
  getFixedNotice()
  getMainBannerList()
  getTopPackage()
  getPickPackage()
  getMyClassRunning(3)
  getNoticeList(3)
  getFaqList(3)
  store.getGnb()
})

// 메인 상단고정 공지사항 조회
const fixedNotice = ref<MainFixedNoticeResponse>()
async function getFixedNotice() {
  const result: MainFixedNoticeResponse = await MainPageService.getNotice()
  fixedNotice.value = result
  console.log('fixedNotice: ', fixedNotice.value)
}

// 메인 배너 리스트 조회
const bannerList = ref<BannerResponse[]>()
async function getMainBannerList() {
  const result: BannerResponse[] = await MainPageService.getBannerList()
  bannerList.value = result
  console.log('mainBannerList: ', bannerList.value)
}

// TOP 메인 클래스 리스트 조회
const topPackage = ref<FindDisplayMainPackagesResponse>()
const topPackageLength = ref<number>(0)
async function getTopPackage() {
  const result: FindDisplayMainPackagesResponse = await MainPageService.getDisplayMainPackages(
    MainPackageDisplayTypeEnum.TOP
  )
  topPackage.value = result
  topPackageLength.value = topPackage.value.displayMainPackages.length
  console.log('topPackage: ', topPackage.value)
}

// PICK 메인 클래스 리스트 조회
const pickPackage = ref<FindDisplayMainPackagesResponse>()
const pickPackageLength = ref<number>(0)
async function getPickPackage() {
  const result: FindDisplayMainPackagesResponse = await MainPageService.getDisplayMainPackages(
    MainPackageDisplayTypeEnum.PICK
  )
  pickPackage.value = result
  pickPackageLength.value = pickPackage.value.displayMainPackages.length
  console.log('topPackage: ', topPackage.value)
}

// b2b 메인 - 수강중인 클래스 정보
const myClassList = ref<FindMyClassRunningListResponse>()
async function getMyClassRunning(count: number) {
  const result: FindMyClassRunningListResponse = await MainPageService.getMyClassRunning(count)
  myClassList.value = result
  console.log('myClassList: ', myClassList.value)
}

// B2B 메인 공지사항
const noticeList = ref<MainNoticeResponse[]>()
async function getNoticeList(count: number) {
  const result: MainNoticeResponse[] = await MainPageService.getNoticeList(count)
  noticeList.value = result
  console.log('noticeList: ', noticeList.value)
}

// B2B 메인 자주묻는질문(Faq) response
const faqList = ref<MainFaqResponse[]>()
async function getFaqList(count: number) {
  const result: MainFaqResponse[] = await MainPageService.getFaqList(count)
  faqList.value = result
  console.log('faqList: ', faqList.value)
}

const searchMainIndex = ref<number>(0)
const gnbSubList = ref<ListSubGnbMenuDTO[]>()
const changeCategory = () => {
  if (searchMainIndex.value !== 0) {
    gnbSubList.value = store.gnbList[searchMainIndex.value].childGnbMenus
    console.log('############# ' + gnbSubList.value)
  }
}

// 검색 (최상단: 교육과정을 검색해 보세요.)
const searchCategoryMain = ref<string>('')
const searchCategorySub = ref<string>('')
const searchWord = ref<string>('')
const goSearch = () => {
  let searchCategory = searchCategoryMain
  if (searchCategorySub.value !== '') {
    searchCategory = searchCategorySub
    console.log(searchCategory)
  }

  if (searchWord.value.trim()) {
    router.push({
      path: '/search/SearchView?',
      query: {
        searchWord: searchWord.value,
        searchCategory: searchCategory.value
      }
    })
  } else {
    alert('검색어를 입력해주세요')
  }
}

function openModal(modalName: keyof ModalState): void {
  store.openModal(modalName)
}

// function closeModal(modalName: keyof ModalState): void {
//   store.closeModal(modalName)
// }
</script>

<!-- style -->
<style>
.main-info-col .main-banner-slide .swiper-pagination {
  left: 5.6rem;
  bottom: 4.8rem;
  text-align: left;
}
.main-info-col .main-banner-slide .swiper-pagination-bullet {
  width: 0.6rem;
  height: 0.6rem;
  background: #fff;
  opacity: 0.5;
  border-radius: 10em;
}
.main-info-col .main-banner-slide .swiper-pagination-bullet-active {
  width: 2.2rem;
  opacity: 1;
}
.main-info-col .main-banner-slide .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 0.25rem;
}

.main-info-col .my-info-slide {
  padding: 0 4rem;
  margin: 0 -4rem;
}
.main-info-col .my-info-slide .swiper-button-next,
.main-info-col .my-info-slide .swiper-button-prev {
  width: 4rem;
  height: 4rem;
  left: 2rem;
  margin-top: -2rem;
  background: url(@/assets/images/ico_pc_arrow_left_120x120shadow.png) no-repeat center / 100%;
}
.main-info-col .my-info-slide .swiper-button-next::after,
.main-info-col .my-info-slide .swiper-button-prev::after {
  content: none;
}
.main-info-col .my-info-slide .swiper-button-next {
  left: auto;
  right: 2rem;
  background: url(@/assets/images/ico_pc_arrow_right_120x120shadow.png) no-repeat center / 100%;
}

@media screen and (max-width: 1024px) {
  .main-info-col .main-banner-slide .swiper-pagination-bullet {
    width: 1rem;
    height: 1rem;
  }
  .main-info-col .main-banner-slide .swiper-pagination-bullet-active {
    width: 3.2rem;
  }
  .main-info-col .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0.5rem;
  }

  .main-info-col .my-info-slide .swiper-button-next,
  .main-info-col .my-info-slide .swiper-button-prev {
    width: 4.8rem;
    height: 4.8rem;
    left: 1.6rem;
    margin-top: -2.4rem;
    background: url(@/assets/images/ico_m_arrow_left_168x168.png) no-repeat center / 100%;
  }
  .main-info-col .my-info-slide .swiper-button-next {
    left: auto;
    right: 1.6rem;
    background: url(@/assets/images/ico_m_arrow_right_168x168.png) no-repeat center / 100%;
  }
}
</style>

<style scoped>
.content {
  background: url(@/assets/images/bg_pc_yanadoo_logo.png) no-repeat 92% -10.2rem / 50.4rem,
    url(@/assets/images/bg_pc_yanadoo_main01.png) no-repeat left -5% / 33.3rem,
    url(@/assets/images/bg_pc_yanadoo_main02.png) no-repeat right 30% / 36.7rem;
}
.content em {
  font-style: normal;
}
.content * {
  letter-spacing: -0.03em;
}
.content section {
  padding: 4rem 0;
}
.content section:first-of-type {
  padding-top: 5.6rem;
}
.section-tit {
  margin-bottom: 3.2rem;
  font-size: 2.8rem;
}

.btn-yellow {
  background: #ffb900;
  color: #fff;
  border-radius: 0.8rem;
}

.main-info-col .inner-col {
  display: grid;
  grid-template-columns: 64rem 1fr;
  gap: 2.4rem 3rem;
}
.main-info-col .main-banner-slide {
  position: relative;
  overflow: hidden;
  grid-row: 1/3;
  width: 100%;
}
.main-info-col .main-banner-slide .swiper-slide {
  border-radius: 2rem;
  overflow: hidden;
  max-height: 47.4rem;
}
.main-info-col .main-banner-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.main-info-col .my-info {
  padding: 4rem;
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.main-info-col .my-info .my-tit-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.4rem;
}
.main-info-col .my-info .my-tit-wrap h3 {
  font-size: 2.4rem;
  line-height: 1.3;
  color: #28284b;
}
.main-info-col .my-info .my-tit-wrap .btn-my-info {
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1.4rem;
  color: #3547a4;
}
.main-info-col .my-info .my-tit-wrap .btn-my-info::after {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 0.6rem;
  height: 0.6rem;
  margin: -0.2rem 0 0 0.5rem;
  border: solid #3547a4;
  border-width: 0.2rem 0.2rem 0 0;
  border-radius: 0.1rem;
  transform: rotate(45deg);
}
.main-info-col .my-info li {
  position: relative;
  margin-bottom: 1.2rem;
}
.main-info-col .my-info .my-tit-wrap h3 em {
  color: #269cff;
}
.main-info-col .my-info-slide {
  position: relative;
}
.main-info-col .my-info-slide .swiper-slide {
  min-height: 11.6rem;
  padding: 2rem 2.4rem;
  background: #f7f7fc;
  border-radius: 0.8rem;
  box-sizing: border-box;
  opacity: 0;
}
.main-info-col .my-info-slide .swiper-slide.swiper-slide-active {
  opacity: 1;
}
.main-info-col .my-info-slide .empty {
  margin-top: 2.7rem;
  text-align: center;
  color: #686868;
}
.main-info-col .my-info-slide .d-day {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  font-weight: 800;
  font-size: 1.2rem;
  color: #fff;
  background: #269cff;
  border-radius: 10em;
}
.main-info-col .my-info-slide h4 {
  display: block;
  margin-top: 1rem;
  font-weight: 500;
  font-size: 1.8rem;
}
.main-info-col .my-info-slide h4 + span {
  display: block;
  margin-top: 0.6rem;
  font-size: 1.4rem;
  color: #717188;
}

.main-info-col .service-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 4rem 4.8rem;
  color: #fff;
  background: #28284b;
  border-radius: 2rem;
}
.main-info-col .service-info p {
  font-weight: 700;
  font-size: 1.8rem;
}
.main-info-col .service-info p strong {
  display: block;
  margin-top: 1.2rem;
  font-size: 4.8rem;
  color: #fff;
  line-height: 1;
}
.main-info-col .service-info ul {
  font-weight: 700;
  font-size: 1.2rem;
  color: #cfcfda;
  line-height: 1.5;
}

.my-class-col ul {
  display: grid;
  grid-template-columns: 43rem 1fr 1fr;
}
.my-class-col .section-tit {
  color: #28284b;
}
.my-class-col form {
  display: grid;
  grid-template-columns: 43rem 1fr 1fr 15rem;
  gap: 1.6rem;
}
.my-class-col input,
.my-class-col select {
  padding: 1.6rem 2rem;
  font-size: 1.8rem;
  color: #717188;
  background: #f7f7fc;
  border: none;
  border-radius: 0.8rem;
}
.my-class-col input::placeholder {
  color: #717188;
}
.my-class-col input:-ms-input-placeholder {
  color: #717188;
}
.my-class-col select {
  background: #f7f7fc url(@/assets/images/ico_pc_arrowdown_48x48navy.png) no-repeat 95% center / 1.6rem;
}
.my-class-col form button {
  font-size: 1.8rem;
}

.item-list {
  display: grid;
  gap: 3rem;
}
.item-list li {
  position: relative;
}
.item-list li a > strong {
  display: block;
  padding: 0 0.8rem;
  font-weight: 500;
}
.item-list li .category {
  padding: 1.5rem 0.8rem 0.8rem;
  font-size: 80%;
  color: #a0a0b6;
  line-height: 1.375;
}
.item-list li .item-more {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 3.2rem;
  background: #fff;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.1);
  border-radius: 1.2rem;
  box-sizing: border-box;
  opacity: 0;
  transition: all 0.3s;
}
.item-list li .item-more .category {
  padding: 0;
  font-size: 90%;
}
.item-list li .item-more strong {
  display: block;
  font-size: 110%;
  margin-top: 1rem;
}
.item-list li .item-more ul {
  position: absolute;
  left: 3.4rem;
  bottom: 7.5rem;
}
.item-list li .item-more ul li {
  font-size: 80%;
  color: #8d8da0;
  line-height: 1.42;
}
.item-list li .more-view {
  position: absolute;
  left: 50%;
  width: calc(100% - 6.4rem);
  font-size: 80%;
  text-align: center;
  transform: translateX(-50%);
}
.item-list .img-box {
  border-radius: 1.3rem;
  overflow: hidden;
}
.item-list .img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item-list li:hover .item-more {
  opacity: 1;
}

.high-click-col .item-list {
  grid-template-columns: repeat(4, 1fr);
  font-size: 1.8rem;
}
.high-click-col .item-list .more-view {
  bottom: 2.8rem;
  padding: 1rem 0;
}
.high-click-col .item-list .img-box {
  height: 18.9rem;
}
.recommend-col {
  background: url(@/assets/images/bg_pc_yanadoo_main03.png) no-repeat 11rem 13.1rem / 39.4rem;
}
.recommend-col .item-list {
  padding: 0 1rem;
  grid-template-columns: repeat(3, 1fr);
  font-size: 2rem;
}
.recommend-col .item-list li .item-more ul {
  bottom: 12.4rem;
}
.recommend-col .item-list > li {
  min-height: 42rem;
}
.recommend-col .item-list .grade {
  display: block;
  margin-top: 2rem;
  font-weight: 700;
}
.recommend-col .item-list .grade::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 2.4rem;
  height: 2.4rem;
  margin: -0.5rem 0.3rem 0 0;
  background: url(@/assets/images/ico_pc_star_72x72yellow.png) no-repeat center / 100%;
}
.recommend-col .item-list .grade::after {
  content: '/5.0';
  font-weight: 500;
  color: #b7b7c8;
}
.recommend-col .item-more .grade {
  margin-top: 3.4rem;
}
.recommend-col .item-list li .item-more {
  padding: 4rem 3.2rem;
}
.recommend-col .item-list .more-view {
  bottom: 3.2rem;
  padding: 1.7rem 0;
}
.recommend-col .item-list .img-box {
  height: 25rem;
}

.notice-col .inner-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}
.notice-col .notice-box {
  position: relative;
  padding: 3.6rem 4.2rem;
  border: 1px solid #dfdfea;
  border-radius: 1rem;
}
.notice-col .notice-box .section-tit {
  margin-bottom: 2.8rem;
  color: #28284b;
}
.notice-col .notice-box .notice-more {
  position: absolute;
  top: 4.3rem;
  right: 5.7rem;
  font-weight: 700;
  font-size: 1.6rem;
  color: #28284b;
}
.notice-col .notice-box ul {
  font-size: 1.6rem;
}
.notice-col .notice-box li a {
  color: #717188;
}
.notice-col .notice-box li + li {
  margin-top: 1.1rem;
}
.notice-col .btn-qna {
  grid-column: 1/3;
  padding: 2.7rem 0;
  font-weight: 500;
  font-size: 1.7rem;
  color: #28284b;
  text-align: center;
  background: #f7f7fc;
  border-radius: 1rem;
}
.notice-col .btn-qna::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 1.8rem;
  height: 1.5rem;
  margin: -0.2rem 1rem 0 0;
  background: url(@/assets/images/ico_pc_qna_61x51.png) no-repeat center / 100%;
}
@media screen and (min-width: 1024px) and (max-width: 1200px) {
  .main-info-col .my-info .my-tit-wrap {
    flex-direction: column;
    align-items: flex-start;
  }
  .main-info-col .my-info .my-tit-wrap h3 {
    font-size: 2.5rem;
  }
  .main-info-col .my-info .my-tit-wrap .btn-my-info {
    display: block;
    margin-top: 1rem;
  }
  .main-info-col .service-info {
    flex-direction: column;
    align-items: flex-start;
    padding: 4rem;
  }
  .main-info-col .service-info ul {
    margin-top: 2rem;
  }
  .main-info-col .service-info ul li {
    display: inline-block;
    vertical-align: middle;
  }
  .main-info-col .service-info ul li + li {
    margin-left: 1rem;
  }
  .high-click-col .item-list .img-box {
    height: 14.1vw;
  }
  .recommend-col .item-list .img-box {
    height: 18.6vw;
  }
}
@media screen and (max-width: 1024px) {
  .content {
    background: none;
  }
  .content section {
    padding: 4.5rem 4rem;
  }
  .content section:first-of-type {
    padding-top: 3rem;
  }
  .section-tit {
    margin-bottom: 4rem;
    font-size: 3.6rem;
  }
  .scroll-wrap {
    padding: 0 0 1rem 4rem;
    margin: 0 -4rem;
    white-space: nowrap;
    overflow-x: auto;
  }
  .scroll-wrap > * {
    width: max-content;
  }

  .main-info-col .inner-col {
    grid-template-columns: 1fr;
    gap: 5.6rem;
  }
  .main-info-col .main-banner-slide {
    grid-row: 1;
  }
  .main-info-col .main-banner-slide .swiper-slide {
    max-height: none;
  }
  .main-info-col .main-banner-slide img {
    height: auto;
  }

  .main-info-col .my-info li {
    margin-bottom: 2rem;
  }
  .main-info-col .my-info {
    padding: 6.4rem 4.8rem;
  }
  .main-info-col .my-info .my-tit-wrap {
    margin-bottom: 4rem;
  }
  .main-info-col .my-info .my-tit-wrap h3 {
    font-size: 3.6rem;
  }
  .main-info-col .my-info .my-tit-wrap .btn-my-info {
    font-size: 2.4rem;
  }
  .main-info-col .my-info .my-tit-wrap .btn-my-info::after {
    width: 1rem;
    height: 1rem;
    margin-top: -0.5rem;
    border-width: 0.3rem 0.3rem 0 0;
  }
  .main-info-col .my-info-slide .swiper-slide {
    min-height: 21rem;
    padding: 4rem;
    border-radius: 1.6rem;
  }
  .main-info-col .my-info-slide .empty {
    margin-top: 4.7rem;
  }
  .main-info-col .my-info-slide .d-day {
    padding: 0.4rem 1.6rem;
    font-size: 2.4rem;
  }
  .main-info-col .my-info-slide h4 {
    margin-top: 1.6rem;
    font-size: 2.8rem;
  }
  .main-info-col .my-info-slide h4 + span {
    margin-top: 1.6rem;
    font-size: 2.4rem;
  }

  .main-info-col .service-info {
    padding: 5.6rem 4.8rem 4.6rem;
    border-radius: 1.6rem;
  }
  .main-info-col .service-info p {
    font-size: 2.8rem;
    color: #dfdfea;
  }
  .main-info-col .service-info p strong {
    margin-top: 2.4rem;
    font-size: 5.6rem;
    color: #fff;
  }
  .main-info-col .service-info ul {
    font-weight: 400;
    font-size: 2rem;
  }

  .content .my-class-col {
    padding-top: 0.5rem;
  }
  .my-class-col h3 {
    display: none;
  }
  .my-class-col form {
    position: relative;
    display: block;
  }
  .my-class-col form select {
    display: none;
  }
  .my-class-col input {
    width: 100%;
    padding: 2.7rem 7rem 2.7rem 2.7rem;
    font-size: 2.8rem;
    color: #8d8da0;
    border-radius: 1.6rem;
    background: #ececf6;
    box-sizing: border-box;
  }
  .my-class-col form button {
    position: absolute;
    top: 3.2rem;
    right: 2.4rem;
    width: 3.2rem;
    height: 3.2rem;
    overflow: hidden;
    text-indent: -999px;
    background: url(@/assets/images/ico_m_search_96x96.png) no-repeat center / 100%;
  }
  .item-list li:hover .item-more {
    display: none;
  }
  .high-click-col .item-list {
    grid-template-columns: 1fr 1fr;
  }
  .high-click-col .item-list li {
    font-size: 2.8rem;
  }

  .high-click-col .item-list .img-box {
    height: 29vw;
  }
  .recommend-col {
    padding: 0;
    background: none;
  }
  .recommend-col .item-list {
    display: flex;
  }
  .recommend-col .item-list > li {
    min-height: auto;
    max-width: 70vw;
    font-size: 2.8rem;
    white-space: normal;
  }
  .recommend-col .item-list .img-box {
    max-width: 70vw;
    height: 40vw;
  }
  .notice-col .inner-col {
    grid-template-columns: 1fr;
    gap: 3.2rem;
  }
  .notice-col .notice-box {
    padding: 4rem;
    border-radius: 1.6rem;
  }
  .notice-col .notice-box .section-tit {
    margin-bottom: 4rem;
    font-size: 3.2rem;
  }
  .notice-col .notice-box .notice-more {
    top: 4.5rem;
    right: 4rem;
    font-size: 2.4rem;
  }
  .notice-col .notice-box ul {
    font-size: 2.4rem;
  }
  .notice-col .notice-box li + li {
    margin-top: 1.6rem;
  }
  .notice-col .btn-qna::before {
    width: 2.3rem;
    height: 1.9rem;
    margin-top: -0.4rem;
  }
  .notice-col .btn-qna {
    grid-column: 1;
    padding: 2.7rem;
    font-size: 2.8rem;
    border-radius: 1.6rem;
  }
}
</style>
