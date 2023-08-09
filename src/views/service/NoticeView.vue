<template>
  <section class="notice-col">
    <section class="inner-col">
      <HeaderSub :sub-title="'공지사항'" />
      <ul class="table-area">
        <li>
          <span>NO</span>
          <strong class="title">제목</strong>
          <span>등록일</span>
        </li>
        <li
          v-for="notice in noticeResponse?.noticeList"
          :key="notice.serviceNoticeSeq"
          :class="notice.newNoticeYn == 'Y' ? 'new' : ''"
        >
          <router-link :to="to + notice.serviceNoticeSeq">
            <span v-if="notice.fixYn == 'N'">{{ notice.serviceNoticeSeq }}</span>
            <span v-else>공지</span>
            <div class="title">
              <strong class="ellipsis">{{ notice.title }}</strong>
            </div>
            <span class="date">{{ notice.registDate.slice(0, 10) }}</span>
          </router-link>
        </li>
      </ul>
      <pagination :total-page="Math.ceil(totalCount / size)" @page-change="handlePageChange" />
    </section>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import NoticeService from '@/api/service/NoticeService'
import HeaderSub from '@/components/common/HeaderSub.vue'
import type { FindNoticeListRequest, FindNoticeListResponse } from '@/types/service/notice'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

// const customerSeq = ref<number>(1)
const index = ref<number>(1)
const size = ref<number>(10)
const noticeResponse = ref<FindNoticeListResponse>()
const totalCount = ref<number>(0)
const totalPage = ref<number>(0)
const to = ref<string>('/service/NoticeDetailView/')

onMounted(() => {
  findNoticeList()
})

async function findNoticeList() {
  const request: FindNoticeListRequest = {
    // customerSeq: customerSeq.value, jwt 토큰으로 대체
    index: index.value,
    size: size.value
  }
  const result: FindNoticeListResponse = await NoticeService.findNoticeList(request)
  noticeResponse.value = result
  totalCount.value = result.totalCount
  totalPage.value = Math.ceil(totalCount.value / size.value)
}

function handlePageChange(page: number) {
  index.value = page
  findNoticeList()
}
</script>

<!-- style -->
<style scoped>
.notice-col {
  padding: 6rem 0 0;
}
.notice-col .sub-header {
  display: block;
}
.notice-col .sub-header h2 {
  margin-bottom: 1.7rem;
  font-size: 2rem;
}

@media screen and (max-width: 1024px) {
  .notice-col {
    padding: 0;
  }
  .notice-col .sub-header h2 {
    margin-bottom: 0;
    font-size: 2.8rem;
  }
}
</style>
