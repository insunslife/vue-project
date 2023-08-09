<template>
  <section class="my-page-col bg-white-col">
    <section class="inner-col">
      <div class="lnb-wrap">
        <MyClassLnb />
        <section class="inquiry-content">
          <SubHeader :sub-title="'문의내역'" />
          <ul class="sub-menu">
            <li><router-link to="ListQnaInquiryView">1:1문의</router-link></li>
            <li><router-link to="ListQnaLearningView">학습 문의</router-link></li>
          </ul>
          <div class="filter-box">
            <ul class="filter-guide">
              <li>등록하신 문의는 수정 또는 삭제하실 수 없습니다.</li>
            </ul>
            <div class="filter">
              <select v-model="beforeMonth" @change="updateFilter()">
                <option value="">전체</option>
                <option value="3">3개월</option>
                <option value="6">6개월</option>
                <option value="12">12개월</option>
              </select>
              <select v-model="replyStatus" @change="updateFilter()">
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
              <span>작성일</span>
              <span>답변여부</span>
            </li>
            <li v-for="userLectureQuestion in userLectureQuestionList" :key="userLectureQuestion.questionSeq">
              <router-link :to="`/myClass/DetailQnaLearningView?idx=${userLectureQuestion.questionSeq}&from=question`">
                <span>학습문의</span>
                <div class="title">
                  <strong class="ellipsis">{{ userLectureQuestion.contents }}</strong>
                </div>
                <span class="date">{{ userLectureQuestion.registDate }}</span>
                <span class="answer" :class="{ active: userLectureQuestion.replyStatus === 'Y' }">{{
                  userLectureQuestion.replyStatus === 'Y' ? '답변완료' : '답변대기'
                }}</span>
              </router-link>
            </li>
          </ul>
          <ul v-else-if="userLectureQuestionList.length" class="table-area table-empty-list">
            <li>
              <img src="@/assets/images/ico_pc_inquiry_no_80x80.png" />
              <span class="table-empty">등록된 문의가 없습니다.</span>
            </li>
          </ul>
          <pagination
            v-if="filteredInquiryList.length"
            :total-page="Math.ceil(userLectureQuestionList.length / pageSize)"
            @page-change="handlePageChange"
          />
        </section>
      </div>
    </section>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import MyClassService from '@/api/service/MyClassService'
import type { FindUserLectureQuestionsRequest, UserLectureQuestionsResponse } from '@/types/service/myClass'
import { ref, onMounted } from 'vue'

const userLectureQuestionList = ref<UserLectureQuestionsResponse[]>([])
const beforeMonth = ref<number>(0)
const pageIndex = ref<number>(1)
const pageSize = ref<number>(10)
const replyStatus = ref<string>('')
const filteredInquiryList = ref([])

onMounted(() => {
  getUserLectureQuestions()
})

function updateFilter() {
  pageIndex.value = 1 // 필터 업데이트 시 인덱스를 1로 초기화
  getUserLectureQuestions()
}

async function getUserLectureQuestions() {
  const request: FindUserLectureQuestionsRequest = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    beforeMonth: beforeMonth.value,
    replyStatus: replyStatus.value
  }
  const result: UserLectureQuestionsResponse[] = await MyClassService.getUserLectureQuestionList(request)
  userLectureQuestionList.value = result
}

function handlePageChange(page: number) {
  pageIndex.value = page
  getUserLectureQuestions()
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
