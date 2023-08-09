<template>
  <section class="my-page-col bg-white-col">
    <section class="inner-col">
      <div class="lnb-wrap">
        <MyClassLnb />
        <section class="inquiry-content">
          <HeaderSub :sub-title="'문의내역'" />
          <ul class="sub-menu">
            <li><router-link to="QnaInquiryListView">1:1문의</router-link></li>
            <li><router-link to="QnaLearningListView">학습 문의</router-link></li>
          </ul>
          <div class="filter-box">
            <ul class="filter-guide">
              <li>등록하신 문의는 수정 또는 삭제하실 수 없습니다</li>
            </ul>
            <div class="filter">
              <select v-model="registDateMinusMonth" @change="updateFilter()">
                <option value="">전체</option>
                <option value="3">3개월</option>
                <option value="6">6개월</option>
                <option value="12">12개월</option>
              </select>
              <select v-model="answerYn" @change="updateFilter()">
                <option value="">전체</option>
                <option value="Y">답변완료</option>
                <option value="N">답변대기</option>
              </select>
            </div>
          </div>
          <ul v-if="filteredInquiryList.length" class="table-area">
            <li>
              <span>분류</span>
              <strong class="title">문의 내용</strong>
              <span>답변여부</span>
              <span>작성일</span>
            </li>
            <li v-for="inquiry in inquiryList" :key="inquiry.inquirySeq">
              <router-link :to="`/myclass/QnaInqueryDetailView?idx=${inquiry.inquirySeq}`">
                <span>{{ inquiry.categoryName }}</span>
                <div class="title">
                  <strong class="ellipsis">{{ inquiry.contents }}</strong>
                </div>
                <span class="answer" :class="{ active: inquiry.answerYn === 'Y' }">{{
                  inquiry.answerYn === 'Y' ? '답변완료' : '답변대기'
                }}</span>
                <span class="date">{{ inquiry.registDate }}</span>
              </router-link>
            </li>
          </ul>
          <ul v-else-if="noList" class="table-area table-empty-list">
            <li>
              <img src="@/assets/images/ico_pc_inquiry_no_80x80.png" />
              <span class="table-empty">등록된 문의가 없습니다.</span>
            </li>
          </ul>
          <div v-if="filteredInquiryList.length || noList" class="btn-wrap">
            <button class="btn-go-list" type="button" @click="openModal('MyInquiryModal')">문의하기</button>
          </div>
          <pagination
            v-if="inquiryList.length"
            :total-page="Math.ceil(totalCount / size)"
            @page-change="handlePageChange"
          />
          <!-- ./1:1문의 -->
        </section>
      </div>
    </section>
    <!-- TODO: 위 openModal 아래 Teleport 둘다 필요한건지.. -->
    <Teleport to="#modals"
      ><MyInquiryModal v-if="store.state.MyInquiryModal == true" @update-inquiries="getInquiryList"
    /></Teleport>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import MyClassService from '@/api/service/MyClassService'
import type { CommonSearchSpec } from '@/types/commonSearchSpec'
import type { FindInquiriesResponse, InquiriesResponse } from '@/types/service/myClass'
import { onMounted, ref } from 'vue'
import { useStore } from '@/stores/b2bStore'
import MyClassLnb from '@/components/common/MyClassLnb.vue'
import HeaderSub from '@/components/common/HeaderSub.vue'
import MyInquiryModal from '@/components/modal/MyInquiryModal.vue'
const store = useStore()

// const inquiry = ref<FindInquiriesResponse>()
const inquiryList = ref<InquiriesResponse[]>([])

const registDateMinusMonth = ref<string>('')
const index = ref<number>(1)
const size = ref<number>(10)
const totalCount = ref<number>(0)
const answerYn = ref<string>('')
const filteredInquiryList = ref<[]>([])
const noList = ref<boolean>(false)

onMounted(() => {
  getInquiryList()
})

function updateFilter() {
  index.value = 1 // 필터 업데이트 시 인덱스를 1로 초기화
  getInquiryList()
}

// // 일대일 문의 페이징 목록 조회 (마이페이지)
async function getInquiryList() {
  const request: CommonSearchSpec = {
    index: index.value,
    size: size.value,
    keys: ['registDateMinusMonth', 'answerYn'],
    types: ['equal'],
    values: [registDateMinusMonth.value, answerYn.value]
  }
  const result: FindInquiriesResponse = await MyClassService.getInquiryList(request)
  inquiryList.value = result.inquiries
  totalCount.value = result.totalCount
}

function handlePageChange(page: number) {
  index.value = page
  getInquiryList()
}

function openModal(modalName: string) {
  console.log(modalName)
  // store.dispatch('openModal', modalName);
}
</script>

<!-- style -->
<style scoped>
.my-page-col .sub-header {
  display: none;
}
@media screen and (max-width: 1024px) {
  .my-page-col .sub-header {
    display: block;
  }
}
</style>
