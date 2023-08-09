<template>
  <div id="complateModal" class="modal-wrap">
    <div class="modal-content modal-sm">
      <div class="modal-body">
        <p>
          비밀번호가 변경되었습니다.<br />
          다시 로그인해주세요!
        </p>
        <div class="btn-wrap">
          <button @click="closeModal('PwChangeComplateModal'), closeModal('PwFindChangeModal'), closeModal('PwFindModal')">
            확인
          </button>
        </div>
      </div>
    </div>
    <div class="dimmed"></div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import b2bStore from '@/stores/b2bStore'
import type { ModalState } from '@/types/service/gnb'

const store = b2bStore()

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}
</script>

<!-- style -->
<style scoped>
#complateModal {
  z-index: 3;
}
#complateModal p {
  font-size: 2.4rem;
  line-height: 1.25;
}
@media screen and (max-width: 1024px) {
  #complateModal p {
    font-size: 3.2rem;
  }
}
</style>
