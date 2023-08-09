<template>
  <div id="newPw" class="modal-wrap">
    <div class="modal-content">
      <div class="modal-head">
        <h4>새 비밀번호 설정</h4>
        <button
          type="button"
          class="btn-modal-close"
          @click="closeModal('PwFindModal'), closeModal('PwFindChangeModal')"
        >
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <ul>
            <li>
              <strong class="modal-tit">새 비밀번호</strong>
              <input
                v-model="newPassword"
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
                v-model="newPasswordConfirm"
                type="password"
                autocomplete="off"
                placeholder="비밀번호를 다시 입력해 주세요."
                :class="{ error: !isConfirmPasswordValid }"
                @input="validateConfirmPassword"
              />
              <div v-if="!isConfirmPasswordValid" class="form-guide">비밀번호가 일치하지 않습니다.</div>
            </li>
          </ul>
        </form>
        <div class="form-button-wrap">
          <button class="form-button" @click="handlePwChage">비밀번호 변경</button>
        </div>
      </div>
    </div>
    <div class="dimmed" @click="closeModal('PwFindModal'), closeModal('PwFindChangeModal')"></div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import SignInService from '@/api/auth/SignInService'
import b2bStore from '@/stores/b2bStore'
import type { B2BFindLaterChangePasswordRequest } from '@/types/auth/signIn'
import type { ModalState } from '@/types/service/gnb'
import { ref } from 'vue'

const store = b2bStore()

// const props = defineProps<{ cpcc: string }>()

function openModal(modalName: keyof ModalState): void {
  store.openModal(modalName)
}

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

const newPassword = ref<string>('')
const newPasswordConfirm = ref<string>('')
const isPasswordValid = ref<boolean>(true)
const isConfirmPasswordValid = ref<boolean>(true)

async function handlePwChage() {
  if (!newPassword.value) {
    isPasswordValid.value = false
    return
  }

  if (!newPasswordConfirm.value) {
    isConfirmPasswordValid.value = false
    return
  }

  if (newPassword.value !== newPasswordConfirm.value) {
    isConfirmPasswordValid.value = false
    return
  } else {
    isConfirmPasswordValid.value = true
  }

  const payload: B2BFindLaterChangePasswordRequest = {
    cpcc: store.cpcc,
    newPassword: newPassword.value
  }

  const result = await SignInService.findLaterChangePassword(payload)
  if (result.meta.code === 200) {
    openModal('PwChangeComplateModal')
  } else {
    alert(result.meta.message)
  }
}

// 비밀번호 유효성체크 함수
function validatePassword() {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$/
  isPasswordValid.value = passwordRegex.test(newPassword.value)
}

// 비밀번호 일치 확인 함수
function validateConfirmPassword() {
  isConfirmPasswordValid.value = newPassword.value === newPasswordConfirm.value
}
</script>

<!-- style -->
<style scoped>
#newPw {
  z-index: 3;
}
.now-pw {
  display: none;
}
.now-pw-change .now-pw {
  display: block;
}
.myclass-form-button-wrap {
  display: none;
}
.now-pw-change .form-button-wrap {
  display: none;
}
.now-pw-change .form-button-wrap.myclass-form-button-wrap {
  display: flex;
}
</style>
