<template>
  <div>
    <section class="terms-col">
      <section class="inner-col">
        <h4>개인정보 수집 및 이용동의</h4>
        <div class="terms-text">
          <p>
            회사는 회원의 서비스 제공을 위해 개인정보를 수집하고 있으며, 아래 목적 이외 용도로는 개인정보를 처리하지
            않습니다.
          </p>

          <ol>
            <li>개인정보 수집·이용 목적</li>
            <table class="terms-table-area">
              <tr>
                <th width="25%">구분</th>
                <th>이용 목적</th>
              </tr>
              <tr>
                <td>회원 가입 및 관리</td>
                <td>
                  회원제 서비스 이용에 따른 본인 확인, 불량회원의 부정 이용 방지와 비인가 사용방지, 불만처리 등
                  민원처리, 공지 및 상담
                </td>
              </tr>
              <tr>
                <td>자동 생성 정보</td>
                <td>소비자보호를 위한 법적 의무준수, 서비스 통계 분석</td>
              </tr>
            </table>
            <li>수집하려는 개인정보의 항목 및 보유·이용 기간</li>
            <table class="terms-table-area">
              <tr>
                <th width="25%">구분</th>
                <th>수집항목</th>
                <th>보유기간</th>
              </tr>
              <tr>
                <td>회원 가입 및 관리</td>
                <td>
                  [필수] 이름, 아이디, 비밀번호, 휴대전화번호, 이메일주소, 기업고유코드<br />
                  [선택] 계열사명, 사번, 부서명, 직책, 직급, 비고/기타
                </td>
                <td>
                  회원 탈퇴 시까지<br />
                  ※ 내부 지침에 의해 부정이용방지, 명예훼손 등 권리 침해 분쟁 및 수사협조를 위해 1년간 보관
                </td>
              </tr>
              <tr>
                <td>자동 생성 정보</td>
                <td>IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록</td>
                <td>회원 탈퇴 시까지</td>
              </tr>
            </table>
          </ol>

          <p>
            필수로 수집하는 개인정보에 대해 동의를 거부할 권리가 있으며 필수항목에 대한 동의 거부 시 회원가입 및
            서비스이용이 제한됩니다.
          </p>
        </div>
        <!-- <div class="terms-text" v-html="[terms.content1, terms.content2]"></div>
        <div class="terms-select" @change="termsContent">
          <select v-model="termsSeq">
            <option v-for="option in termsList" :key="option" :value="option.termsSeq">{{ option.updateDate }} {{ option.title }}</option>
          </select>
        </div> -->
      </section>
    </section>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import TermsService from '@/api/service/TermsService'
import type { FindTermsRequest, FindTermsResponse, Terms } from '@/types/service/terms'
import { onMounted, ref } from 'vue'

onMounted(() => {
  termsContent()
})

const termsSeq = ref<number | string>('')
const terms = ref<Terms>()
const termsList = ref<Terms[]>()

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

.terms-col .terms-text ol {
  counter-reset: custom-counter;
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
}

.terms-col .terms-text ol li {
  counter-increment: custom-counter;
  margin-bottom: 1rem;
}

.terms-col .terms-text ol li::before {
  content: counter(custom-counter) '. ';
  font-weight: bold;
}

.terms-table-area {
  width: 100%;
  padding: 2.1rem 3rem 4rem;
  border-top: 0.1rem solid #b7b7c8;
  border-bottom: 0.1rem solid #b7b7c8;
  margin-top: 2.1rem;
  margin-bottom: 2.1rem;
}

.terms-table-area tr {
  border: 0.1rem solid #b7b7c8;
}

.terms-table-area th,
.terms-table-area td {
  padding: 1.6rem 1.4rem;
  font-size: 2.4rem;
  line-height: 3rem;
  border: 0.1rem solid #b7b7c8;
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
