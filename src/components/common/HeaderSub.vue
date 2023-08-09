<!-- template -->
<template>
  <div class="sub-header">
    <button type="button" class="btn-back" @click="router.go(-1)">
      <span class="blind">뒤로가기</span>
    </button>
    <h2>
      <span>{{ subTitle }}</span>
      <button
        v-if="subTitle === '수강신청 클래스'"
        :class="['tooltip', 'display-pc', { on: active }]"
        @click="handleToggleActive"
      ></button>
    </h2>
    <!-- <span v-if="subTitle === '수강중인 클래스' || subTitle === '수강신청 클래스' || subTitle === '수강이력' || !noClasses" class="sub-text display-pc">
      야나두 학습 앱 전용 상품 이용자의 학습 편의 향상을 위해 PC에서 동영상 강의 수강을 지원하고 있습니다.
    </span> -->
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import router from "@/router/index";
import { useRouter } from 'vue-router'

const router = useRouter()
const active = ref(false)
defineProps<{
  subTitle: string
}>()
const emits = defineEmits(['toggleActive'])

const handleClickOutside = () => (event: HTMLElement) => {
  if (!event.closest('.tooltip')) {
    active.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

const handleToggleActive = () => {
  active.value = !active.value
  emits('toggleActive', active.value)
}
</script>


<!-- style -->
<style scoped>
.sub-header h2 {
  margin-bottom: 1.7rem;
  font-size: 2rem;
}
@media screen and (max-width: 1024px) {
  .sub-header h2 {
    margin-bottom: 0;
    font-size: 2.8rem;
  }
}
</style>
