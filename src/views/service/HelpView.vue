<template>
  <section class="help-col">
    <section class="inner-col">
      <HeaderSub :sub-title="'고객센터'" />
      <div class="help-info-col">
        <p>
          <strong>1600–0563</strong>
          <span>운영시간 9:00 ~ 18:00</span><span>(주말, 공휴일 제외)</span>
        </p>
        <div class="help-btn-area">
          <button type="button" class="btn-consulting-call"><span>전화상담 1600–0563</span></button>
          <button type="button" class="btn-inquiry" @click="openModal('MyInquiryModal')">
            <span>1:1 문의하기</span>
          </button>
        </div>
      </div>
      <div class="help-list-col">
        <ul>
          <li class="faq">
            <a href="FaqView"><span>자주 묻는 질문</span></a>
          </li>
          <li class="notice">
            <a href="NoticeView"><span>공지사항</span></a>
          </li>
          <li class="refund">
            <a href="RefundView"><span>환불 규정 안내</span></a>
          </li>
        </ul>
        <ul>
          <li>
            <RouterLink to="/service/TermsView"><span>이용약관 및 개인정보 처리 방침</span></RouterLink>
          </li>
        </ul>
      </div>
      <div class="app-download-col">
        <p>앱 다운로드</p>
        <div class="download-btn-area">
          <button type="button" class="btn-aos" @click="goPlayStore()"><i class="blind">AOS 다운로드</i></button>
          <button type="button" class="btn-ios" @click="goAppStore()"><i class="blind">IOS 다운로드</i></button>
        </div>
      </div>
    </section>
    <Teleport to="#modals">
      <MyInquiryModal v-if="store.state.MyInquiryModal == true" />
    </Teleport>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import HeaderSub from '@/components/common/HeaderSub.vue'
import MyInquiryModal from '@/components/modal/MyInquiryModal.vue'
import { useStore } from '@/stores/b2bStore'
import type { ModalState } from '@/types/service/gnb'
import { RouterLink } from 'vue-router'

const store = useStore()

function openModal(modalName: keyof ModalState): void {
  store.openModal(modalName)
}

function goPlayStore() {
  const playStore = 'https://play.google.com/store/apps/details?id=kr.co.yanadoo.app2'
  window.location.href = playStore
}

function goAppStore() {
  const appStore = 'https://apps.apple.com/kr/app/id1539582420'
  window.location.href = appStore
}
</script>

<!-- style -->
<style scoped>
.help-col {
  padding: 6rem 0 0;
}
.help-col .sub-header {
  display: block;
}

.help-info-col {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 4.1rem;
}
.help-info-col p {
  flex: 1 1 auto;
  font-weight: 700;
  font-size: 1.6rem;
}
.help-info-col p strong {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 700;
  font-size: 3.2rem;
}
.help-info-col .help-btn-area {
  flex: 0 0 auto;
}
.help-info-col .help-btn-area button {
  display: block;
  width: 27.2rem;
  padding: 1.2rem 0;
  font-weight: 400;
  font-size: 1.6rem;
  background-color: #fff;
  border: 0.1rem solid #dfdfea;
  border-radius: 0.4rem;
}
.help-info-col .help-btn-area button.btn-consulting-call {
  display: none;
}
.help-info-col .help-btn-area button::before {
  content: '';
  display: inline-block;
  width: 2.8rem;
  height: 2.8rem;
  margin-top: -0.25rem;
  margin-right: 1rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  vertical-align: middle;
}
.help-info-col .help-btn-area button.btn-inquiry::before {
  background-image: url(../../assets/images/ico_pc_terms_question_22x22.png);
  background-size: 2.28rem;
}
.help-info-col .help-btn-area button + button {
  margin-top: 0.9rem;
}
.help-list-col {
  margin-top: 6.1rem;
}
.help-list-col ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.9rem 0 5.4rem;
  border-top: 0.2rem solid #000;
}
.help-list-col ul li {
  flex: 1 1 auto;
  font-weight: 700;
  font-size: 1.6rem;
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: 10rem auto;
  text-align: center;
}
.help-list-col ul li.faq {
  background-image: url(../../assets/images/ico_pc_terms01_100x100.png);
}
.help-list-col ul li.notice {
  background-image: url(../../assets/images/ico_pc_terms02_100x100.png);
}
.help-list-col ul li.refund {
  background-image: url(../../assets/images/ico_pc_terms03_100x100.png);
}
.help-list-col ul li a {
  display: block;
  padding-top: 9rem;
}
.help-list-col ul + ul {
  padding: 0;
  border-top: 0.1rem solid #dfdfea;
  border-bottom: 0.1rem solid #dfdfea;
}
.help-list-col ul + ul li {
  font-weight: 700;
}
.help-list-col ul + ul li + li {
  border-left: 0.1rem solid #dfdfea;
}
.help-list-col ul + ul li a {
  padding: 2.2rem 0;
}
.app-download-col {
  margin: 7rem 0 14rem;
}
.app-download-col p {
  font-weight: 700;
  font-size: 2rem;
}
.app-download-col .download-btn-area {
  display: flex;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 3.7rem;
}
.app-download-col .download-btn-area button {
  flex: 0 1 auto;
  width: 49%;
  height: 6.8rem;
  font-weight: 700;
  font-size: 1.6rem;
  background-color: #ffb900;
  border-radius: 0.4rem;
}
.app-download-col .download-btn-area button.btn-aos {
  background: #28284b url(../../assets/images/img_pc_google_play.png) no-repeat 50% 50%/14.3rem 3.2rem;
}
.app-download-col .download-btn-area button.btn-ios {
  background: #28284b url(../../assets/images/img_pc_app_store.png) no-repeat 50% 50%/13.5rem 3.2rem;
}

@media screen and (max-width: 1024px) {
  .help-col {
    padding: 0;
  }
  .inner-col {
    max-width: 100%;
  }
  .sub-header h2 {
    font-size: 2.8rem;
  }
  .help-info-col {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0;
    padding: 6.4rem 4.2rem 6.4rem;
    background-color: #f7f7fc;
  }
  .help-info-col p {
    font-size: 3.2rem;
  }
  .help-info-col p strong {
    display: none;
  }
  .help-info-col p span {
    display: block;
    line-height: 1.3;
  }
  .help-info-col .help-btn-area {
    width: 100%;
    margin-top: 4rem;
  }
  .help-info-col .help-btn-area button {
    width: 100%;
    padding: 3rem 0;
    font-size: 2.8rem;
  }
  .help-info-col .help-btn-area button.btn-consulting-call {
    display: block;
    color: #fff;
    background-color: #28284b;
    border: 0.4rem solid #28284b;
    width: 100%;
  }
  .help-info-col .help-btn-area button + button {
    margin-top: 1.4rem;
  }
  .help-info-col .help-btn-area button.btn-consulting-call::before {
    width: 4.1rem;
    height: 4rem;
    margin-right: 1rem;
    background: url(../../assets/images/ico_mo_help_cunsulting_call_41x40.png) center/4.1rem 4rem no-repeat;
  }
  .help-info-col .help-btn-area button.btn-inquiry:before {
    width: 4rem;
    height: 4rem;
    background: url(../../assets/images/ico_mo_terms_question_40x40.png) center/4rem no-repeat;
    border-radius: 50%;
    margin-right: 0.4rem;
  }
  .help-list-col {
    margin-top: 0;
  }
  .help-list-col ul {
    flex-direction: column;
    padding: 0;
    border-top: none;
  }
  .help-list-col ul li {
    width: 100%;
    font-weight: 700;
    font-size: 5.4rem;
    text-align: left;
    border-bottom: 0.1rem solid #e5e5e5;
    background-image: none !important;
  }
  .help-list-col ul li a {
    padding: 4rem 4.2rem;
    font-size: 2.8rem;
  }
  .help-list-col ul + ul {
    border: none;
  }
  .help-list-col ul + ul li {
    font-weight: 400;
  }
  .help-list-col ul + ul li + li {
    border-left: none;
  }
  .help-list-col ul + ul li a {
    width: 100%;
    padding: 4rem 4.2rem;
    font-weight: 700;
    box-sizing: border-box;
    text-align: left;
  }
  .app-download-col {
    margin: 5.8rem 0 7rem;
    padding: 0 4.2rem;
  }
  .app-download-col p {
    font-size: 2.8rem;
  }
  .app-download-col .download-btn-area {
    margin-top: 2rem;
  }
  .app-download-col .download-btn-area button {
    height: 9.6rem;
    border-radius: 0.5rem;
  }
  .app-download-col .download-btn-area button.btn-aos {
    background: #28284b url(../../assets/images/img_mo_google_play.png) center/18.4rem 4.1rem no-repeat;
  }
  .app-download-col .download-btn-area button.btn-ios {
    background: #28284b url(../../assets/images/img_mo_app_store.png) center/17.4rem 4.1rem no-repeat;
  }
}
</style>
