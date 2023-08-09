<template>
  <div id="overseas" class="modal-wrap">
    <div class="modal-content">
      <div class="modal-head"></div>
      <div class="modal-body">
        <div class="form-head">
          <h4>해외 거주자 회원가입</h4>
          <p>지금 회원가입을 하시면 아주 특별한 헤택을 누릴 수 있습니다.</p>
        </div>
        <form action="">
          <span class="essential guide">필수 입력 항목</span>
          <ul>
            <li>
              <strong class="modal-tit essential">이름</strong>
              <input
                v-model="signUpData.userName"
                type="text"
                placeholder="이름을 입력해 주세요."
                @input="validateUserName"
              />
            </li>
            <li>
              <strong class="modal-tit essential">아이디</strong>
              <input
                v-model="signUpData.userId"
                type="text"
                placeholder="아이디를 입력해 주세요."
                :class="{ error: !isUserIdValid }"
                @input="validateUserId"
              />
              <div v-if="!isUserIdValid" class="form-guide">아이디는 6~12자의 영문, 숫자만 사용 가능합니다.</div>
            </li>
            <li>
              <strong class="modal-tit essential">비밀번호</strong>
              <input
                v-model="signUpData.password"
                type="password"
                autocomplete="off"
                placeholder="영문, 숫자, 특수문자(‘”,./’<>제외) 8~12자"
                :class="{ error: !isPasswordValid }"
                @input="validatePassword"
              />
              <div v-if="!isPasswordValid" class="form-guide">
                비밀번호는 8~12자의 영문, 숫자, 특수문자로 이루어져야 합니다.
              </div>
            </li>
            <li>
              <strong class="modal-tit essential">비밀번호 확인</strong>
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
            <li>
              <strong class="modal-tit essential">이메일 주소</strong>
              <input
                v-model="signUpData.email"
                type="text"
                placeholder="가입 시 사내 메일 계정을 입력해 주세요."
                @input="validateEmail"
              />
            </li>
            <li>
              <div class="form-tit">
                <label class="modal-tit essential" for="input-code">기업고유코드</label>
                <button
                  id="join-tip"
                  type="button"
                  class="btn-tip"
                  :class="{ active: showTooltip }"
                  @click="toggleTooltip"
                >
                  <span class="blind">도움말</span>
                </button>
                <div v-show="showTooltip" class="tip-box">
                  <button
                    type="button"
                    class="btn-tip-close"
                    onclick="document.querySelector('#overseas-tip').classList.remove('active');"
                  >
                    <span class="blind">닫기</span>
                  </button>
                  <p>
                    야나두 기업회원 가입 및 로그인에 필요한 기업 전용 정보이며, 회사를 통해 공지되기 때문에 가입안내
                    내용을 확인하시기 바랍니다.
                  </p>
                </div>
              </div>
              <input id="input-code" v-model="companyCode" placeholder="기업고유코드" readonly />
            </li>
          </ul>
          <ul>
            <li v-if="additionalData?.isAffiliateName">
              <strong class="modal-tit">계열사명</strong>
              <input v-model="signUpData.affiliateName" type="text" placeholder="계열사명을 입력해 주세요." />
            </li>
            <li v-if="additionalData?.isEmployeeIdentificationNumber">
              <strong class="modal-tit">사번</strong>
              <input
                v-model="signUpData.employeeIdentificationNumber"
                type="text"
                placeholder="사번을 입력해 주세요."
              />
            </li>
            <li v-if="additionalData?.isDepartmentName">
              <strong class="modal-tit">부서명</strong>
              <input v-model="signUpData.departmentName" type="text" placeholder="부서를 입력해 주세요." />
            </li>
            <li v-if="additionalData?.isPosition">
              <strong class="modal-tit">직책</strong>
              <input v-model="signUpData.position" type="text" placeholder="직책을 입력해 주세요." />
            </li>
            <li v-if="additionalData?.isJobGrade">
              <strong class="modal-tit">직급</strong>
              <input v-model="signUpData.jobGrade" type="text" placeholder="직급을 입력해 주세요." />
            </li>
            <li v-if="additionalData?.isNote">
              <strong class="modal-tit">비고/기타</strong>
              <input v-model="signUpData.note" type="text" placeholder="비고/기타사항을 입력해 주세요." />
            </li>
          </ul>
          <div class="agree-wrap">
            <div>
              <div class="agree-all">
                <label for="check-agree-all" class="input-chk chk-md">
                  <input id="check-agree-all" type="checkbox" :checked="isAllChecked" @change="toggleAllChecked" />
                  <span class="chk-txt">만 14세 이상이며, 아래 약관에 모두 동의합니다.</span>
                </label>
              </div>
              <div class="agree-box">
                <label for="checkk-agree" class="input-chk chk-md">
                  <input
                    id="checkk-agree"
                    type="checkbox"
                    :checked="signUpData.isTermsAgree"
                    @change="toggleTermsAgree"
                  />
                  <span class="chk-txt">(필수) 이용약관 동의</span>
                </label>
                <button type="button" class="agree-more" @click="popupOpen('ServiceTerms')">내용보기</button>
              </div>
              <div class="agree-box">
                <label for="check-privacy" class="input-chk chk-md">
                  <input
                    id="check-privacy"
                    type="checkbox"
                    :checked="signUpData.isPrivacyProvideAgree"
                    @change="togglePrivacyAgree"
                  />
                  <span class="chk-txt">(필수) 개인정보 수집 및 이용 동의</span>
                </label>
                <button type="button" class="agree-more" @click="popupOpen('PrivacyPolicyModal')">내용보기</button>
              </div>
            </div>
          </div>
          <div class="form-button-wrap">
            <button
              type="button"
              class="form-button"
              :disabled="!(signUpData.isTermsAgree && signUpData.isPrivacyProvideAgree)"
              @click="overseasHandleSignUp"
            >
              가입완료
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="dimmed" @click="closeModal('OverseasSignUpModal')"></div>
    <Teleport to="#modals">
      <JoinComplateModal v-if="store.state.JoinComplateModal == true" />
    </Teleport>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import b2bStore from '@/stores/b2bStore'
import type { ModalState } from '@/types/service/gnb'
import JoinComplateModal from '@/components/modal/JoinComplateModal.vue'
import { onMounted, ref } from 'vue'
import SignUpService from '@/api/auth/SignUpService'
import type {
  B2BOverseasSignUpRequest,
  B2BSearchSignUpAdditionalItemResponse,
  VerifyOverseasSignUpMailRequest,
  VerifyOverseasSignUpMailResponse
} from '@/types/auth/signUp'
import SignUpOverseasService from '@/api/auth/SignUpOverseasService'
import type { B2BOverseasSignUpResponse } from '@/types/auth/signUp'

const store = b2bStore()

const showTooltip = ref<boolean>(false)
const companyCode = ref<string>('')
const signUpData = ref<B2BOverseasSignUpRequest>({
  userId: '',
  password: '',
  userName: '',
  email: '',
  companyCode: '',
  isTermsAgree: false,
  isPrivacyProvideAgree: false,
  affiliateName: '',
  employeeIdentificationNumber: '',
  departmentName: '',
  position: '',
  jobGrade: '',
  note: '',
  pcc: ''
})

const additionalData = ref<B2BSearchSignUpAdditionalItemResponse>()
const isPasswordValid = ref<boolean>(true)
const confirmPassword = ref<string>('')
const isConfirmPasswordValid = ref<boolean>(true)
const isNameValid = ref<boolean>(true)
const isUserIdValid = ref<boolean>(true)
const isEmailValid = ref<boolean>(true)

function openModal(modalName: keyof ModalState): void {
  store.openModal(modalName)
}

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

onMounted(() => {
  getAdditionalData()
  mailCertification()
  console.log('mounted')
})

const isAllChecked = () => {
  return signUpData.value.isTermsAgree && signUpData.value.isPrivacyProvideAgree
}

function popupOpen(pageName: string) {
  window.open('/popup/service/' + pageName, '_blank', 'width=500,height=600')
}

function toggleAllChecked(event: Event) {
  const target = event.target as HTMLInputElement
  const isChecked = target.checked
  signUpData.value.isTermsAgree = isChecked
  signUpData.value.isPrivacyProvideAgree = isChecked
}

function toggleTermsAgree(event: Event) {
  const target = event.target as HTMLInputElement
  signUpData.value.isTermsAgree = target.checked
  // signUpData.value.isAllChecked = !signUpData.isTermsAgree
}

function togglePrivacyAgree(event: Event) {
  const target = event.target as HTMLInputElement
  signUpData.value.isPrivacyProvideAgree = target.checked
  // signUpData.isAllChecked = !signUpData.isPrivacyProvideAgree
}

function toggleTooltip() {
  showTooltip.value = !showTooltip.value
}

// 회원가입시에 입력할 추가사항 조회
async function getAdditionalData() {
  // searchSignUpAdditionalItem
  const url = window.location.href
  const siteCode = new URL(url).pathname.split('/')[1]  
  const result: B2BSearchSignUpAdditionalItemResponse = await SignUpService.searchSignUpAdditionalItem(siteCode)
  additionalData.value = result
}

// 이름 유효성체크 함수
function validateUserName() {
  isNameValid.value = !!signUpData.value.userName
}

// 아이디 유효성체크 함수
function validateUserId() {
  const koreanAndSpecialCharsRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|~!@#$%^&*()_+|<>?:{}]/
  if (koreanAndSpecialCharsRegex.test(signUpData.value.userId) || !signUpData.value.userId) {
    isUserIdValid.value = false
  } else {
    isUserIdValid.value = true
  }
}

// 이메일 유효성체크 함수
function validateEmail() {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  isEmailValid.value = emailRegex.test(signUpData.value.email)
}

//비밀번호 유효성체크 함수
function validatePassword() {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$/
  isPasswordValid.value = passwordRegex.test(signUpData.value.password)
}

//비밀번호 일치 확인 함수
function validateConfirmPassword() {
  isConfirmPasswordValid.value = signUpData.value.password === confirmPassword.value
}

// 이메일 인증
async function mailCertification() {
  // VerifyOverseasSignUpMailRequest
  const url = window.location.href
  const token = new URL(url).searchParams.get('token')
  const payload: VerifyOverseasSignUpMailRequest = {
    token: token?.toString() || ''
  }
  const result: VerifyOverseasSignUpMailResponse = await SignUpOverseasService.verifyOverseasSignUpMail(payload)
  companyCode.value = result.companyCode
  signUpData.value.pcc = token?.toString() || ''
}

async function overseasHandleSignUp() {
  const payload: B2BOverseasSignUpRequest = {
    affiliateName: signUpData.value.affiliateName,
    pcc: signUpData.value.pcc,
    companyCode: companyCode.value,
    departmentName: signUpData.value.departmentName,
    email: signUpData.value.email,
    employeeIdentificationNumber: signUpData.value.employeeIdentificationNumber,
    isPrivacyProvideAgree: true,
    isTermsAgree: true,
    jobGrade: signUpData.value.jobGrade,
    note: signUpData.value.note,
    password: signUpData.value.password,
    position: signUpData.value.position,
    userId: signUpData.value.userId,
    userName: signUpData.value.userName
  }
  // B2BOverseasSignUpRequest
  // B2BOverseasSignUpResponse
  const result: B2BOverseasSignUpResponse = await SignUpOverseasService.signUp(payload)
  if (result) {
    store.userId = result.userId
    store.userName = result.userName
    openModal('JoinComplateModal')
    // store.openModal('JoinComplateModal', result.userId, result.userName)
  }
}
</script>

<!-- style -->
<style scoped>
#overseas .modal-head {
  background: #f7f7fc;
}
#overseas .form-head {
  padding: 4rem 3.2rem;
  color: #717188;
  border-top: 1px solid #dfdfea;
  background: #f7f7fc;
}
#overseas .form-head h4 {
  font-size: 2.8rem;
}
#overseas .form-head h4 + p {
  margin-top: 1rem;
  font-size: 1.6rem;
  letter-spacing: -0.05em;
}

/* #overseas .form-btn {color:#000;} */
@media screen and (max-width: 1024px) {
  #overseas .form-head {
    padding: 8.8rem 4.2rem 8rem;
  }
  #overseas .form-head h4 {
    font-size: 4rem;
  }
  #overseas .form-head h4 + p {
    margin-top: 1.5rem;
    font-size: 2.4rem;
  }
}
</style>
@/api/auth/SignUpOverseasService
