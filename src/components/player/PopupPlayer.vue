<template>
  <div class="content">
    <div v-show="isLoading" id="loadingArea" class="loading_area">
      <img src="https://english.yanadoocdn.com/upload/yanadoo/pc/common/img/img_loading.gif" alt="loading" />
    </div>
    <div id="wrap">
      <div id="head" class="headTilte">
        <h1>
          <span id="className" class="className">{{ className }}</span>
          <span id="classDate" class="classDate"> (수강 기간 : {{ beginDate }} ~ {{ closeDate }})</span>
        </h1>
      </div>
      <div id="container">
        <div class="movieArea">
          <iframe
            id="kollusPlayer"
            ref="player"
            width="773"
            height="435"
            marginwidth="0"
            marginheight="0"
            frameborder="0"
            scrolling="no"
            allowfullscreen
            webkitallowfullscreen
            mozallowfullscreen
          ></iframe>
        </div>
        <div class="movieList">
          <div class="mLlist">
            <ul v-for="lectureItem in lectures" :key="lectureItem.lectureSeq" :lectureSeq="lectureItem.lectureSeq">
              <li>
                <ul>
                  <li class="thtit lectureTitle">[{{ lectureItem.sortOrder }}강] {{ lectureItem.title }}</li>
                  <li class="completeYn" :class="{ active: lectureItem.mediaCompleteYn == 'Y' }"></li>
                </ul>
                <ul>
                  <li
                    v-for="mediaAssetItem in lectureItem.mediaAssets"
                    :key="mediaAssetItem.curriculumAssetSeq"
                    :curriculumAssetSeq="mediaAssetItem.curriculumAssetSeq"
                    class="asset"
                  >
                    <a
                      class="assetMediaBtn"
                      href="javascript:void(0)"
                      target="_top"
                      @click="
                        playKollus(
                          lectureItem.lectureSeq,
                          mediaAssetItem.curriculumAssetSeq,
                          mediaAssetItem.mediaContentKey,
                          lectureItem.attachFiles
                        )
                      "
                    >
                      <span
                        class="play_span asset_span"
                        :class="{
                          active: mediaAssetItem.curriculumAssetSeq == playCurriculumAssetSeq
                        }"
                      ></span>
                    </a>
                    <span
                      class="duration_span asset_span"
                      :class="{
                        active: mediaAssetItem.curriculumAssetSeq == playCurriculumAssetSeq
                      }"
                      >{{ mediaAssetItem.durationMinSec }}</span
                    >
                    <span
                      class="contents_type_span asset_span"
                      :class="{
                        active: mediaAssetItem.curriculumAssetSeq == playCurriculumAssetSeq
                      }"
                      >{{ mediaAssetItem.contentsTypeName }}</span
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div id="bottom">
          <div class="stdProcess">
            <h3 id="lectureCount">
              시청완료 ( {{ mediaCompleteLectureCount }} 강 / {{ mediaIncompleteLectureCount }} 강 )
            </h3>
          </div>
          <div ref="attachFileButton" class="stdBtnz" @mouseenter="showDownloadPopup" @mouseleave="hideDownloadPopup">
            <div>
              <div ref="attachFilesPopup" class="popup-attach-files">
                <div class="inner">
                  <span class="span-attach-file-title">학습 자료 받기</span>
                  <div
                    v-for="(attachFile, index) in attachFiles"
                    ref="attachFilesList"
                    :key="index"
                    class="list-attach-files"
                  >
                    <a href="javascript:void(0);" @click="attachFileDownload(attachFile.attachFilePath)">
                      {{ attachFile.attachFileName }}
                    </a>
                  </div>
                </div>
              </div>
              <button type="button" class="btn-attach-file">
                <span>학습자료</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form ref="fileForm" method="post" action="https://api.yanadoo.co.kr/download">
      <input id="filePath" type="hidden" name="filePath" value="" />
    </form>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import CurriculumService from '@/api/service/CurriculumService'
import { nextTick, onMounted, ref } from 'vue'
import {
  type CurriculumMediaCompleteRequest,
  type WebCurriculumLecture,
  AssetTypeEnum,
  type WebCurriculumResponse,
  type LectureAttachFileDTO
} from '@/types/service/curriculum'
import type { MyClassCurrentLectureWebRequest } from '@/types/service/myClass'
import MyClassService from '@/api/service/MyClassService'
import { VgControllerClient } from '@/assets/js/vg-controller-client.latest.min'

// 부모로부터 수신되는 값
const studyGroupUserSeq = ref<number>(0)
const curriculumAssetSeq = ref<number>(0)

// active
const isLoading = ref<boolean>(false)
const playLectureSeq = ref<number>(0)
const playCurriculumAssetSeq = ref<number>(0)
const lastPosition = ref<number>(0)
const lastDuration = ref<number>(0)

// response
const className = ref<string>('')
const beginDate = ref<string>('')
const closeDate = ref<string>('')
const mediaCompleteLectureCount = ref<number>(0)
const mediaIncompleteLectureCount = ref<number>(0)
const lectures = ref<Array<WebCurriculumLecture>>([])
const attachFiles = ref<LectureAttachFileDTO[]>([])

onMounted(() => {
  const playerScript = document.createElement('script')
  playerScript.setAttribute('src', 'https://file.kollus.com/vgcontroller/vg-controller-client.latest.min.js')
  document.head.appendChild(playerScript)

  const lectureInfo = JSON.parse(localStorage.getItem('popupPlayer')!)
  studyGroupUserSeq.value = lectureInfo.studyGroupUserSeq
  curriculumAssetSeq.value = lectureInfo.curriculumAssetSeq

  if (studyGroupUserSeq.value == null || curriculumAssetSeq.value == null) return

  listSearch()

  window.addEventListener('beforeunload', unLoadEvent)
})

async function listSearch() {
  isLoading.value = true
  const result: WebCurriculumResponse = await CurriculumService.getWebCurriculum(studyGroupUserSeq.value)
  if (result) {
    className.value = result.className
    beginDate.value = result.beginDate
    closeDate.value = result.closeDate
    mediaCompleteLectureCount.value = result.mediaCompleteLectureCount
    mediaIncompleteLectureCount.value = result.mediaIncompleteLectureCount
    lectures.value = result.lectures

    nextTick(() => {
      const playCurriculumAsset = document.querySelector(
        `li[curriculumAssetSeq='${curriculumAssetSeq.value}'] a`
      ) as HTMLElement
      playCurriculumAsset.click()
      const playLecture = document.querySelector(`ul[lectureSeq='${playLectureSeq.value}']`)
      playLecture?.scrollIntoView()
    })
  }
  isLoading.value = false
}

function playKollus(lectureSeq: number, curriculumAssetSeq: number, mediaContentKey: string, lectureAttachFiles: any) {
  isLoading.value = true
  playLectureSeq.value = lectureSeq
  playCurriculumAssetSeq.value = curriculumAssetSeq
  setAttachFiles(lectureAttachFiles)
  beforePlayAction(curriculumAssetSeq)
  getKollus(mediaContentKey, curriculumAssetSeq)
  isLoading.value = false
}

const attachFileButton = ref<HTMLElement | undefined>()
function setAttachFiles(lectureAttachFiles: any) {
  attachFiles.value = lectureAttachFiles
  if (lectureAttachFiles && lectureAttachFiles.length > 0) {
    ;(attachFileButton.value as HTMLElement).style.display = 'block'
  } else {
    ;(attachFileButton.value as HTMLElement).style.display = 'none' // 학습자료 없을 경우 버튼 숨김
  }
}

const attachFilesList = ref<HTMLElement | undefined>()
const attachFilesPopup = ref<HTMLElement | undefined>()
function showDownloadPopup() {
  if (attachFilesList.value && (attachFilesList.value as HTMLElement).innerHTML != '') {
    ;(attachFilesPopup.value as HTMLElement).style.display = 'block'
  }
}

function hideDownloadPopup() {
  ;(attachFilesPopup.value as HTMLElement).style.display = 'none'
}

const fileForm = ref<HTMLElement | undefined>()
function attachFileDownload(attachFilePath: string) {
  if (attachFilePath == '') {
    alert('해당파일이 없습니다.')
  } else {
    isLoading.value = true
    // try {
    //   (fileForm.value as any).filePath.value = attachFilePath // TODO : 타입 정의
    //   (fileForm.value as HTMLElement).submit()
    // } finally {
    //   isLoading.value = false
    // }
  }
  hideDownloadPopup()
}

async function beforePlayAction(curriculumAssetSeq: number) {
  const request: MyClassCurrentLectureWebRequest = {
    studyGroupUserSeq: studyGroupUserSeq.value,
    curriculumAssetSeq: curriculumAssetSeq
  }
  // 현재 재생 강의 저장
  const result = await MyClassService.currentLecture(request)
  if (result.meta.code != 200) {
    console.log(result.meta.message)
    alert(result.meta.message)
  }
}

const player = ref<HTMLIFrameElement | null>(null)
async function getKollus(mediaContentKey: string, curriculumAssetSeq: number) {
  const result = await CurriculumService.getKey(mediaContentKey, curriculumAssetSeq)
  if (result) {
    ;(player.value as HTMLIFrameElement).src = result.link + '&autoplay'
  }
  kollusCallBack()
}

function kollusCallBack() {
  let complete = false
  try {
    // var controller: any = new VgControllerClient({ target_window: document.querySelector('#kollusPlayer').contentWindow })
    const controller: any = new VgControllerClient({
      target_window: (player.value as HTMLIFrameElement).contentWindow
    })

    controller.on('progress', function (percent: number, position: number, duration: number) {
      // 매 초마다 발생
      lastPosition.value = position
      lastDuration.value = duration

      if (percent >= 85 && complete == false) {
        completeLectureCallBack() // 85% 완강 처리
        complete = true
      }
    })

    controller.on('done', function () {
      completeLectureCallBack() // 100% 완강 처리
    })
  } catch (error) {
    // Videogateway Controller Library 는 window.postMessage API 를 이용하기 때문에
    // 해당 기능을 지원하지 않는 웹브라우저에서는 동작하지 않음
    console.error(error)
    alert('오류가 발생했습니다. ' + error)
  }
}

async function completeLectureCallBack() {
  if (typeof lastPosition.value != 'undefined' && typeof lastDuration.value != 'undefined') {
    const request: CurriculumMediaCompleteRequest = {
      assetType: AssetTypeEnum.MEDIA,
      studyGroupUserSeq: studyGroupUserSeq.value,
      curriculumAssetSeq: playCurriculumAssetSeq.value,
      duration: lastDuration.value * 1000,
      progress: lastPosition.value * 1000
    }
    // 완강 처리
    const result = await CurriculumService.completeCurriculumMediaAsset(request)
    if (result.meta.code != 200) {
      console.log(result.meta.message)
      alert(result.meta.message)
    }
  }
}

function myBrowser(): string {
  const userAgent = navigator.userAgent
  if (/Opera|OPR/i.test(userAgent)) return 'Opera'
  if (/Chrome/i.test(userAgent)) return 'Chrome'
  if (/Safari/i.test(userAgent)) return 'Safari'
  if (/Firefox/i.test(userAgent)) return 'Firefox'
  if (/MSIE|Trident/i.test(userAgent)) return 'IE' // MSIE for IE 10 or less and Trident for IE 11
  return 'Unknown'
}

function unLoadEvent(event: Event) {
  event.preventDefault()
  completeLectureCallBack()
  if (myBrowser() == 'IE') {
    alert('재생 중인 강의를 종료합니다.')
  }
}
</script>

<!-- style -->
<style scoped>
body {
  height: 100%;
  background: #000;
}
#wrap {
  width: 1048px;
  height: 100%;
}
.headTilte {
  width: 100%;
  height: 45px;
  background: #000 url(https://english.yanadoocdn.com/upload/yanadoo/new/common/img_logo_176x42.png) no-repeat 27px 50%;
  background-size: 100px auto;
}
.headTilte > h1 {
  width: 100%;
  height: 45px;
  line-height: 45px;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-wrap: normal;
  text-align: center;
  overflow: hidden;
}
.headTilte .className {
  font-size: 16px;
  color: #fff;
}
.headTilte .classDate {
  font-size: 14px;
  font-weight: normal;
  color: #bfbfbf;
}
#container {
  clear: both;
  position: relative;
  width: 100%;
  height: 511px;
  background-color: #000;
}
.movieArea {
  float: left;
  width: 768px;
  height: 435px;
  background: #0e0e0e;
  color: #fff;
  border: 1px solid #242424;
  border-left: none;
  z-index: 1;
}
.movieList {
  position: absolute;
  top: 0;
  right: 0;
  width: 275px;
  height: 100%;
  border-top: 1px solid #242424;
  border-bottom: 1px solid #242424;
  background: #1d1d1f;
  z-index: 2;
}
.mLlist {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}
.mLlist > ul {
  width: 100%;
  padding: 0;
  border-bottom: 4px solid #000;
  overflow: hidden;
  list-style-type: none;
}
.mLlist > ul > li {
  width: 100%;
  height: 37px;
}
.mLlist > ul > li.active {
  background: #000;
}
.mLlist > ul > li > ul {
  width: 100%;
  padding: 0;
  list-style-type: none;
}
.mLlist > ul > li > ul {
  width: 100%;
}
.mLlist > ul > li > ul > li {
  float: left;
  width: 60px;
  height: 37px;
  line-height: 38px;
  font-size: 12px;
  color: #fff;
}
.mLlist > ul > li > ul > li.thtit {
  width: 130px;
  text-align: left;
  text-indent: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: none;
}
#bottom {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #000;
}
.stdProcess {
  width: 390px;
  padding-left: 35px;
  padding-right: 8px;
}
.stdProcess > h3 {
  text-align: left;
  height: 45px;
  line-height: 45px;
  padding-top: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-wrap: normal;
}
.stdBtnz {
  width: 330px;
  padding-right: 20px;
  margin-right: 275px;
  text-align: right;
}
.stdBtnz > div {
  display: inline-block;
  position: relative;
  margin-right: 12px;
}
.stdBtnz button {
  height: 35px;
  padding: 3px 20px;
  font-size: 14px;
  color: #000;
  border-radius: 20px;
  box-sizing: border-box;
}
.none {
  display: none;
}
html {
  overflow: hidden;
}
.loading_area {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.loading_area img {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 200px;
}
.lectureTitle {
  width: 208px !important;
}
.completeYn {
  width: 40px !important;
  background: url(https://english.yanadoocdn.com/upload/yanadoo/new/promotion/player/ico_play_list_default_30x24.png)
    no-repeat 100% 50%;
  background-size: 15px auto;
}
.completeYn.active {
  background: url(https://english.yanadoocdn.com/upload/yanadoo/new/promotion/player/ico_play_list_active_30x24.png)
    no-repeat 100% 50%;
  background-size: 15px auto;
}
.asset {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 100% !important;
  padding: 25px 13px;
  text-align: left;
  box-sizing: border-box;
}
.asset + .asset:before {
  content: '';
  position: absolute;
  top: 0;
  left: 10px;
  width: 95%;
  height: 1px;
  border-top: 1px solid #2b2b30;
}
.asset .assetMediaBtn {
  flex: 0 1 auto;
}
.asset_span {
  flex: 0 1 auto;
  padding: 2px 8px;
  color: white;
  border-radius: 2px;
}
.asset_span.active,
.asset_span.active:hover {
  color: #ffb900;
  border: 0;
}
.play_span {
  background: url(https://english.yanadoocdn.com/upload/yanadoo/new/promotion/player/ico_play_default_26x34.png)
    no-repeat 50% 50%;
  background-size: 13px auto;
}
.play_span.active,
.play_span:hover {
  background: url(https://english.yanadoocdn.com/upload/yanadoo/new/promotion/player/ico_play_active_27x34.png)
    no-repeat 50% 50%;
  background-size: 13px auto;
}
.play_span:hover {
  color: #ffb900;
}
.duration_span {
  padding-left: 13px;
}
.contents_type_span {
  flex: 1 0 auto;
  color: #bfbfbf;
  text-align: right;
}
.btn-attach-file {
  background-color: #ffb900;
}
.btn-attach-file::before {
  content: '';
  display: inline-block;
  width: 2.2rem;
  height: 2.2rem;
  background: url(https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_download_54x54b.png) no-repeat 50% 20% /
    100%;
  vertical-align: middle;
}
.btn-question {
  background-color: #fff;
}
.popup-attach-files {
  display: none;
  position: absolute;
  bottom: 30px;
  left: -50%;
  width: 232px;
  height: 254px;
  font-size: 12px;
  background: url(https://english.yanadoocdn.com/upload/yanadoo/new/common/bg_downloadzip_down.png) no-repeat 0 0 /
    232px auto;
  text-align: left;
  z-index: 3;
}
.popup-attach-files.active {
  display: block;
}
.popup-attach-files .inner {
  padding: 40px 35px 20px;
}
.span-attach-file-title {
  font-weight: 900;
}
.list-attach-files {
  height: 155px;
  margin-top: 1rem;
  overflow-y: auto;
}
.list-attach-files a {
  display: block;
  padding: 9px 0;
  color: #000;
  background: url(https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_download_54x54b.png) no-repeat 100% 45% /
    18px auto;
}
.list-attach-files a > span {
  display: block;
  padding-right: 2.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
