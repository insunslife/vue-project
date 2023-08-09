<template>
  <aside ref="lnb" class="lnb" :class="fixedClass">
    <div class="lnb-user">
      <div class="user-thumb">
        <img :src="store.getSignIn?.user.profileImageUrl" :alt="`${store.getSignIn?.user.name}프로필`" />
        <!-- /user/me 에 없는 profileImage 추가해놨습니다! (sign-in API값을 store에 저장해놨습니다. 참고해주세요!)
           alt값은 /user/me 에있는 user.name 을 사용해도 되지만 store에 있는 name 도 가져와보았으니 참고해서 수정해주셔도 됩니다! -->
      </div>
      <strong class="user-name">{{ store.getSignIn?.user.name }}님</strong>
      <div class="user-type">
        <em>기업회원</em>
      </div>
    </div>
    <ul class="lnb-menu">
      <li :class="{ new: learning }">
        <RouterLink
          to="MyClassListView"
          exact
          :class="[
            $route.matched.some((record) =>
              ['/myclass/MyClassMainView', '/myclass/MyClassListView', '/myclass/MyClassDetailView'].includes(
                record.path
              )
            ) || $route.query.from === 'myclassQna'
              ? 'active'
              : ''
          ]"
          >수강중인 클래스</RouterLink
        >
      </li>
      <li><RouterLink to="EnrollListView">수강신청 클래스</RouterLink></li>
      <li><RouterLink to="HistoryListView">수강이력</RouterLink></li>
      <!-- <li><RouterLink to="/">개인결제 내역</RouterLink></li> -->
      <li>
        <RouterLink
          to="QnaInquiryListView"
          exact
          :class="[
            $route.matched.some((record) =>
              ['/myclass/QnaInquiryListView', '/myclass/QnaLearningListView', '/myclass/QnaInqueryDetailView'].includes(
                record.path
              )
            ) || $route.query.from === 'question'
              ? 'active'
              : ''
          ]"
          >문의내역</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="InfoView"
          exact
          :class="[
            $route.matched.some((record) => ['/myclass/InfoEditView', '/myclass/InfoDeviceView'].includes(record.path))
              ? 'active'
              : ''
          ]"
          >회원정보관리</RouterLink
        >
      </li>
    </ul>
  </aside>
</template>

<!-- script -->
<script setup lang="ts">
import MyClassService from '@/api/service/MyClassService'
import type { FindMyClassGnbMenuIconsResponse } from '@/types/service/myClass'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/stores/b2bStore'

const store = useStore()

const isFixed = ref<boolean>(false)
const footerTransitionEnd = ref<boolean>(false)
function fixedClass() {
  return {
    lnbFixed: !footerTransitionEnd.value && isFixed.value
  }
}

const learning = ref<boolean>(false)
onMounted(() => {
  if (learning.value) {
    getMyClassGnbMenuIcons()
  }
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

// 좌측 GNB 메뉴 - N 아이콘
const gnbMenuIconList = ref<FindMyClassGnbMenuIconsResponse[]>()
async function getMyClassGnbMenuIcons() {
  const result: FindMyClassGnbMenuIconsResponse[] = await MyClassService.getMyClassGnbMenuIcons()
  gnbMenuIconList.value = result
}

const footerScrollTop = ref<number>(0)
const lnb = ref<HTMLElement>()
function onScroll() {
  const lnbFixed = lnb.value as HTMLElement
  const footer = document.querySelector('.footer') as HTMLElement
  const footerRect = footer.getBoundingClientRect()
  const windowHeight = window.innerHeight - 100

  if (
    window.innerWidth > 1024 &&
    footerRect.top < windowHeight &&
    footerRect.bottom > 0 &&
    scrollY > footerScrollTop.value
  ) {
    lnbFixed.classList.add('lnbFixed')
  } else {
    lnbFixed.classList.remove('lnbFixed')
  }
}
</script>
