<template>
  <section class="refund-col">
    <section class="inner-col">
      <HeaderSub :sub-title="'환불 규정 안내'" />
      <h3>야나두 강의 환불 정책</h3>
      <div class="refund_text">
        <strong class="refund-tit">1. 단과 상품 환불정책</strong>
        <ol>
          <li>1–1. 단과(1개월 미만 상품)</li>
          <li>① 수강시작 후 7일 이내, 5강 미만 수강 시에는 100% 환불 가능</li>
          <li>② 수강시작 후 7일 초과, 5강 이상 수강 시에는 잔여일에 대한 환불이 가능</li>
          <li>
            ③ 수강시작 후 수강기간 혹은 수강한 강의수가 전체의 50% 이상 경과한 경우 환불 불가<br />
            환불금액 = 결제금액 – {결제금액*(실제 수강일/전체 수강일)}<br />
            전체 수강일은 복습기간을 제외한 수강일입니다.
          </li>
          <li>1–2. 단과(1개월 이상 상품)</li>
          <li>① 수강시작 후 7일 이내, 5강 미만 수강 시에는 100% 환불 가능</li>
          <li>② 수강시작 후 7일 초과, 5강 이상 수강 시에는 잔여일에 대한 환불이 가능</li>
          <li>
            환불금액 = 결제금액 – {결제금액*(실제 수강일/전체 수강일)}<br />
            최종 환불 금액 = 38,600원(십원 단위 버림)
          </li>
        </ol>
        <strong class="refund-tit">2. 야나두 패키지 및 프리패스 상품 수강기간 정책</strong>
        <ol>
          <li>
            야나두 사이트에서 판매하는 패키지(프리패스) 상품의 총 학습기간은 기본적으로 수강기간 90일+복습기간(무료)으로
            이루어져 있으며, 복습기간 및 이벤트와 기타 사유로 연장된 추가 학습기간 등은 무료 학습기간으로 제공
            됩니다.<br />
            특정 상품을 제외한 모든 패키지 상품의 환불은 수강기간인 90일을 기준으로 하여 환불금액을 책정 합니다.<br />
            판매중인 각 패키지지별 수강기간은 [수강신청] – [전체 강좌 보기] 메뉴 및 각 상품 페이지 하단의 유의사항에서
            확인 가능합니다.
          </li>
          <li>* 패키지, 상품에 포함 된 교재 및 도서는 "교재 및 도서 환불, 반품 안내" 규정에 따라 환불 됩니다.</li>
          <li>* 패키지, 상품에 포함 된 전자기기는 "야나두 전자기기 A/S 및 환불정책" 규정에 따라 A/S 및 환불 됩니다.</li>
          <li>* 패키지, 상품에 포함 된 사은품 및 판촉물은 "사은품 및 판촉물 환불정책" 규정에 따라 환불 됩니다.</li>
        </ol>
        <strong class="refund-tit">3. 교재 및 도서 환불, 반품 안내</strong>
        <ol>
          <li>① 출고 전 상품은 100% 환불이 가능합니다.</li>
          <li>② 구매 후 15일 이전 반품 및 사용, 훼손이 없는 경우에 한해 환불 가능합니다.</li>
        </ol>
      </div>
    </section>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import HeaderSub from '@/components/common/HeaderSub.vue'
</script>

<!-- style -->
<style scoped>
.refund-col {
  padding: 6rem 0 0;
}
.inner-col {
  max-width: 119.5rem;
  margin: auto;
}
.refund-col .sub-header {
  display: block;
}
.refund-col h3 {
  padding: 2.1rem 5rem 2rem;
  font-size: 1.8rem;
  border-top: 0.3rem solid #000;
  border-bottom: 0.1rem solid #b7b7c8;
}
.refund-col .refund_text {
  padding: 3rem 5rem 4rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  margin-bottom: 2.7rem;
}
.refund-col .refund-tit {
  display: block;
  margin-top: 2rem;
}
.refund-col .refund_text ol {
  line-height: 1.5;
}
.refund-col .refund_text ol:first-child {
  margin-top: 0;
}

@media screen and (max-width: 1024px) {
  .refund-col {
    padding: 0;
  }

  .refund-col h3 {
    padding: 8rem 6rem 0;
    font-size: 3rem;
    border: 0;
  }
  .refund-col .refund_text {
    padding: 6rem 6rem 16rem;
    font-size: 3rem;
    line-height: 4rem;
    margin-bottom: 0;
  }
  .refund-col .refund-tit {
    margin-top: 2rem;
  }
}
</style>
