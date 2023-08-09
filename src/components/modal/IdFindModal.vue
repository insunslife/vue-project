<template>
  <div id="findId" class="modal-wrap">
    <div class="modal-content">
      <div class="modal-head">
        <h4>ID 찾기</h4>
        <button type="button" class="btn-modal-close" @click="closeModal('IdFindModal')">
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <span class="essential guide">필수 입력 항목</span>
          <ul>
            <li>
              <strong class="modal-tit essential">이름</strong>
              <input v-model="userName" type="text" placeholder="이름을 입력해 주세요." />
            </li>
            <li>
              <div class="form-tit">
                <label class="modal-tit essential" for="input-code">기업고유코드</label>
                <button
                  id="tip02"
                  type="button"
                  class="btn-tip"
                  onclick="document.querySelector('#tip02').classList.toggle('active');"
                >
                  <span class="blind">도움말</span>
                </button>
                <div class="tip-box">
                  <button
                    type="button"
                    class="btn-tip-close"
                    onclick="document.querySelector('#tip02').classList.remove('active');"
                  >
                    <span class="blind">닫기</span>
                  </button>
                  <p>
                    야나두 기업회원 가입 및 로그인에 필요한 기업 전용 정보이며, 회사를 통해 공지되기 때문에 가입안내
                    내용을 확인하시기 바랍니다.
                  </p>
                </div>
              </div>
              <input id="input-code" v-model="companyCode" placeholder="기업고유코드를 입력해주세요." />
            </li>
            <li>
              <div class="form-style-half">
                <label for="radio-md" class="input-chk radio-md">
                  <input id="radio-md" v-model="certificationType" value="CELLPHONE" type="radio" name="radio-test" />
                  <span class="chk-txt">휴대전화로 인증</span>
                </label>
                <label for="radio-md2" class="input-chk radio-md">
                  <input id="radio-md2" v-model="certificationType" value="EMAIL" type="radio" name="radio-test" />
                  <span class="chk-txt">이메일로 인증</span>
                </label>
              </div>
            </li>
            <li v-if="certificationType === CertificationMethod.CELLPHONE">
              <label for="category" class="modal-tit">휴대전화</label>
              <select id="category" v-model="countryCode" name="category">
                <option v-for="country in countryList" :key="country.code" :value="country.code">
                  {{ country.name }}
                </option>
              </select>
            </li>
            <li v-if="certificationType === CertificationMethod.CELLPHONE">
              <div class="form-style02 error">
                <div class="input-wrap">
                  <input v-model="cellPhone" type="text" placeholder="휴대전화번호를 입력해주세요." />
                </div>
                <button type="button" class="form-btn" :disabled="!cellPhone" @click="issuanceNumber">인증요청</button>
              </div>
            </li>
            <li v-if="certificationType === CertificationMethod.CELLPHONE">
              <label for="find-cellphone" class="modal-tit">인증번호</label>
              <div class="form-style02">
                <div class="input-wrap">
                  <span v-if="timeCheck == true" class="timer">{{ store.formatTime(countdown) }}</span>
                  <input id="find-cellphone" v-model="certNumber" type="text" placeholder="인증번호를 입력해주세요." />
                </div>
                <button type="button" class="form-btn" :disabled="!certNumber" @click="verifyNumber">인증</button>
              </div>
            </li>
            <li v-if="certificationType === CertificationMethod.EMAIL">
              <label for="find-email" class="modal-tit">이메일 주소</label>
              <div class="form-style02">
                <div class="input-wrap">
                  <input v-model="email" type="text" placeholder="이메일 주소를 입력해주세요." />
                </div>
                <button type="button" class="form-btn" :disabled="!email" @click="issuanceNumber">인증요청</button>
              </div>
            </li>
            <li v-if="certificationType === CertificationMethod.EMAIL">
              <label for="find-email" class="modal-tit">인증번호</label>
              <div class="form-style02">
                <div class="input-wrap">
                  <span v-if="timeCheck == true" class="timer">{{ store.formatTime(countdown) }}</span>
                  <input id="find-email" v-model="certNumber" type="text" placeholder="인증번호를 입력해주세요." />
                </div>
                <button type="button" class="form-btn" :disabled="!certNumber" @click="verifyNumber">인증</button>
              </div>
            </li>
          </ul>
          <div class="form-button-wrap">
            <button type="button" class="form-button" @click="findUserId">ID찾기</button>
          </div>
        </form>
      </div>
    </div>
    <div class="dimmed" @click="closeModal('IdFindModal')"></div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import countries from '@/assets/countries.json'
import b2bStore from '@/stores/b2bStore'
import type { ModalState } from '@/types/service/gnb'
import { ref } from 'vue'
import CertificationService from '@/api/auth/CertificationService'
import SignInService from '@/api/auth/SignInService'
import type {
  B2BIssueCertificationCodeByNoSignInRequest,
  B2BVerifyCertificationCodeByNoSignInRequest,
  B2BVerifyCertificationCodeNoSignInResponse
} from '@/types/auth/certification'
import type { B2BFindUserIdResponse, B2BFindUserIdRequest } from '@/types/auth/signIn'
import { CertificationMethod } from '@/types/auth/authEnum'

import type { B2BIssueDisposableJWTResponse } from '@/types/auth/certification'
import type { CommonResponse } from '@/types/commonResponse'

const store = b2bStore()
// const props = defineProps<{ userId: number; signUpDate: string }>()

const countryList = countries.map((country) => {
  return {
    code: country.code,
    name: country.name
  }
})

console.log('### IdFindModal store', store.state.IdFindModal.toString())

const pcc = ref<string>('')
const userName = ref<string>('')
const certNumber = ref<string>('')
const countdown = ref<number>(300) // 초 단위로 카운트다운을 설정합니다.
const timerId = ref<number>(0)
const timeCheck = ref<boolean>(false)

// console.log(props.userId, props.signUpDate)
// console.log(store.userId, store.signUpDate)

function openModal(modalName: keyof ModalState): void {
  store.openModal(modalName)
}

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

const certificationType = ref<CertificationMethod>(CertificationMethod.CELLPHONE)
console.log('### IdFindModal certificationType 1 ', certificationType.value)
console.log('### IdFindModal certificationType 2 ', CertificationMethod.CELLPHONE)

const countryCode = ref<string>('82')
const cellPhone = ref<string>('')
const email = ref<string>('')

// 인증번호 발급 API 호출용 일회성 JWT 발급
async function issuanceNumber() {
  // handleIssue (Issuance of authentication number)
  const token: B2BIssueDisposableJWTResponse = await CertificationService.issueDisposableJWT('yanadoo') // jwt 발급
  const paylod: B2BIssueCertificationCodeByNoSignInRequest = {
    token: token.jwt,
    certificationType: certificationType.value,
    countryCode: countryCode.value,
    cellPhone: cellPhone.value,
    email: email.value
  }
  // TODO: 리턴값이 void 인데 result 값이 있는지 확인해야 함.
  const result: CommonResponse<void> = await CertificationService.nsiIssueCertificationCode(paylod) // 인증번호 발급
  console.log('리턴값이 void 인데 result 값이 있는지 확인해야 함. ' + result)
  console.log('### IdFindModal result.meta.code', result.meta.code)
  console.log('### IdFindModal result.meta.message', result.meta.message)
  if (result.meta.code === 200) {
    alert('인증번호가 전송되었습니다. 인증번호를 입력해주세요.')
    startCountdown()
    timeCheck.value = true
  }
}

function startCountdown() {
  clearInterval(timerId.value) // 기존의 타이머를 초기화
  countdown.value = 300 // 카운트다운 초기값 설정
  timerId.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timerId.value)
      countdown.value = 300 // 카운트다운이 끝나면 다시 01:00으로 초기화
      ;(timeCheck.value = false), (cellPhone.value = ''), (certNumber.value = '')
    }
  }, 1000)
}

// // 인증번호 인증 (비 로그인용): 서버에 인증번호 전송
async function verifyNumber() {
  // verifyCertification
  const payload: B2BVerifyCertificationCodeByNoSignInRequest = {
    certificationType: certificationType.value,
    countryCode: countryCode.value,
    cellPhone: cellPhone.value,
    email: email.value,
    certNumber: certNumber.value
  }
  const result: B2BVerifyCertificationCodeNoSignInResponse = await CertificationService.nsiVerifyCertificationCode(
    payload
  )
  if (result.pcc) {
    pcc.value = result.pcc
    alert('인증 완료되었습니다.')
    countdown.value = 300
    timeCheck.value = false
  } else {
    alert('인증번호가 일치하지 않습니다.') // TODO: 오류메시지를 뿌려야 하는지 확인필요. 정상동작 하는지 확인해야 함.
  }
}

const companyCode = ref<string>('')
// ID 찾기
async function findUserId() {
  const payload: B2BFindUserIdRequest = {
    userName: userName.value,
    certificationType: certificationType.value,
    countryCode: countryCode.value,
    cellPhone: certificationType.value === CertificationMethod.CELLPHONE ? cellPhone.value : undefined,
    email: certificationType.value === CertificationMethod.EMAIL ? email.value : undefined,
    companyCode: companyCode.value,
    pcc: pcc.value
  }
  console.log('### IdFindModal payload', payload)
  const result: B2BFindUserIdResponse = await SignInService.findUserId(payload)
  if (result) {
    store.userId = result.userId
    store.signUpDate = result.signUpDate
    alert('아이디 찾기가 완료되었습니다.')
    closeModal('IdFindModal')
    openModal('IdFindComplateModal')
  } else {
    alert('아이디 찾기에 실패하였습니다.')
  }
}
</script>

<!-- style -->
<style scoped>
#findId {
  z-index: 3;
}
</style>
@/types/auth/authEnum.js
