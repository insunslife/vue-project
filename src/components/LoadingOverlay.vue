<script setup lang="ts"></script>

<template>
  <div class="loading-wrap">
    <div class="dot-wrap">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <div class="dimmed"></div>
  </div>
</template>

<style scoped>
.loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 10;
}
.dot-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dot {
  position: relative;
  display: inline-block;
  width: 10px;
  height: 11px;
  margin: 0 4px;
  background: #ffb900;
  border-radius: 50%;
  z-index: 1;
}

.dot:nth-of-type(1) {
  animation: wave 1s infinite linear;
}
.dot:nth-of-type(2) {
  animation: wave 1s 0.2s infinite linear;
}
.dot:nth-of-type(3) {
  animation: wave 1s 0.4s infinite linear;
}
.dot:nth-of-type(4) {
  animation: wave 1s 0.6s infinite linear;
}
@keyframes wave {
  0%,
  70%,
  100% {
    transform: translate(0);
  }
  40% {
    transform: translateY(-20px);
  }
}
</style>
