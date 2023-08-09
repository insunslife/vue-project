<template>
  <div id="join" class="modal-wrap">
    <div class="modal-content">
      <div class="modal-head">
        <button type="button" class="btn-modal-close" @click="closeModal('JoinModal')">
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-head">
          <h4>회원가입</h4>
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
              <label for="category" class="modal-tit essential">휴대전화 </label>
              <select id="category" v-model="countryCode" name="category">
                <option v-for="country in countryList" :key="country.code" :value="country.code">
                  {{ country.name }}
                </option>
              </select>
            </li>
            <li>
              <div class="form-style02 error">
                <div class="input-wrap">
                  <input v-model="signUpData.cellPhone" type="text" placeholder="휴대전화번호를 입력해주세요." />
                </div>
                <button type="button" class="form-btn" :disabled="!signUpData.cellPhone" @click="issuanceNumber">
                  인증요청
                </button>
              </div>
            </li>
            <li>
              <label for="find-email" class="modal-tit essential">인증번호</label>
              <div class="form-style02">
                <div class="input-wrap">
                  <span v-if="timeCheck == true" class="timer">{{ store.formatTime(countdown) }}</span>
                  <input id="find-email" v-model="certNumber" type="text" placeholder="인증번호를 입력해주세요" />
                </div>
                <button type="button" class="form-btn" :disabled="!certNumber" @click="verifyNumber">인증</button>
              </div>
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
              <div class="form-tit essential">
                <label class="modal-tit" for="input-code">기업고유코드</label>
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
                    onclick="document.querySelector('#join-tip').classList.remove('active');"
                  >
                    <span class="blind">닫기</span>
                  </button>
                  <p>
                    야나두 기업회원 가입 및 로그인에 필요한 기업 전용 정보이며, 회사를 통해 공지되기 때문에 가입안내
                    내용을 확인하시기 바랍니다.
                  </p>
                </div>
              </div>
              <input id="input-code" v-model="signUpData.companyCode" placeholder="기업고유 코드를 입력해주세요." />
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
                  <input id="check-agree-all" type="checkbox" v-model="isAllChecked" @change="toggleAllChecked" />
                  <span class="chk-txt">만 14세 이상이며, 아래 약관에 모두 동의합니다.</span>
                </label>
              </div>
              <div class="agree-box">
                <label for="checkk-agree" class="input-chk chk-md">
                  <input
                    id="checkk-agree"
                    type="checkbox"
                    v-model="signUpData.isTermsAgree"
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
                    v-model="signUpData.isPrivacyProvideAgree"
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
              :disabled="!(isAllChecked && signUpData.isTermsAgree && signUpData.isPrivacyProvideAgree)"
              @click="registerUser"
            >
              가입완료
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="dimmed" @click="closeModal('JoinModal')"></div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import CertificationService from '@/api/auth/CertificationService'
import SignUpService from '@/api/auth/SignUpService'
import countries from '@/assets/countries.json'
import b2bStore from '@/stores/b2bStore'
import type {
  B2BIssueCertificationCodeByNoSignInRequest,
  B2BIssueDisposableJWTResponse,
  B2BVerifyCertificationCodeByNoSignInRequest,
  B2BVerifyCertificationCodeNoSignInResponse
} from '@/types/auth/certification'
import { CertificationMethod } from '@/types/auth/authEnum'
import type { B2BSearchSignUpAdditionalItemResponse, B2BSignUpRequest, B2BSignUpResponse } from '@/types/auth/signUp'
import type { CommonResponse } from '@/types/commonResponse'
import type { ModalState } from '@/types/service/gnb'
import { onMounted, ref } from 'vue'

const store = b2bStore()

onMounted(() => {
  getAdditionalData()
})

function openModal(modalName: keyof ModalState): void {
  store.openModal(modalName)
}

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
  if (modalName === 'JoinModal') {
    clearInterval(timerId.value)
  }
}

const countryList = countries.map((country) => {
  return {
    name: country.name,
    code: country.code
  }
})

const showTooltip = ref<boolean>(false)

const certificationType = ref<CertificationMethod>(CertificationMethod.CELLPHONE)
const certNumber = ref<string>('')
const confirmPassword = ref<string>('')

const additionalData = ref<B2BSearchSignUpAdditionalItemResponse>()

const countryCode = ref<string>('82')
const isAllChecked = ref<boolean>(false)
const isPasswordValid = ref<boolean>(true)
const isConfirmPasswordValid = ref<boolean>(true)
const isNameValid = ref<boolean>(false)
const isUserIdValid = ref<boolean>(true)
const isEmailValid = ref<boolean>(false)
const timeCheck = ref<boolean>(false)

// TODO: check if this is the right way to do this
const validateUserName = () => {
  isNameValid.value = !!signUpData.value.userName
}

const validateUserId = () => {
  const koreanAndSpecialCharsRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|~!@#$%^&*()_+|<>?:{}]/
  if (koreanAndSpecialCharsRegex.test(signUpData.value.userId) || !signUpData.value.userId) {
    isUserIdValid.value = false
  } else {
    isUserIdValid.value = true
  }
}

const validateEmail = () => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  isEmailValid.value = emailRegex.test(signUpData.value.email)
}

//비밀번호 유효성체크 함수
const validatePassword = () => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$/
  isPasswordValid.value = passwordRegex.test(signUpData.value.password)
}

//비밀번호 일치 확인 함수
const validateConfirmPassword = () => {
  isConfirmPasswordValid.value = signUpData.value.password === confirmPassword.value
}

const toggleAllChecked = () => {
  signUpData.value.isTermsAgree = isAllChecked.value
  signUpData.value.isPrivacyProvideAgree = isAllChecked.value
}

const toggleTermsAgree = () => {
  signUpData.value.isTermsAgree = !signUpData.value.isTermsAgree
  isAllChecked.value = !signUpData.value.isTermsAgree
}

const togglePrivacyAgree = () => {
  signUpData.value.isPrivacyProvideAgree = !signUpData.value.isPrivacyProvideAgree
  isAllChecked.value = !signUpData.value.isPrivacyProvideAgree
}

function popupOpen(pageName: string) {
  window.open('/popup/service/' + pageName, '_blank', 'width=500,height=600')
}

// 인증번호 발급 API 호출용 일회성 JWT 발급
async function issuanceNumber() {
  // handleIssue (Issuance of authentication number)
  const token: B2BIssueDisposableJWTResponse = await CertificationService.issueDisposableJWT('yanadoo') // jwt 발급
  const paylod: B2BIssueCertificationCodeByNoSignInRequest = {
    token: token.jwt,
    certificationType: certificationType.value,
    countryCode: countryCode.value,
    cellPhone: signUpData.value.cellPhone,
    email: signUpData.value.email
  }
  // TODO: 리턴값이 void 인데 result 값이 있는지 확인해야 함.
  const result: CommonResponse<void> = await CertificationService.nsiIssueCertificationCode(paylod) // 인증번호 발급
  console.log('리턴값이 void 인데 result 값이 있는지 확인해야 함. ' + result)
  if (result.meta.code === 200) {
    alert('인증번호가 전송되었습니다. 인증번호를 입력해주세요.')
    startCountdown()
    timeCheck.value = true
  }
}

const countdown = ref<number>(300) // 초 단위로 카운트다운을 설정합니다.
const timerId = ref<number>(0)
function startCountdown() {
  clearInterval(timerId.value) // 기존의 타이머를 초기화
  countdown.value = 300 // 카운트다운 초기값 설정
  timerId.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timerId.value)
      countdown.value = 300 // 카운트다운이 끝나면 다시 01:00으로 초기화
      ;(timeCheck.value = false), (signUpData.value.cellPhone = ''), (certNumber.value = '')
    }
  }, 1000)
}

const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value
}

// 회원가입시에 입력할 추가사항 조회
async function getAdditionalData() {
  additionalData.value = await SignUpService.searchSignUpAdditionalItem(store.siteCode)
}

// // 인증번호 인증 (비 로그인용): 서버에 인증번호 전송
async function verifyNumber() {
  // verifyCertification
  const payload: B2BVerifyCertificationCodeByNoSignInRequest = {
    certificationType: certificationType.value,
    countryCode: countryCode.value,
    cellPhone: signUpData.value.cellPhone,
    email: signUpData.value.email,
    certNumber: certNumber.value
  }
  const result: B2BVerifyCertificationCodeNoSignInResponse = await CertificationService.nsiVerifyCertificationCode(
    payload
  )
  if (result.pcc) {
    signUpData.value.pcc = result.pcc
    alert('인증 완료되었습니다.')
    countdown.value = 300
    timeCheck.value = false
  } else {
    alert('인증번호가 일치하지 않습니다.') // TODO: 오류메시지를 뿌려야 하는지 확인필요. 정상동작 하는지 확인해야 함.
  }
}

const signUpData = ref<B2BSignUpRequest>({
  userId: '',
  password: '',
  userName: '',
  countryCode: '82',
  cellPhone: '',
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

// 회원가입
async function registerUser() {
  if (!isNameValid.value) {
    alert('이름을 입력해 주세요.')
  } else if (!isUserIdValid.value) {
    alert('아이디를 입력해 주세요.')
  } else if (!isPasswordValid.value || !isConfirmPasswordValid.value) {
    alert('비밀번호를 확인해 주세요.')
  } else if (!isEmailValid.value) {
    alert('올바른 이메일을 입력해 주세요.')
  } else {
    const result: B2BSignUpResponse = await SignUpService.signUp(signUpData.value)
    if (result) {
      store.userId = result.userId
      store.userName = result.userName
      openModal('JoinComplateModal')
    }
  }
}
</script>

<!-- style -->
<style scoped>
#join {
  z-index: 3;
}
#join .modal-head {
  background: #f7f7fc;
}
#join .form-head {
  padding: 4rem 3.2rem;
  color: #717188;
  border-top: 1px solid #dfdfea;
  background: #f7f7fc;
}
#join .form-head h4 {
  font-size: 2.8rem;
}
#join .form-head h4 + p {
  margin-top: 1rem;
  font-size: 1.6rem;
  letter-spacing: -0.05em;
}
/* #join .form-btn {color:#000;} */
@media screen and (max-width: 1024px) {
  #join .form-head {
    padding: 8.8rem 4.2rem 8rem;
  }
  #join .form-head h4 {
    font-size: 4rem;
  }
  #join .form-head h4 + p {
    margin-top: 1.5rem;
    font-size: 2.4rem;
  }
}
</style>
@/types/auth/authEnum
