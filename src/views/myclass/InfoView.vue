<template>
  <section class="my-page-col bg-white-col">
    <section class="inner-col">
      <div class="lnb-wrap">
        <MyClassLnb />
        <section class="inquiry-content">
          <HeaderSub :sub-title="'회원정보 수정 및 학습기기 관리'" />
          <div class="device-edit">
            <div class="info">
              <p>정보 보호를 위해<em class="display-m"></em> <strong>휴대전화 인증</strong>을 다시 확인합니다.</p>
              <ul>
                <li>등록된 휴대폰번호로만 인증이 가능합니다.</li>
                <li>
                  휴대전화 번호가 변경된 경우 혹은 인증에 실패하는 경우 야나두 고객센터 1600-0563으로 문의주시길
                  바랍니다.
                </li>
              </ul>
            </div>
            <div class="device-edit-form">
              <dl class="phone-box">
                <dt>휴대폰 번호</dt>
                <dd>
                  <select id="countryCode" class="get-country" v-model="countryCode" name="category">
                    <option v-for="country in countryList" :key="country.code" :value="country.code">
                      {{ country.name }}
                    </option>
                  </select>
                  <input
                    v-model="cellPhone"
                    type="text"
                    maxlength="14"
                    placeholder="번호를 입력해주세요."
                    name="cellPhone"
                    @keydown.enter="onEnterKey('siIssueCertificationCode')"
                  />
                  <button
                    type="button"
                    class="btn btn-certified-code"
                    :disabled="!cellPhone || isCertifiedCodeBtnDisabled"
                    @click="siIssueCertificationCode"
                  >
                    인증요청
                  </button>
                </dd>
              </dl>
              <dl class="certified-box">
                <dt>인증번호</dt>
                <dd>
                  <span v-if="timeCheck == true && hasMatchingUserInfo" class="timer">{{ formatTime(countdown) }}</span>
                  <input
                    v-model="certNumber"
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    name="certNumber"
                    @input="checkCertificationCodeValue"
                    @keydown.enter="onEnterKey('siVerifyCertificationCode')"
                  />
                  <button
                    type="button"
                    class="btn btn-certified-code"
                    :disabled="!certNumber"
                    @click="siVerifyCertificationCode"
                  >
                    인증
                  </button>
                </dd>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </section>
    <Teleport to="#modals">
      <InquiryConfirmModal v-if="store.state.JoinComplateModal == true" />
    </Teleport>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import CertificationService from '@/api/auth/CertificationService'
import countries from '@/assets/countries.json'
import HeaderSub from '@/components/common/HeaderSub.vue'
import MyClassLnb from '@/components/common/MyClassLnb.vue'
import InquiryConfirmModal from '@/components/modal/InquiryConfirmModal.vue'
import { useStore } from '@/stores/b2bStore'
import type {
  B2BIssueCertificationCodeBySignInRequest,
  B2BVerifyCertificationCodeBySignInRequest,
  B2BVerifyCertificationCodeBySignInResponse
} from '@/types/auth/certification'
import { CertificationMethod } from '@/types/auth/authEnum'
import type { ModalState } from '@/types/service/gnb'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const countryList = countries.map((country) => {
  return {
    code: country.code,
    name: country.name
  }
})

const cellPhone = ref<string>('')
const countryCode = ref<string>('82')
// const certificationType = ref<string>('CELLPHONE')
const certNumber = ref<string>('')
const countdown = ref<number>(300) // 초 단위로 카운트다운을 설정합니다.
const timerId = ref<number | null>(null)
const timeCheck = ref<boolean>(false)
const isCertifiedCodeBtnDisabled = ref<boolean>(false)
const isConfirmBtnDisabled = ref<boolean>(true)
const hasMatchingUserInfo = ref<boolean>(true)
const certifiedIn = ref<boolean>(false)

function onEnterKey(action: string) {
  if (action === 'siIssueCertificationCode') {
    siIssueCertificationCode()
  } else if (action === 'siVerifyCertificationCode') {
    siVerifyCertificationCode()
  }
}
// 인증번호 발급 (로그인) requestCertificationCode
async function siIssueCertificationCode() {
  const payload: B2BIssueCertificationCodeBySignInRequest = {
    certificationType: CertificationMethod.CELLPHONE, // 인증 방법 CELLPHONE or EMAIL
    countryCode: countryCode.value, // 국가코드 (82가 기본값)
    cellPhone: cellPhone.value // 핸드폰번호
    // email?:  // 이메일
  }
  const result = await CertificationService.siIssueCertificationCode(payload)
  if (result.meta.code === 200) {
    alert('인증번호가 전송되었습니다. 인증번호를 입력해주세요.')
    startCountdown()
    timeCheck.value = true
    hasMatchingUserInfo.value = true
  } else {
    alert('인증번호 발급에 실패하였습니다.')
    // openModal('complateModal');
    clearInterval(timerId.value!)
    timeCheck.value = false
    cellPhone.value = ''
  }
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60) // 분 계산
  const remainingSeconds = seconds % 60 // 초 계산
  const formattedMinutes = String(minutes).padStart(2, '0') // 분을 2자리 숫자로 포맷팅
  const formattedSeconds = String(remainingSeconds).padStart(2, '0') // 초를 2자리 숫자로 포맷팅
  return `${formattedMinutes}:${formattedSeconds}`
}

function startCountdown() {
  clearInterval(Number(timerId.value)) // 기존의 타이머를 초기화
  countdown.value = 300 // 카운트다운 초기값 설정
  timerId.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(Number(timerId.value))
      countdown.value = 300 // 카운트다운이 끝나면 다시 01:00으로 초기화
      timeCheck.value = false
      cellPhone.value = ''
      certNumber.value = ''
      // alert('인증번호가 만료되었습니다. 다시 인증해주세요.');
    }
  }, 1000)
}
function checkCertificationCodeValue() {
  if (certNumber.value && !timeCheck.value) {
    isConfirmBtnDisabled.value = false // 인증 버튼 활성화
  } else {
    isConfirmBtnDisabled.value = true // 인증 버튼 비활성화
  }
}

// 인증번호 인증 (로그인) confirmCertificationCode
async function siVerifyCertificationCode() {
  const payload: B2BVerifyCertificationCodeBySignInRequest = {
    certificationType: CertificationMethod.CELLPHONE, // 인증 방법 CELLPHONE or EMAIL
    // countryCode?: string, // 국가코드 (82가 기본값)
    cellPhone: cellPhone.value, // 핸드폰번호
    // email?: string, // 이메일
    certNumber: certNumber.value // 인증번호
  }
  const result: B2BVerifyCertificationCodeBySignInResponse = await CertificationService.siVerifyCertificationCode(
    payload
  )
  if (result.pcc) {
    certifiedIn.value = true
    store.certifiedIn = true
    alert('휴대폰 번호가 인증되었습니다.')
    router.push('/myclass/InfoEditView')
    if (cellPhone.value) {
      hasMatchingUserInfo.value = false
    }
  } else {
    alert('인증번호가 일치하지 않습니다. 다시 시도해주세요.')
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function openModal(modalName: keyof ModalState): void {
  store.openModal(modalName)
}
</script>

<!-- style -->
<style scoped>
.certified-box dd {
  position: relative;
}
.certified-box dd .timer {
  position: absolute;
  top: 50%;
  right: 10.6rem;
  font-size: 1.6rem;
  color: #ff5647;
  transform: translateY(-50%);
}
.certified-box dd .timer + input {
  padding-right: 4.5rem;
}
@media screen and (max-width: 1024px) {
  .certified-box dd .timer {
    font-size: 2.8rem;
    right: 19rem;
  }
  .certified-box dd .timer + input {
    padding-right: 8.5rem;
  }
}
</style>
