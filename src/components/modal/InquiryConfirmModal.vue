<template>
  <div id="complateModal" class="modal-wrap">
    <div class="modal-content modal-sm">
      <div class="modal-body">
        <p>회원정보의 전화번호가 <br />일치하지 않습니다.</p>
        <div class="btn-wrap">
          <button @click="closeModal('InquiryConfirmModal')">확인</button>
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
