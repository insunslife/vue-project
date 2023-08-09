<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="my-page-col bg-white-col">
    <section class="inner-col">
      <div class="lnb-wrap">
        <MyClassLnb />
        <section class="inquiry-content">
          <HeaderSub :sub-title="'학습 문의'" />
          <div class="inquiry-list-title">
            <strong>학습 문의</strong>
            <div>
              <span class="date">
                <em :class="{ success: lectureQuestion?.replyStatus === 'Y' }">{{
                  lectureQuestion?.replyStatus === 'Y' ? '답변완료' : '답변대기'
                }}</em>
                {{ lectureQuestion?.registDate }}
              </span>
            </div>
          </div>
          <div class="inquiry-list-contents">
            <p v-html="lectureQuestion?.contents"></p>
            <img
              v-if="lectureQuestion?.questionFilePath"
              :src="decodeURIComponent(lectureQuestion.questionFilePath)"
              :alt="lectureQuestion.questionFilePath"
            />
            <div v-if="lectureQuestion?.answer" class="answer-con">
              <div class="answer-top">
                <strong>YANADOO</strong>
                <span class="date">{{ lectureQuestion?.answer.answerDate }}</span>
              </div>
              <div class="answer-text">
                <p v-html="lectureQuestion?.answer.answerContents"></p>
              </div>
            </div>
          </div>

          <router-link
            v-if="from === 'myclassQna'"
            :to="`/myClass/DetailMyClassView?idx=${sgus}&tab=2`"
            class="btn-go-list"
            >목록보기</router-link
          >
          <router-link v-else to="/myclass/QnaLearningListView" class="btn-go-list">목록보기</router-link>
        </section>
      </div>
    </section>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import MyClassService from '@/api/service/MyClassService'
import HeaderSub from '@/components/common/HeaderSub.vue'
import MyClassLnb from '@/components/common/MyClassLnb.vue'
import type { LectureQuestionResponse } from '@/types/service/myClass'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const idx = ref<string>('')
const sgus = ref<string>('')
const from = ref<string>('')
const lectureQuestion = ref<LectureQuestionResponse>()

onMounted(() => {
  idx.value = route.query.idx as string
  sgus.value = route.query.sgus as string
  from.value = route.query.from as string
  getLectureQuestion()
})

// 학습(강의) 문의 상세 조회
async function getLectureQuestion() {
  const result: LectureQuestionResponse = await MyClassService.getLectureQuestion(Number(idx.value))
  lectureQuestion.value = result
}
</script>
