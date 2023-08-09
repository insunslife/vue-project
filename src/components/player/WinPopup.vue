<template>
  <div></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 윈도우 팝업 변수
const windowRef = ref<Window | null>(null)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function openWinPopup(uri: string, target: string, features: string, paramObject: object | null = null) {
  if (paramObject) {
    localStorage.setItem(target, JSON.stringify(paramObject))
  }

  if (windowRef.value != null) {
    closeWinPopup()
  }

  // 윈도우 팝업 오픈
  windowRef.value = window.open(uri, target, features)
}

function closeWinPopup() {
  if (windowRef.value != null) {
    windowRef.value.close()
    windowRef.value = null
  }
}
</script>

<!-- style -->
<style scoped></style>
