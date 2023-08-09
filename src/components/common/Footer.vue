<template>
  <footer class="footer" @transitionend="onTransitionend">
    <div class="inner-col">
      <div class="logo-wrap">
        <h2 class="logo">
          <a href="#"><img src="@/assets/images/img_pc_ynd_logo.png" alt="야나두 로고" /></a>
        </h2>
        <ul class="info-list">
          <li>
            <a href="https://www.yanadoo.co.kr/promotion-landing/company.html" target="_blank">회사소개</a>
          </li>
          <li>
            <a href="https://www.yanadoo.co.kr/promotion-landing/yanadooInfo.html" target="_blank"
              >야나두 서비스 소개</a
            >
          </li>
          <li>
            <RouterLink to="/service/TermsView">이용약관</RouterLink> 및
            <RouterLink to="/service/PrivacyPolicyView" class="privacy">개인정보 처리방침</RouterLink>
          </li>
        </ul>
        <address>
          <p>주식회사 야나두(야나두 원격평생교육원)・대표 김정수, 김민철・개인정보보호 책임자 고현배</p>
          <p>사업자등록번호 129-86-23477・통신판매업 신고번호 제2018-서울강남-02139호</p>
          <p>
            주소 서울시 강남구 영동대로 96길 26, 3, 4층(삼성동, Place 1)・원격 평생교육 시설신고 서울특별시 강남
            서초교육지원청(제 원516호)
          </p>
        </address>
      </div>
      <div class="service-wrap">
        <a href="tel:16000563" class="service-tel">1600.0563</a>
        <ul class="service-list">
          <li>평일 : 09:00 ~ 18:00</li>
          <li>점심시간 : 12:00 ~ 13:00</li>
        </ul>
        <select onchange="if (this.value) window.open('about:blank').location.href=this.value" name="family-site">
          <option value="none" selected disabled>Family Sites</option>
          <option value="https://www.yanadoo.co.kr/">야나두</option>
          <option value="https://www.yanadookids.com/">야나두 키즈</option>
          <option value="https://www.yanadookidsmall.com/">야나두 키즈몰</option>
        </select>
      </div>
    </div>
  </footer>
</template>

<!-- script -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const emits = defineEmits(['scrollTop', 'resize', 'transitionend'])
const onScroll = () => emits('scrollTop', window.scrollY)
const onResize = () => emits('resize')
const onTransitionend = () => emits('transitionend')

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>
