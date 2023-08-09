<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="notice-list-col">
    <section class="inner-col">
      <HeaderSub :sub-title="'공지사항'" />
      <div class="notice-list-title">
        <strong>{{ noticeDetail?.title }}</strong>
        <span class="date">{{ noticeDetail?.registDate }}</span>
      </div>
      <div
        v-for="noticeAttachFile in noticeAttachFileList"
        :key="noticeAttachFile.serviceNoticeSeq"
        class="notice-list-download"
      >
        <strong>첨부파일</strong>
        <span class="date ellipsis line-clamp-1">{{ noticeAttachFile.attachFileName }}</span>
        <a class="download" @click="attachFileDownload(noticeAttachFile.attachFilePath)">다운로드</a>
      </div>
      <div class="notice-list-content">
        <p v-html="noticeDetail?.contents"></p>
      </div>
      <RouterLink to="/service/NoticeView" class="btn-go-list">목록보기</RouterLink>
    </section>
    <form ref="fileForm" method="post" action="https://api.yanadoo.co.kr/download">
      <input id="filePath" type="hidden" name="filePath" value="" />
    </form>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import NoticeService from '@/api/service/NoticeService'
import HeaderSub from '@/components/common/HeaderSub.vue';
import type { NoticeDetailResponse, ServiceNoticeAttachFileDTO } from '@/types/service/notice'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const serviceNoticeSeq = ref<number>(Number(route.params.serviceNoticeSeq))

onMounted(() => {
  getNoticeDetail()
})

const noticeDetail = ref<NoticeDetailResponse>()
const noticeAttachFileList = ref<ServiceNoticeAttachFileDTO[]>([])

async function getNoticeDetail() {
  const result: NoticeDetailResponse = await NoticeService.getNoticeDetail(serviceNoticeSeq.value)
  noticeDetail.value = result
  noticeAttachFileList.value = result.serviceNoticeAttachFiles
  noticeDetail.value.registDate = noticeDetail.value.registDate.slice(0, 10)
}

const fileForm = ref<HTMLElement | undefined>()
function attachFileDownload(attachFilePath: string | undefined | null) {
  if (!attachFilePath || !fileForm.value) {
    alert('해당파일이 없습니다.')
    return
  }

  const filePathInput = fileForm.value.querySelector('#filePath')
  if (!filePathInput) return
  ;(filePathInput as HTMLInputElement).value = attachFilePath
  if (fileForm.value !== null) {
    ;(fileForm.value as HTMLFormElement).submit()
  }
}
</script>

<!-- style -->
<style scoped>
.notice-list-col {
  padding: 6rem 0 0;
}
.notice-list-col .sub-header {
  display: block;
}
.notice-list-col .sub-header h2 {
  margin-bottom: 1.7rem;
  font-size: 2rem;
}
.notice-list-col .notice-list-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  padding: 0 5rem;
  border-top: 0.3rem solid #000;
}
.notice-list-col .notice-list-title strong {
  font-size: 1.8rem;
}
.notice-list-col .notice-list-title .date {
  font-size: 1.4rem;
  color: #a0a0b6;
}
.notice-list-col .notice-list-download {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 4.8rem;
  padding-right: 5rem;
  font-size: 1.4rem;
  color: #28284b;
  background-color: #f7f7fc;
}
.notice-list-col .notice-list-download .date {
  margin-left: 0.9rem;
}
.notice-list-col .notice-list-download .download {
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 1.5rem;
  background: url(@/assets/images/ico_pc_notice_list_download_18x18.png) center/1.8rem 1.8rem no-repeat;
  text-indent: -9999em;
}
.notice-list-col .notice-list-title + .notice-list-content {
  border-top: 0.1rem solid #dfdfea;
}
.notice-list-content {
  margin-bottom: 5rem;
  padding: 3rem 5rem;
  border-bottom: 0.1rem solid #b7b7c8;
}
.notice-list-content p {
  font-size: 1.6rem;
  line-height: 2.2rem;
}
.notice-list-col .btn-go-list {
  display: block;
  width: 27rem;
  height: 6.8rem;
  margin: 0 auto 13.7rem;
  font-size: 2rem;
  border: 0.1rem solid #cfcfda;
  line-height: 6.8rem;
  text-align: center;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media screen and (max-width: 1024px) {
  .notice-list-col {
    padding: 0;
  }
  .notice-list-col .sub-header h2 {
    display: inline-block;
    margin-bottom: 0;
    font-size: 2.8rem;
  }
  .notice-list-col .notice-list-title {
    align-items: flex-start;
    flex-direction: column-reverse;
    justify-content: center;
    height: 19.8rem;
    padding: 0 5.2rem;
    border-top: 0;
  }
  .notice-list-col .notice-list-title .date {
    margin-bottom: 1.99rem;
    font-size: 2.3rem;
  }
  .notice-list-col .notice-list-title strong {
    font-size: 4rem;
  }
  .notice-list-col .notice-list-download {
    justify-content: space-between;
    height: 10.6rem;
    padding: 0 5.2rem;
    font-size: 2.7rem;
    border-top: 0.1rem solid #dfdfea;
  }
  .notice-list-col .notice-list-download strong {
    display: none;
  }
  .notice-list-col .notice-list-download .date {
    display: inline-block;
    max-width: calc(100% - 5.6rem);
    margin-left: 0;
  }
  .notice-list-col .notice-list-download .download {
    width: 4.6rem;
    height: 3.5rem;
    margin-left: 0;
    background: url(../../../../html/images/ico_mo_notice_list_download_46x35.png) center/4.6rem 3.5rem no-repeat;
  }
  .notice-list-content {
    margin-bottom: 0;
    padding: 4.7rem 4.2rem 8.7rem;
    border: 0;
  }
  .notice-list-content p {
    font-size: 2.8rem;
    line-height: 3.4rem;
  }
  .notice-list-col .btn-go-list {
    display: none;
  }
}
</style>
