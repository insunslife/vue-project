<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="faq-col">
    <div class="inner-col">
      <HeaderSub :sub-title="'자주 묻는 질문'" />
      <div class="input-box">
        <label for="">
          <input v-model="titleContents" type="text" placeholder="검색어를 입력해주세요." />
        </label>
        <span @click="getFaqALL()">
          <i class="blind">검색 버튼</i>
        </span>
      </div>
      <ul class="tab-btn">
        <li
          v-for="faqGroup in faqGroupList"
          :key="faqGroup.code"
          :class="{ active: faqGroup.code === faqActive }"
          @click.prevent="tabMenu(faqGroup.code)"
        >
          {{ faqGroup.value }}
        </li>
      </ul>
      <div class="tab-cont">
        <ul v-for="faq in faqList?.response" :key="faq.faqSeq" class="accordion-list">
          <li :class="{ active: faqSeq == faq.faqSeq.toString }">
            <div class="title" @click="accorDion($event)">
              <strong v-html="faq.title"></strong>
            </div>
            <div class="answer">
              <span v-html="faq.contents"></span>
            </div>
          </li>
        </ul>

        <!-- 질문 없을때 -->
        <ul v-if="noFaqList" class="accordion-list active">
          <li class="faq-empty">
            <div class="title">일치하는 값이 없습니다.</div>
          </li>
        </ul>
        <!-- ./질문 없을때 -->
      </div>
      <pagination :total-page="Math.ceil(totalCount / pageSize)" @page-change="handlePageChange" />
    </div>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import FaqService from '@/api/service/FapService'
import type { FaqGroupListResponse, FindFaqRequest, FindFaqsResponse } from '@/types/service/faq'
import HeaderSub from '@/components/common/HeaderSub.vue';

const faqList = ref<FindFaqsResponse>()
const faqGroupList = ref<FaqGroupListResponse[]>([])
const pageIndex = ref<number>(1)

const pageSize = ref<number>(10)
const totalCount = ref<number>(0)
// const totalPage = ref<number>(0)
const noFaqList = ref<boolean>(false)
const faqActive = ref<string>('ALL')
// const title = ref<string>('')
// const contents = ref<string>('')
const titleContents = ref<string>('')

const route = useRoute()

function faqSeq() {
  const query = new URLSearchParams(route.query as Record<string, string>)
  return query.get('faqSeq')
}

onMounted(() => {
  getGroupList()
  getFaqList()
  getFaqALL()
})

async function getGroupList() {
  const response: FaqGroupListResponse[] = await FaqService.getGroupList()
  faqGroupList.value = response
}

// fnGetView
async function getFaqList() {
  const request: FindFaqRequest = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    faqGroup: faqActive.value,
    titleContents: titleContents.value
  }
  const response: FindFaqsResponse = await FaqService.getList(request)
  faqList.value = response
}

// TODO: 위 함수와 중복되는데 어떻게 처리해야할지 고민해야 함
async function getFaqALL() {
  const request: FindFaqRequest = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    faqGroup: 'ALL',
    titleContents: titleContents.value
  }
  const response: FindFaqsResponse = await FaqService.getList(request)
  faqList.value = response
}

function handlePageChange(page: number) {
  pageIndex.value = page
  getFaqList()
}

function accorDion(event: Event) {
  const elem = event.currentTarget as HTMLElement
  const parent = elem.parentNode as HTMLElement
  const isActive = parent.classList.contains('active')

  const accordionLists = document.querySelectorAll('.accordion-list li')
  accordionLists.forEach((list) => {
    list.classList.remove('active')
  })

  if (!isActive) {
    parent.classList.add('active')
  } else {
    parent.classList.remove('active')
  }
}

function tabMenu(code: string) {
  faqActive.value = code
  getFaqList()
}
</script>

<!-- style -->
<style scoped>
.faq-col {
  padding: 6rem 0 0;
}
.faq-col .inner-col {
  max-width: 119.5rem;
  margin: auto;
}
.faq-col .sub-header {
  display: block;
}
.faq-col .sub-header h2 {
  font-size: 2rem;
}
.faq-col .input-box {
  position: relative;
  max-width: 78.6rem;
  padding-bottom: 0.7rem;
  margin: 2.5rem auto 4.8rem;
  border-bottom: 0.3rem solid #000;
}
.faq-col .input-box input[type='text'] {
  width: 93%;
  margin: 0 0 1rem;
  padding: 0 1.7rem 0;
  font-size: 1.9rem;
  line-height: 1.47;
  box-sizing: border-box;
}
.faq-col .input-box input[type='text']::placeholder {
  font-size: 1.9rem;
  color: #b7b7c8;
}
.faq-col .input-box span {
  position: absolute;
  right: 2rem;
  top: 0;
  width: 2.6rem;
  height: 2.6rem;
  background: url(../../assets/images/ico_pc_faq_search_80x80.png) no-repeat 50%/100%;
  cursor: pointer;
}
.faq-col .tab-btn {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0;
  border-left: 1px solid #e7e7f0;
  border-top: 1px solid #e7e7f0;
}
.faq-col .tab-btn li {
  padding: 1.6rem 0;
  font-size: 1.4rem;
  text-align: center;
  border-right: 1px solid #e7e7f0;
  border-bottom: 1px solid #e7e7f0;
  cursor: pointer;
}
.faq-col .tab-btn li.active {
  font-weight: 700;
  background-color: #ffb900;
}
.faq-col .tab-cont {
  margin-top: 5.9rem;
}
.faq-col .tab-cont .accordion-list {
  border-bottom: 1px solid #e7e7f0;
}
.faq-col .tab-cont .accordion-list.active {
  display: block;
}
.faq-col .tab-cont .accordion-list li {
  border-top: 0.1rem solid #e7e7f0;
}
.faq-col .tab-cont .accordion-list li .title {
  position: relative;
  padding: 2.5rem;
  font-size: 1.4rem;
  cursor: pointer;
}
.faq-col .tab-cont .accordion-list li .title::before {
  content: 'Q.';
  display: inline-block;
  vertical-align: middle;
  margin-right: 1.7rem;
  font-weight: 700;
  font-size: 2.2rem;
}
.faq-col .tab-cont .accordion-list li .title::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 5rem;
  width: 1.6rem;
  height: 1rem;
  background: url(../../assets/images/ico_pc_faq_arrow_36x22.png) no-repeat 50%/100%;
  transform: translateY(-50%);
}
.faq-col .tab-cont .accordion-list li .answer {
  display: none;
  padding: 3rem 6.7rem;
  font-size: 1.6rem;
  line-height: 1.25;
  letter-spacing: -0.05rem;
  word-break: keep-all;
  background-color: #f7f7fc;
  box-sizing: border-box;
}
.faq-col .tab-cont .accordion-list li.active .title {
  border-bottom: none;
}
.faq-col .tab-cont .accordion-list li.active .title::after {
  transform: translateY(-50%) rotate(-180deg);
}
.faq-col .tab-cont .accordion-list li.active .answer {
  display: block;
}

.faq-col .list-more-box {
  margin-top: 6rem;
}
.faq-col .list-more-box .pagination {
  display: flex;
  justify-content: center;
}
.faq-col .list-more-box .pagination li + li {
  margin-left: 1.9rem;
}
.faq-col .list-more-box .pagination li a {
  display: block;
  width: 4rem;
  height: 4rem;
  padding: 1rem 0;
  font-size: 1.8rem;
  text-align: center;
  box-sizing: border-box;
}
.faq-col .list-more-box .pagination li.prev a {
  background: url(../../assets/images/ico_pc_faq_page_120x120.png) no-repeat 50%/100%;
  transform: rotate(-180deg);
}
.faq-col .list-more-box .pagination li.next a {
  background: url(../../assets/images/ico_pc_faq_page_120x120.png) no-repeat 50%/100%;
}
.faq-col .list-more-box .pagination li a.disabled {
  pointer-events: none;
  opacity: 0.2;
}
.faq-col .list-more-box .pagination li.active a {
  font-weight: 700;
  background-color: #ececf6;
  border-radius: 100%;
}
.faq-col .tab-cont .accordion-list li.faq-empty .title::before,
.faq-col .tab-cont .accordion-list li.faq-empty .title::after {
  display: none;
}

@media screen and (max-width: 1024px) {
  .faq-col {
    padding: 0;
  }
  .faq-col .inner-col {
    max-width: 100%;
  }
  .faq-col .input-box {
    max-width: 100%;
    padding: 0 2.2rem;
    margin: 8.2rem auto 6rem;
    border-bottom: none;
  }
  .faq-col .sub-header h2 {
    font-size: 2.8rem;
  }
  .faq-col .input-box input[type='text'] {
    width: 100%;
    padding: 2.2rem;
    font-size: 2.9rem;
    border-bottom: 0.1rem solid #000;
  }
  .faq-col .input-box input[type='text']::placeholder {
    font-size: 2.9rem;
  }
  .faq-col .input-box span {
    right: 6.5rem;
    top: 50%;
    width: 4rem;
    height: 4rem;
    transform: translateY(-65%);
  }
  .faq-col .tab-btn {
    grid-template-columns: repeat(3, 1fr);
  }
  .faq-col .tab-btn li {
    padding: 2.4rem 0;
    font-size: 2.7rem;
    line-height: 1.4;
  }
  .faq-col .tab-btn li:nth-of-type(3n) {
    border-right: none;
  }
  .faq-col .tab-cont {
    margin-top: -1px;
    border-top: 1.3rem solid #ececf6;
  }
  .faq-col .tab-cont .accordion-list li .title {
    width: 93%;
    padding: 4.9rem;
    font-size: 2.9rem;
    line-height: 1.4;
    word-break: keep-all;
    box-sizing: border-box;
  }
  .faq-col .tab-cont .accordion-list li .title::before {
    display: none;
  }
  .faq-col .tab-cont .accordion-list li .title::after {
    right: 1rem;
    width: 2.4rem;
    height: 2.4rem;
  }
  .faq-col .tab-cont .accordion-list li .answer {
    padding: 5rem;
    font-size: 2.6rem;
    line-height: 1.4;
  }
  .faq-col .list-more-box {
    margin-top: 8rem;
  }
  .faq-col .list-more-box .pagination li + li {
    margin-left: 3rem;
  }
  .faq-col .list-more-box .pagination li a {
    width: 6.4rem;
    height: 6.4rem;
    padding: 1.7rem 0;
    font-size: 2.9rem;
  }
}
</style>
