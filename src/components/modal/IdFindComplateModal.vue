<template>
  <div id="findIdComplate" class="modal-wrap">
    <div class="modal-content">
      <div class="modal-head">
        <button
          type="button"
          class="btn-modal-close"
          @click="closeModal('IdFindComplateModal'), closeModal('IdFindModal')"
        >
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <p class="find-txt">회원님의 아이디 찾기가 완료되었습니다.</p>
        <div class="find-result">
          <strong>{{ store.userId }}</strong>
          <span class="find-date">{{ store.signUpDate }} 가입</span>
        </div>
        <div class="form-button-wrap column">
          <button
            type="button"
            class="form-button"
            @click="closeModal('IdFindComplateModal'), closeModal('IdFindModal')"
          >
            로그인
          </button>
          <button
            type="button"
            class="form-button line"
            @click="closeModal('IdFindComplateModal'), closeModal('IdFindModal'), openModal('PwFindModal')"
          >
            <span>비밀번호 찾기</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import b2bStore from '@/stores/b2bStore'
import type { ModalState } from '@/types/service/gnb'

// TODO: 위 버튼들에 걸려 있는 closeModal 다 필요한 것인지 확인 필요
const store = b2bStore()
// const props = defineProps<{ userId: number; signUpDate: string }>()
// console.log(props.userId, props.signUpDate)
// console.log(store.userId, store.signUpDate)

function openModal(modalName: keyof ModalState): void {
  store.openModal(modalName)
}

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}
</script>

<!-- style -->
<style scoped>
#findIdComplate {
  text-align: center;
  z-index: 3;
}
#findIdComplate .modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 3.2rem 13rem;
  box-sizing: border-box;
}
#findIdComplate .find-txt {
  font-size: 1.8rem;
  color: #717188;
}
#findIdComplate .find-txt::before {
  content: '';
  display: block;
  width: 8rem;
  height: 8rem;
  margin: 0 auto 1.6rem;
  background: url(@/assets/images/ico_complate_240x240.png) no-repeat center / 100%;
}
#findIdComplate .find-result {
  margin-top: 4.8rem;
  padding: 3.2rem;
  background: #f7f7fc;
}
#findIdComplate .find-result strong {
  font-size: 2.8rem;
}
#findIdComplate .find-result .find-date {
  display: block;
  margin-top: 1rem;
  font-size: 1.6rem;
  color: #717188;
}
@media screen and (max-width: 1024px) {
  #findIdComplate .modal-body {
    padding: 0 4.2rem 21rem;
  }
  #findIdComplate .find-txt {
    font-size: 2.8rem;
  }
  #findIdComplate .find-txt::before {
    width: 12.5rem;
    height: 12.5rem;
    margin: 0 auto 3.2rem;
  }
  #findIdComplate .find-result {
    margin-top: 8rem;
    padding: 8rem 0;
  }
  #findIdComplate .find-result strong {
    font-size: 4.8rem;
  }
  #findIdComplate .find-result .find-date {
    margin-top: 1.6rem;
    font-size: 2.4rem;
  }
}
</style>
