<template>
  <div id="myclassQrcode" class="modal-wrap qrcode-popup">
    <div class="modal-content">
      <div class="modal-body">
        <div class="class-qrcode display-pc">
          <img src="@/assets/images/img_qrcode.png" alt="qrcode" />
        </div>
        <p class="modal-txt">
          야나두 학습 앱에서<br />
          편리하게 수강하실 수 있습니다.
        </p>
        <span class="sub-txt">앱에서만 제공하는 다양한 학습 서비스를 이용해보세요.</span>
        <a target="_blank" class="form-btn btn-block" @click="getAppLink()">편하게 앱으로 수강하기</a>
        <a class="btn-go-web" @click="closeModal('MyClassQRCodeModal')">불편하지만 웹으로 볼게요.</a>
      </div>
    </div>
    <div class="dimmed" @click="closeModal('MyClassQRCodeModal')"></div>
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

function getAppLink() {
  const userAgent = navigator.userAgent.toLowerCase()

  // Android 기기일 때 && Chrome 브라우저일 때
  if (userAgent.includes('android') || userAgent.includes('chrome')) {
    window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.yanadoo.app2'
  }

  // iOS 기기일 때 && Safari 브라우저일 때
  if (
    (userAgent.includes('iphone') || userAgent.includes('ipad')) &&
    userAgent.includes('safari') &&
    !userAgent.includes('chrome')
  ) {
    window.location.href = 'https://apps.apple.com/kr/app/id1539582420'
  }
}
</script>
