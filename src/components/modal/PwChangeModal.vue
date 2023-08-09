<template>
  <div id="newPw" class="modal-wrap">
    <div class="modal-content">
      <div class="modal-head">
        <h4>새 비밀번호 설정</h4>
        <button type="button" class="btn-modal-close" @click="closeModal('PwChangeModal')">
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <form :class="NowPwSet">
          <ul>
            <li class="now-pw">
              <strong class="modal-tit">현재 비밀번호</strong>
              <input
                v-model="nowPassword"
                type="password"
                autocomplete="off"
                placeholder="영문, 숫자, 특수문자 (‘”,.<>제외) 8~12자"
                :class="{ error: !isNowPasswordValid }"
              />
              <span v-if="!isNowPasswordValid" class="form-guide">현재 사용하는 비밀번호가 일치하지 않습니다.</span>
            </li>
            <li>
              <strong class="modal-tit">새 비밀번호</strong>
              <input
                v-model="newPassword"
                type="password"
                autocomplete="off"
                placeholder="영문, 숫자, 특수문자 (‘”,.<>제외) 8~12자"
                :class="{ error: !isNewPasswordValid && newPassword !== '' }"
                @input="validateNewPassword"
              />
              <span v-if="!isNewPasswordValid && newPassword !== ''" class="form-guide">
                영문, 숫자, 특수문자를 포함한 8~12자의 비밀번호를 입력해주세요.
              </span>
            </li>
            <li>
              <strong class="modal-tit">비밀번호 확인</strong>
              <input
                v-model="confirmPassword"
                :class="{ error: !isPasswordMatch }"
                type="password"
                autocomplete="off"
                placeholder="비밀번호를 다시 입력해 주세요."
                @input="validatePasswordMatch"
              />
              <span v-if="!isPasswordMatch && confirmPassword !== ''" class="form-guide"
                >입력된 비밀번호가 일치하지 않습니다.</span
              >
            </li>
          </ul>
        </form>

        <div class="form-button-wrap myclass-form-button-wrap">
          <button type="button" class="form-button" @click="handleConfirmation">비밀번호 변경</button>
        </div>
      </div>
    </div>
    <div class="dimmed" @click="closeModal('PwFindModal'), closeModal('PwFindChangeModal')"></div>
  </div>
</template>

<script setup lang="ts">
import UserService from '@/api/auth/UserService'
import b2bStore from '@/stores/b2bStore'
import type { B2BModifyPasswordRequest } from '@/types/auth/user'
import type { ModalState } from '@/types/service/gnb'
import { ref } from 'vue'

const store = b2bStore()

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

const NowPwSet = ref<string>('now-pw-change') // TODO: 이거 어떻게 해야할지 모르겠음
// props: ['NowPwSet'],
// const props = defineProps<{ NowPwSet: any }>()

const newPassword = ref<string>('')
const nowPassword = ref<string>('')
const confirmPassword = ref<string>('')
const isNowPasswordValid = ref<boolean>(true)
const isNewPasswordValid = ref<boolean>(true)
const isPasswordMatch = ref<boolean>(true)
const showSuccessAlert = ref<boolean>(false)
const confirmPasswordError = ref<string>('')

async function handleConfirmation() {
  // modifyPassword
  if (isNowPasswordValid.value) {
    // 현재 비밀번호가 일치하는 경우에만 확인 처리를 합니다.
    if (newPassword.value === confirmPassword.value) {
      const payload: B2BModifyPasswordRequest = {
        nowPassword: nowPassword.value, // 현재 비밀번호
        newPassword: newPassword.value // 변경할 비밀번호
      }
      const result = await UserService.modifyPassword(payload)
      if (result.meta.code === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.')
        showSuccessAlert.value = false
        closeModal('PwChangeModal')
      } else {
        alert('오류가 발생했습니다. 비밀번호를 변경할 수 없습니다.')
        // alert('현재 사용하는 비밀번호가 일치하지 않습니다.')
      }
    } else {
      alert('입력된 비밀번호가 일치하지 않습니다.')
    }
  } else {
    alert('현재 사용하는 비밀번호가 일치하지 않습니다.')
  }
}

function validatePasswordMatch() {
  isPasswordMatch.value = newPassword.value === confirmPassword.value
  confirmPasswordError.value = isPasswordMatch.value ? '' : '입력된 비밀번호가 일치하지 않습니다.'
}

function isValidPassword(password: string) {
  const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/
  return pattern.test(password)
}

function validateNewPassword() {
  isNewPasswordValid.value = isValidPassword(newPassword.value)
}
</script>

<!-- style -->
<style scoped>
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
