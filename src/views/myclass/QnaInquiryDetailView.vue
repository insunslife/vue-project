<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="my-page-col bg-white-col">
    <div class="inner-col">
      <div class="lnb-wrap">
        <MyClassLnb />
        <section class="inquiry-content">
          <SubHeader :sub-title="subTitle" />
          <div class="inquiry-list-title">
            <strong>{{ inquiry?.categoryName }}</strong>
            <div>
              <span class="date"
                ><em :class="{ success: inquiry?.answerYn === 'Y' }">{{
                  inquiry?.answerYn === 'Y' ? '답변완료' : '답변대기'
                }}</em>
                {{ formatDate(inquiry?.registDate) }}</span
              >
            </div>
          </div>
          <div class="inquiry-list-contents">
            <p>{{ inquiry?.contents }}</p>
            <img v-if="inquiry?.inquiryFilePath" :src="inquiry.inquiryFilePath" :alt="inquiry.inquiryFilePath" />
            <div v-if="inquiry?.answer" class="answer-con">
              <div class="answer-top">
                <strong>YANADOO</strong>
                <span class="date">{{ inquiry.answer.answerDate }}</span>
              </div>
              <div class="answer-text">
                <p v-html="inquiry.answer.answerContent"></p>
              </div>
            </div>
          </div>
          <RouterLink to="ListQnaInquiryView" class="btn-go-list" type="button" @click="goToList()"
            >목록보기</RouterLink
          >
        </section>
      </div>
    </div>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MyClassService from '@/api/service/MyClassService'
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router'
import type { InquiryResponse } from '@/types/service/myClass'
const route = useRoute()
const router = useRouter()

const inquiry = ref<InquiryResponse>()
const idx = ref<LocationQueryValue | LocationQueryValue[]>()
const subTitle = ref<string>('1:1 문의')

onMounted(() => {
  idx.value = route.query.idx
  getInquiryDetail()
})

// 일대일 문의 상세 조회
async function getInquiryDetail() {
  const inquirySeq = Number(idx.value)
  const result = await MyClassService.getInquiryDetail(inquirySeq)
  inquiry.value = result
}

function formatDate(dateString?: string) {
  const date = dateString ? new Date(dateString) : new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function goToList() {
  router.push('/myclass/ListQnaInquiryView')
}
</script>
