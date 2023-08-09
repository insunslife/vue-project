<template>
  <div id="complateModal" class="modal-wrap">
    <div class="modal-content modal-sm">
      <div class="modal-body">
        <strong>{{ store.userName }}님의<br />회원가입을 축하합니다.</strong>
        <span>ID : {{ store.userId }}</span>
        <div class="btn-wrap">
          <!-- <button @click="closeModal('JoinComplate')">로그인하기</button> -->
          <button @click="hanldeCheck">로그인하기</button>
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
import { useRoute, useRouter } from 'vue-router'

const store = b2bStore()
const route = useRoute()
const router = useRouter()

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}

function hanldeCheck() {
  const siteCode = store.siteCode
  if (route.path.includes(`${siteCode}/overseas/sign-up`)) {
    const newPath = route.path.replace(`${siteCode}/overseas/sign-up`, `${siteCode}/sign-in`)
    router.push(newPath)
    closeModal('JoinComplateModal')
  } else {
    closeModal('JoinComplateModal'), closeModal('JoinModal')
    router.push(`/${siteCode}/sign-in`)
  }
}
</script>

<!-- style -->
<style scoped>
#complateModal {
  z-index: 3;
}
#complateModal strong {
  font-size: 2.8rem;
  line-height: 1.47;
}
#complateModal strong + span {
  display: block;
  margin-top: 1.6rem;
  font-size: 2.4rem;
  color: #717188;
}
@media screen and (max-width: 1024px) {
  #complateModal strong {
    font-size: 3.8rem;
  }
  #complateModal strong + span {
    margin-top: 1.6rem;
    font-size: 3.2rem;
  }
}
</style>
