<template>
  <div class="top-banner">
    <div class="inner-col">
      <router-link :to="`/service//NoticeDetailView/${props.fixedNotice.serviceNoticeSeq}`">{{
        fixedNotice.title
      }}</router-link>
      <button type="button" class="btn-top-close" @click="$emit('topbanner-close')">
        <span class="blind">닫기</span>
      </button>
    </div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
const props = defineProps<{
  fixedNotice: {
    serviceNoticeSeq: number
    title: string
  }
}>()

// defineEmits(['topbanner-close'])
</script>

<!-- style -->
<style scoped>
.top-banner {
  padding: 1.4rem;
  background: #6ca7ff;
}
.top-banner a {
  display: block;
  padding-right: 7rem;
  font-size: 1.4rem;
  color: #fff;
}
.top-banner a::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1.4rem;
  background: url(@/assets/images/ico_pc_notice_72x72white.png) no-repeat center / 100%;
}
.top-banner .btn-top-close {
  position: absolute;
  top: 0;
  right: 2.2rem;
  width: 2.4rem;
  height: 2.4rem;
  background: url(@/assets/images/ico_pc_arrow_close_72x72white.png) no-repeat center / 100%;
  z-index: 1;
}

@media screen and (max-width: 1024px) {
  .top-banner {
    padding: 2.5rem 0;
  }
  .top-banner a {
    padding-left: 5rem;
    font-size: 2.4rem;
  }
  .top-banner a::before {
    width: 3.2rem;
    height: 3.2rem;
  }
  .top-banner .btn-top-close {
    right: 3.4rem;
    width: 3.2rem;
    height: 3.2rem;
  }
}
</style>
