<template>
  <div id="changePw" class="modal-wrap">
    <div class="modal-content">
      <div class="modal-head">
        <button type="button" class="btn-modal-close" @click="closeModal('PwChangeMassModal')">
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-head">
          <h4>개인정보 확인 및<br />비밀번호를 변경해주세요.</h4>
          <p>
            안전한 야나두 사이트 이용을 위하여, 기존 비밀번호를 변경해야 합니다.<br />
            아래에 새 비밀번호를 입력해 주세요.
          </p>
        </div>
        <form @submit.prevent="changePassword">
          <ul>
            <li>
              <strong class="modal-tit">휴대전화</strong>
              <input v-model="cellPhone" type="text" />
            </li>
            <li>
              <strong class="modal-tit">이메일 주소</strong>
              <input v-model="email" type="text" />
            </li>
            <li>
              <strong class="modal-tit">새 비밀번호</strong>
              <input
                v-model="password"
                type="password"
                autocomplete="off"
                placeholder="영문, 숫자, 특수문자 (‘”,.<>제외) 8~12자"
                :class="{ error: !isPasswordValid }"
                @input="validatePassword"
              />
              <div v-if="!isPasswordValid" class="form-guide">
                비밀번호는 8~12자의 영문, 숫자, 특수문자로 이루어져야 합니다.
              </div>
            </li>
            <li>
              <strong class="modal-tit">비밀번호 확인</strong>
              <input
                v-model="confirmPassword"
                type="password"
                autocomplete="off"
                placeholder="비밀번호를 다시 입력해 주세요."
                :class="{ error: !isConfirmPasswordValid }"
                @input="validateConfirmPassword"
              />
              <div v-if="!isConfirmPasswordValid" class="form-guide">비밀번호가 일치하지 않습니다.</div>
            </li>
            <li class="agree-yellow">
              <label for="check-same" class="input-chk chk-md">
                <input id="check-same" type="checkbox" :checked="isUserCheck" @change="toggleUserCheck" />
                <span class="chk-txt">가입된 개인정보가 본인의 정보와 일치합니다.</span>
              </label>
            </li>
            <li class="agree-wrap">
              <div class="agree-all">
                <label for="check-changepw-all" class="input-chk chk-md">
                  <input
                    id="check-changepw-all"
                    type="checkbox"
                    :checked="isAllCheckedBtn"
                    @change="toggleAllChecked"
                  />
                  <span class="chk-txt">아래 약관에 모두 동의합니다.</span>
                </label>
              </div>
              <div class="agree-box">
                <label for="check-changepw-agree" class="input-chk chk-md">
                  <input id="check-changepw-agree" type="checkbox" :checked="isTermsAgree" @change="toggleTermsAgree" />
                  <span class="chk-txt">(필수) 이용약관 동의</span>
                </label>
                <button type="button" class="agree-more" @click="popupOpen('ServiceTerms')">내용보기</button>
              </div>
              <div class="agree-box">
                <label for="check-changepw-privacy" class="input-chk chk-md">
                  <input
                    id="check-changepw-privacy"
                    type="checkbox"
                    :checked="isPrivacyAgree"
                    @change="togglePrivacyAgree"
                  />
                  <span class="chk-txt">(필수) 개인정보 수집 및 이용 동의</span>
                </label>
                <button type="button" class="agree-more" @click="popupOpen('PrivacyPolicyModal')">내용보기</button>
              </div>
              <!-- <div class="agree-box">
                <label for="check-changepw-privacy02" class="input-chk chk-md">
                  <input id="check-changepw-privacy02" type="checkbox" :checked="isPrivacyEntrustAgree" @change="togglePrivacyEntrustAgree" />
                  <span class="chk-txt">(필수) 개인정보 위탁 및 제공 동의</span>
                </label>
                <a href="javascript:alert('헤니한테 내용확인')" class="agree-more">내용보기</a>
              </div> -->
            </li>
          </ul>
          <div class="form-button-wrap">
            <button type="button" class="form-button white" @click="handleCancel">취소</button>
            <button
              type="button"
              class="form-button"
              :disabled="!(isTermsAgree && isPrivacyAgree && isUserCheck)"
              @click="changePassword"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="dimmed"></div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import SignInService from '@/api/auth/SignInService'
import b2bStore from '@/stores/b2bStore'
import type {
  B2BChangePasswordOfFirstSignInMassUserRequest,
  B2BGetFirstSignInMassMeResponse
} from '@/types/auth/signIn'
import type { CommonResponse } from '@/types/commonResponse'
import type { ModalState } from '@/types/service/gnb'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const store = b2bStore()
const router = useRouter()

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

const cellPhone = ref<string>('')
const email = ref<string>('')
const isUserCheck = ref<boolean>(false)
const isAllChecked = ref<boolean>(false)
const isPrivacyAgree = ref<boolean>(false)
const isTermsAgree = ref<boolean>(false)
const password = ref<string>('')
const confirmPassword = ref<string>('')
const isPasswordValid = ref<boolean>(true)
const isConfirmPasswordValid = ref<boolean>(true)

onMounted(() => {
  massUserCheck()
})

function isAllCheckedBtn() {
  return isTermsAgree.value && isPrivacyAgree.value
}

function popupOpen(pageName: string) {
  window.open('/popup/service/' + pageName, '_blank', 'width=500,height=600')
}

// 최초 로그인한 일괄가입자 정보 조회
async function massUserCheck() {
  // getFirstSignInMassMe
  const result: B2BGetFirstSignInMassMeResponse = await SignInService.getFirstSignInMassMe()
  if (result) {
    cellPhone.value = result.cellPhone
    email.value = result.email
  }
}

async function changePassword() {
  const params: B2BChangePasswordOfFirstSignInMassUserRequest = {
    cellPhone: cellPhone.value,
    email: email.value,
    password: password.value,
    isTermsAgree: isTermsAgree.value,
    isPrivacyAgree: isPrivacyAgree.value
    // isUserCheck: isUserCheck.value,
  }
  // 비밀번호 변경 API 호출
  const result: CommonResponse<void> = await SignInService.changePasswordOfFirstSignInMassUser(params)
  if (result.meta.code === 200) {
    alert('비밀번호 변경이 완료되었습니다. 안전한 사이트 이용을 위해 다시 로그인해주세요')
    closeModal('PwChangeMassModal')
    router.push(`/${store.siteCode}/sign-in`)
  } else {
    alert(result.meta.message)
  }
}

// 비밀번호 유효성체크 함수
function validatePassword() {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$/
  isPasswordValid.value = passwordRegex.test(password.value)
}
//비밀번호 일치 확인 함수
function validateConfirmPassword() {
  isConfirmPasswordValid.value = password.value === confirmPassword.value
}

function toggleUserCheck(event: Event) {
  const target = event.target as HTMLInputElement
  isUserCheck.value = target.checked
  isAllChecked.value = !isUserCheck.value
}

function toggleAllChecked(event: Event) {
  const target = event.target as HTMLInputElement
  isTermsAgree.value = target.checked
  isPrivacyAgree.value = target.checked
}

function toggleTermsAgree(event: Event) {
  const target = event.target as HTMLInputElement
  isTermsAgree.value = target.checked
  isAllChecked.value = !isTermsAgree.value
}

function togglePrivacyAgree(event: Event) {
  const target = event.target as HTMLInputElement
  isPrivacyAgree.value = target.checked
  isAllChecked.value = !isPrivacyAgree.value
}

function handleCancel() {
  const confirmation = confirm('비밀번호 변경을 취소하시겠습니까?')
  if (confirmation) {
    closeModal('PwChangeMassModal')
    store.setLogout()
  }
}
</script>

<!-- style -->
<style scoped>
#changePw {
  z-index: 3;
}
#changePw .form-head {
  padding-bottom: 1.6rem;
  text-align: center;
}
#changePw .form-head h4::before {
  content: '';
  display: block;
  margin: 0 auto 2rem;
  width: 5.6rem;
  height: 5.6rem;
  background: url(@/assets/images/ico_info_168x168yellow.png) no-repeat center / 100%;
}
#changePw .form-head h4 {
  font-size: 2.8rem;
  line-height: 1.28;
}
#changePw .form-head h4 + p {
  margin-top: 1rem;
  font-size: 1.4rem;
  line-height: 1.42;
  color: #717188;
}

@media screen and (max-width: 1024px) {
  #changePw .form-head {
    padding-bottom: 1.8rem;
  }
  #changePw .form-head h4::before {
    margin: 0 auto 3.2rem;
    width: 8rem;
    height: 8rem;
  }
  #changePw .form-head h4 {
    font-size: 4rem;
    line-height: 1.2;
  }
  #changePw .form-head h4 + p {
    margin-top: 2.4rem;
    font-size: 2.4rem;
    line-height: 1.25;
  }
}
</style>
