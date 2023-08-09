<template>
  <div class="content">
    <div class="login-head">
      <img :src="mainLogo" :alt="store.siteCode + 'logo'" />
      <span class="middle"></span>
      <img src="@/assets/images/img_logo_yanadoo.png" alt="yanadoo logo" class="logo-yanadoo" />
    </div>
    <div id="login" class="modal-wrap">
      <div class="modal-content">
        <div class="modal-body">
          <form action="" @keyup.enter="signIn">
            <strong class="login-tit">로그인 후 이용이<br />가능합니다.</strong>
            <ul>
              <li>
                <input v-model="userId" type="text" placeholder="아이디를 입력해 주세요." />
              </li>
              <li>
                <input v-model="password" type="password" autocomplete="off" placeholder="비밀번호를 입력해 주세요." />
              </li>
            </ul>
            <div class="button-wrap">
              <ul class="find-list">
                <li>
                  <button type="button" @click="openModal('IdFindModal')">아이디 찾기</button>
                </li>
                <li>
                  <button type="button" @click="openModal('PwFindModal')">비밀번호 찾기</button>
                </li>
              </ul>
              <button type="button" class="btn-join" @click="openModal('JoinModal')">회원가입</button>
            </div>
            <button type="button" class="login-button" @click="signIn">로그인</button>
          </form>
          <div class="login-banner">
            <p>
              야나두에서<br />
              <strong>특별한 클래스</strong>를 만나보세요!
            </p>
          </div>
          <div class="info-txt" v-html="mainNotice"></div>
        </div>
      </div>
    </div>
    <p class="login-copyright">Copyright ⓒ Yanadoo Co.,Ltd. all rights reserved.</p>
    <Teleport to="#modals">
      <LoginWrapModal v-if="store.state.LoginWrapModal === true" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/b2bStore'
import MainPageService from '@/api/service/MainPageService'
import type { HomepageLogoResponse, LoginNoticeResponse } from '@/types/service/mainPage'
import SignUpService from '@/api/auth/SignUpService'
import type { B2BIsIndividualResponse } from '@/types/auth/signUp'
import SignInService from '@/api/auth/SignInService'
import type { B2BSignInRequest, B2BSignInResponse } from '@/types/auth/signIn'
import LoginWrapModal from '@/components/modal/LoginWrapModal.vue'
import type { ModalState } from '@/types/service/gnb'

const route = useRoute()
const router = useRouter()
const store = useStore()

onMounted(() => {
  checkIndividual()
  getLogoBySiteCode()
  siteCodeNone()
  getLoginNotice()
})

const siteCode = ref<string>(route.params.siteCode.toString())

// 개별회원가입 여부 체크
async function checkIndividual() {
  const result: B2BIsIndividualResponse = await SignUpService.isIndividual(siteCode.value)
  console.log('checkIndividual:', result)
  if (result.isIndividual) {
    openModal('LoginWrapModal')
    nextTick(() => {
      const joinButton = document.querySelector('.btn-join') as HTMLElement
      if (joinButton) {
        joinButton.style.display = result.isIndividual ? 'block' : 'none'
      }
    })
  }
}

const mainLogo = ref<string>()
// 고객사 로고 조회 - 사이트 코드 (로그인 페이지용)
async function getLogoBySiteCode() {
  const result: HomepageLogoResponse = await MainPageService.getLogoBySiteCode(siteCode.value)
  mainLogo.value = result.logoFilePath ? result.logoFilePath : '@/assets/images/img_logo_yanadoo.png'
  console.log('mainLogo: ', mainLogo.value)
}

function siteCodeNone() {
  if (siteCode.value === ':siteCode') {
    alert('잘못된 접근 입니다. 사이트 코드가 입력된 페이지로 접근 바랍니다.')
  }
}

const mainNotice = ref<string>('')
// 로그인 공지사항 조회
const loginNotice = ref<LoginNoticeResponse>()
async function getLoginNotice() {
  const result: LoginNoticeResponse = await MainPageService.getLoginNotice(siteCode.value)
  console.log('getLoginNotice:', result)
  loginNotice.value = result
  if (loginNotice.value.loginNoticeDisplayYn === 'Y') {
    mainNotice.value = loginNotice.value.loginNoticeContent
  } else {
    let infoTxt = document.querySelector('.info-txt') as HTMLElement
    infoTxt.style.display = 'none'
  }
}

function openModal(modalName: keyof ModalState): void {
  console.log('openModal:', modalName)
  store.openModal(modalName)
}

const userId = ref<string>('')
const password = ref<string>('')
// 로그인
async function signIn() {
  const payload: B2BSignInRequest = {
    deviceType: 0, // 디바이스 정보 (0: Web)
    siteCode: siteCode.value, // 사이트 코드
    userId: userId.value, // 아이디
    password: password.value, // 비밀번호
    isKeepSignIn: false // 로그인 유지 여부
  }

  const result: B2BSignInResponse = await SignInService.signIn(payload)
  if (result) {
    store.setSignIn(result)
    store.siteCode = siteCode.value
  }

  if (result.isMassSignUpFirstLogin === true) {
    store.state.PwChangeMassModal = !store.state.PwChangeMassModal
  } else {
    router.push('/')
  }
}
</script>

<!-- style -->
<style scoped>
.login-head {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2.5rem;
  border-bottom: 1px solid #dfdfea;
  box-sizing: border-box;
  z-index: 3;
}
.login-head img {
  width: 15rem;
  height: 3.6rem;
  object-fit: contain;
}
.login-head .middle {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 2rem;
  background: url(@/assets/images/ico_x_gray.png) no-repeat center / 100%;
}
.login-copyright {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5rem;
  font-size: 1.4rem;
  text-align: center;
  color: #b7b7c8;
  z-index: 3;
}
#login {
  background: #fff;
}
#login .modal-content {
  width: 89rem;
}
#login .modal-content .btn-modal-close {
  top: 2rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  margin-top: 0;
}
#login .modal-content .modal-body {
  display: grid;
  grid-template-columns: 41.6rem 1fr;
  align-items: center;
  gap: 2.4rem 4.6rem;
  height: 51.6rem;
  padding: 4.8rem 4rem;
  box-sizing: border-box;
}
#login .modal-content .login-tit {
  display: block;
  margin-bottom: 8.5rem;
  font-size: 3.2rem;
  line-height: 1.25;
}
#login form {
  padding: 0;
  border-top: 0;
  grid-row: 1/3;
}
#login form li {
  width: auto;
  margin-top: 0;
  color: #717188;
}
#login form li + li {
  margin-top: 0;
}
#login form .find-list li + li::before {
  content: '・';
  display: inline-block;
}
#login form .button-wrap {
  display: flex;
  justify-content: space-between;
  margin: 1.6rem 0 2.4rem;
  font-size: 1.4rem;
}
#login .find-list li {
  display: inline-block;
  width: auto;
  margin-top: 0;
}
#login form .btn-join {
  font-weight: 500;
  color: #3547a4;
}
#login form .btn-join::after {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 0.5rem;
  height: 0.5rem;
  margin: -0.1rem 0 0 0.3rem;
  border: solid #3547a4;
  border-width: 1px 1px 0 0;
  transform: rotate(45deg);
}
#login .login-button {
  width: 100%;
  padding: 2rem 0;
  font-weight: 700;
  font-size: 1.8rem;
  color: #fff;
  text-align: center;
  background: #ffb900;
  border-radius: 0.8rem;
}
#login .login-banner {
  display: flex;
  align-items: flex-end;
  height: 13rem;
  padding: 2.5rem;
  border-radius: 1rem;
  box-sizing: border-box;
  background: url(@/assets/images/img_login_banner.png) no-repeat center / cover;
}
#login .login-banner p {
  font-weight: 500;
  font-size: 1.8rem;
  color: #fff;
  line-height: 1.33;
}
#login .info-txt {
  height: 19rem;
  padding: 2.4rem;
  border: 1px solid #ececf6;
  border-radius: 0.8rem;
  overflow: auto;
}
#login .info-txt strong {
  display: block;
  margin-bottom: 1.2rem;
  font-weight: 500;
  font-size: 1.6rem;
  color: #28284b;
}
#login .info-txt p {
  font-size: 1.4rem;
  line-height: 1.42;
  color: #717188;
  letter-spacing: -0.03em;
}
#login .dimmed {
  background: #fff;
}
@media screen and (max-width: 1024px) {
  .login-head img {
    width: 19rem;
    height: 4.3rem;
  }
  .login-head .middle {
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 1.8rem;
  }
  .login-copyright {
    display: none;
  }
  #login .modal-content {
    width: 100%;
  }
  #login .modal-content .btn-modal-close {
    top: 3.2rem;
    right: 3.2rem;
    width: 4rem;
    height: 4rem;
  }
  #login .modal-content .modal-body {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 0;
    height: 100%;
    padding: 17rem 4.4rem 4.2rem;
  }
  #login .modal-content .login-tit {
    margin-bottom: 20rem;
    font-size: 5.6rem;
    line-height: 1.14;
  }
  #login form {
    display: flex;
    flex-direction: column;
  }
  #login .login-button {
    order: 3;
    padding: 3rem;
    margin-top: 3.2rem;
    font-size: 2.8rem;
    border-radius: 0.8rem;
  }
  #login form .button-wrap {
    order: 4;
    margin: 4rem 0 5.6rem;
    font-size: 2.4rem;
  }
  #login form .btn-join::after {
    width: 1rem;
    height: 1rem;
    margin: -0.3rem 0 0 0.5rem;
  }
  #login .login-banner {
    display: none;
  }
  #login .info-txt {
    height: 30rem;
    padding: 3.2rem;
    background: #f7f7fc;
    border-color: #f7f7fc;
  }
  #login .info-txt strong {
    margin-bottom: 1.6rem;
    font-size: 2.4rem;
    color: #717188;
  }
  #login .info-txt p {
    font-size: 2.4rem;
  }
}
</style>
