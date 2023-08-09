<template>
  <div class="content">
    <div v-show="isLoading" id="loadingArea" class="loading_area">
      <img src="https://english.yanadoocdn.com/upload/yanadoo/pc/common/img/img_loading.gif" alt="loading" />
    </div>
    <div id="wrap">
      <div id="head">
        <div class="headTilte">
          <h1>
            <span id="className" class="className">{{ className }}</span>
          </h1>
        </div>
      </div>
      <div id="container">
        <div class="movieArea">
          <iframe
            id="kollusFreePlayer"
            ref="freePlayer"
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
        <div id="bottom">
          <div class="stdProcess">
            <h3 id="lectureSortOrder">{{ lectureSortOrder }}강</h3>
            <h3 id="lectureTitle">{{ lectureTitle }}</h3>
          </div>
          <div class="logoArea">
            <img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/img_logo_176x42.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { KollusPlayerKeyVO } from '@/types/service/curriculum'
import CurriculumService from '@/api/service/CurriculumService'

// URI 를 통해 get 방식으로 받은 파라미터
const className = ref<string>('')
const lectureSortOrder = ref<string>('')
const lectureTitle = ref<string>('')
const curriculumAssetSeq = ref<number>(0)
const mediaContentKey = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(() => {
  const playerScript = document.createElement('script')
  playerScript.setAttribute('src', 'https://file.kollus.com/vgcontroller/vg-controller-client.latest.min.js')
  document.head.appendChild(playerScript)

  // const lectureInfo = JSON.parse(localStorage.getItem('popupFreePlayer' || '{}'))._id,  
  // let lectureInfo = JSON.parse(localStorage.getItem('popupFreePlayer' || '{}'))._id
  const lectureInfo = JSON.parse(localStorage.getItem('currentUser')!); // !: Non-null assertion operator in TypeScript.
  className.value = lectureInfo.className
  lectureTitle.value = lectureInfo.lectureTitle
  lectureSortOrder.value = lectureInfo.lectureSortOrder
  curriculumAssetSeq.value = lectureInfo.curriculumAssetSeq
  mediaContentKey.value = lectureInfo.mediaContentKey
  getKollus()
})

async function getKollus() {
  isLoading.value = true

  const result: KollusPlayerKeyVO = await CurriculumService.getKey(mediaContentKey.value, curriculumAssetSeq.value)
  if (result) {
    const kollusFreePlayer = document.getElementById('kollusFreePlayer') as HTMLIFrameElement
    kollusFreePlayer.src = result.link + '&autoplay'
    isLoading.value = false
  }
}
</script>

<!-- style -->
<style scoped>
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd,
table,
th,
td,
form,
fieldset,
legend,
input,
textarea,
button,
select {
  margin: 0;
  padding: 0;
  font-family: 'NotoSansCJKkr', sans-serif;
}

body,
input,
textarea,
select,
button,
table {
  font-family: 'NotoSansCJKkr', sans-serif;
  font-size: 12px;
}

img,
fieldset {
  border: 0;
}

ul,
ol {
  list-style: none;
}

em,
address,
i {
  font-style: normal;
  word-break: break-word;
}

a {
  text-decoration: none;
}

a:hover,
a:active,
a:focus {
  text-decoration: none;
}

caption,
legend,
hr {
  display: none;
}

table,
th,
td {
  border: none;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
}

html,
body {
  width: 773px;
}

html {
  overflow-y: scroll;
  font-size: 11px;
}

body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
form,
fieldset,
p,
button {
  margin: 0;
  padding: 0;
}

body,
h1,
h2,
h3,
h4,
input,
button {
  font-family: 'NotoSansCJKkr', sans-serif;
  font-size: 12px;
  color: #383d41;
}

body {
  background-color: #000;
  overflow: hidden;
  min-width: 768px !important;
  text-align: center;
  word-break: break-all;
  -ms-word-break: break-all;
}

img,
fieldset,
iframe {
  border: 0 none;
}

li {
  list-style: none;
}

input,
select,
button {
  vertical-align: middle;
}

img {
  vertical-align: top;
}

label,
button {
  cursor: pointer;
}

button img {
  margin: 0;
  padding: 0;
  left: -3px;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

input::-ms-clear {
  display: none;
}

#wrap {
  width: 773px;
  background: #000;
}

#head {
  width: 100%;
  height: 44px;
  background: #000;
}

.logoArea {
  float: right;
  width: 120px;
  height: 44px;
  color: white;
  font-size: 29px;
  margin-top: 29px;
  padding-right: 15px;
}

.headTilte {
  float: right;
  width: 100%;
  height: 44px;
  text-align: right;
}

.headTilte > h1 {
  height: 44px;
  line-height: 44px;
  font-family: 'NotoSansCJKkr';
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-wrap: normal;
  text-align: center;
}

.headTilte .className {
  font-size: 16px;
  color: #ffffff;
}

#container {
  clear: both;
  width: 100%;
  height: 435px;
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
}

#bottom {
  clear: both;
  width: 100%;
  height: 80px;
  background: #000;
}

.stdProcess {
  float: left;
  width: 390px;
  height: 80px;
  padding-left: 20px;
  padding-top: 10px;
}

.stdProcess > h3 {
  text-align: left;
  height: 45px;
  line-height: 45px;
  font-family: 'NotoSansCJKkr';
  font-size: 15px;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-wrap: normal;
  font-weight: 400;
}

#lectureSortOrder {
  float: left;
  width: 30px;
  color: #ffb900;
}

.none {
  display: none;
}

html {
  overflow: hidden;
}

.loading_area {
  display: none;
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
</style>
@/api/service/CurriculumService1
