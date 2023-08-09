<!-- template -->
<template>
  <header :class="{ 'my-class-mo-header': $route.name === 'MyClassMainView' }">
    <div class="inner-col">
      <Gnb />
      <div class="search-wrap">
        <div class="search">
          <input
            v-model="searchWord"
            type="text"
            placeholder="교육과정을 검색하세요"
            name="header-search-word"
            @keyup.enter="search()"
          />
          <button class="btn-search" @click="search()">검색</button>
        </div>
        <button type="button" class="btn-signup" @click="store.setSignOut">로그아웃</button>
        <button class="go-search" @click="mobileSearchView = true">검색창</button>
      </div>
    </div>

    <div v-if="mobileSearchView == true" class="mobile-search search-head">
      <div class="sub-header">
        <button type="button" class="btn-back" @click="mobileSearchView = false">
          <span class="blind">검색창 닫기</span>
        </button>
        <div class="search">
          <input
            id="curriculum-search"
            v-model="searchWord"
            type="text"
            placeholder="교육과정을 검색하세요"
            @keyup.enter="search()"
          />
          <button type="button" class="btn-delete" @click="searchWord = ''">
            <span class="blind">내용 지우기</span>
          </button>
        </div>
      </div>
      <div class="search-body">
        <strong>찾으시는 교육과정을<br />검색해보세요!</strong>
      </div>
    </div>
  </header>
</template>

<!-- script -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import router from '@/router/index'
import Gnb from '@/components/common/Gnb.vue'
import { useStore } from '@/stores/b2bStore'

// 왜 필요한지 모르겠음.
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const onScroll = () => {
  let header = document.querySelector('header') as HTMLElement
  header.classList.add('fixed')
  if (window.scrollY == 0) {
    header.classList.remove('fixed')
  }
}

const store = useStore()
const mobileSearchView = ref<boolean>(false)
// https://b2b-dev3.yanadoo.co.kr/search/SearchView/?searchWord=%EC%98%81%EC%96%B4
const searchWord = ref<string>('')
const search = () => {
  console.log('search')
  if (searchWord.value === null || searchWord.value.trim() === '') {
    return alert('검색어를 입력해주세요')
  } else {
    router.push({
      path: '/service/SearchView',
      query: {
        searchWord: searchWord.value
      }
    })
  }
}
</script>
