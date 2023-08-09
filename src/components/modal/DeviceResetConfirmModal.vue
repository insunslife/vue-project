<template>
  <div class="modal-wrap">
    <div class="modal-content modal-sm">
      <div class="modal-body">
        <p>학습 기기 초기화 <br />신청이 완료되었습니다.</p>
        <div class="btn-wrap">
          <button @click="closeModal('DeviceResetConfirmModal')">확인</button>
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
.modal-body p {
  font-size: 2.4rem;
  line-height: 1.25;
}
@media screen and (max-width: 1024px) {
  .modal-body p {
    font-size: 3.2rem;
  }
}
</style>
