<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <section class="terms-col">
      <section class="inner-col">
        <h4>야나두 B2B 개인정보 처리방침</h4>

        <div class="terms-text" v-html="terms?.content1"></div>
        <div class="terms-select" @change="termsContent">
          <select v-model="termsSeq">
            <option v-for="term in termsList" :key="term.termsSeq" :value="term.termsSeq">
              {{ term.updateDate }} {{ term.title }}
            </option>
          </select>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FindTermsRequest, FindTermsResponse, Terms } from '@/types/service/terms'
import TermsService from '@/api/service/TermsService'

const termsSeq = ref<number | string>('')
const terms = ref<Terms>()
const termsList = ref<Terms[]>([])

onMounted(() => {
  termsContent()
})

async function termsContent() {
  const request: FindTermsRequest = {
    termsSeq: termsSeq.value,
    termsType: 'PRIVACY_POLICY'
  }
  const result: FindTermsResponse = await TermsService.getTerms(request)
  if (result) {
    termsSeq.value = result.termsSeq
    terms.value = result.terms
    termsList.value = result.termsList

    for (let i = 0; i < termsList.value.length; i++) {
      termsList.value[i].updateDate = termsList.value[i].updateDate.slice(0, 10)
    }
    //select 가장 최근에 업데이트 한 내용은 (최신) 이 붙도록 작업
    termsList.value[0].title += ' (최신)'
  }
}
</script>

<!-- style -->
<style scoped>
.terms-col h4 {
  padding: 2.1rem 3rem 2rem;
  font-size: 1.8rem;
  border-bottom: 1px solid #e7e7f0;
}
.terms-col .terms-text {
  padding: 2.1rem 3rem 4rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-bottom: 0.1rem solid #b7b7c8;
  margin-bottom: 2.7rem;
}
.terms-col .terms-text strong {
  display: block;
  padding-top: 3.5rem;
  font-weight: 700;
  font-size: 1.6rem;
}
.terms-col .terms-text strong:first-child {
  padding-top: 3rem;
}
.terms-select {
  padding-bottom: 7rem;
  text-align: right;
}
.terms-select select {
  width: 32rem;
  padding: 1rem 4rem 1rem 1.6rem;
  font-size: 1.4rem;
  line-height: 2rem;
  border: 0.1rem solid #dfdfea;
  background: url(../../assets/images/ico_pc_arrowdown_48x48navy.png) no-repeat 95% center / 1.6rem;
}

@media screen and (max-width: 1024px) {
  .terms-col h4 {
    padding: 6.4rem 4.2rem 0;
    font-size: 3rem;
    border: 0;
  }
  .terms-col .terms-text {
    margin-bottom: 0;
    padding: 6rem 4.2rem 6.4rem;
    font-size: 2.6rem;
    border: 0;
    line-height: 4rem;
  }
  .terms-col .terms-text strong {
    padding-top: 2rem;
    font-size: 2.6rem;
  }
  .terms-col .terms-text strong:first-child {
    padding-top: 0;
  }
  .terms-select {
    padding-bottom: 4.2rem;
    text-align: center;
  }
  .terms-select select {
    width: calc(100% - 9rem);
    font-size: 2.8rem;
    line-height: 3.4rem;
    padding: 3.1rem 6rem 3.1rem 2.4rem;
    background-size: 2.4rem 2.4rem;
  }
}
</style>
