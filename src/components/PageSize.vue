<template>
  <select v-model="pageSize" @change="storeList()">
    <option v-for="page in pageSizeOption" :key="page">{{ page }}</option>
  </select>
</template>

<!-- script -->
<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['updatePageSize'])

const pageSize = ref<string>('10개')
const pageSizeOption = ref<string[]>(['10개', '20개', '30개', '50개', '100개'])

// 페이지 크기 변경 시 부모 컴포넌트에게 이벤트 전달
function storeList() {
  const updatedSize = size(pageSize.value)
  emit('updatePageSize', updatedSize)
}

function size(pageSize: string) {
  switch (pageSize) {
    case '10개':
      return 10
    case '20개':
      return 20
    case '30개':
      return 30
    case '40개':
      return 40
    case '50개':
      return 50
    case '100개':
      return 100
    default:
      return 10
  }
}
</script>

<!-- style -->
<style>
.select-wrap select {
  width: 10rem;
  height: 4rem;
  padding: 0 2.4rem;
  margin-left: 1.5rem;
  font-size: 1.4rem;
  color: #28284b;
  border: 1px solid #e7e7f0;
  border-radius: 10em;
  background: url(@/assets/images/ico_pc_arrowdown_48x48navy.png) no-repeat 75% center / 1.6rem;
}
@media screen and (max-width: 1024px) {
  .select-wrap select {
    width: auto;
    padding: 0 3.2rem 0 0;
    color: #717188;
    font-size: 2.4rem;
    text-align: right;
    border: none;
    background-size: 2.4rem;
    background-position-x: 100%;
  }
}
</style>
