<!-- template -->
<template>
  <div class="wrap">
    <Header v-if="!isVisiblePopup" :class="{ mobile: isMobileResolution, show: isMyClassRoute }" />
    <RouterView :key="route.fullPath" />
    <Footer v-if="!isVisiblePopup" />
    <LoadingOverlay v-if="store.loading === true" />
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import { useStore } from '@/stores/b2bStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, type RouteLocationNormalizedLoaded } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const isMobileResolution = ref(false)
const isMyClassRoute = ref(false)
const isVisiblePopup = ref(false)
const isMobileSize = () => (isMobileResolution.value = window.innerWidth <= 1024)
const myClassRouteNames = ['myClass', 'search', 'service']
const popUpNames = ['PopupPlayer', 'PopupFreePlayer', 'SignUp', 'PrivacyPolicy', 'PrivacyPolicyModal', 'ServiceTerms']

watch(
  () => route,
  (to, from) => {
    isVisiblePopup.value = popUpNames.includes(to.name as string)
    console.log('Route params changed:', to, from)
    console.log('isVisiblePopup:', isVisiblePopup.value)
  }
)

function updateMyClassRoute(to: RouteLocationNormalizedLoaded) {
  isMyClassRoute.value = myClassRouteNames.includes(to.name as string)
  console.log('Route params changed:', to)
}

onMounted(() => {
  isMobileSize()
  window.addEventListener('resize', isMobileSize)
  updateMyClassRoute(route)
  router.afterEach((to) => {
    isMobileSize()
    updateMyClassRoute(to)
  })
})
// route.afterEach((to, from) => {
// isMobileSize()
// //   updateMyClassRoute(to)
// // })

// mounted() {
//   this.isMobileSize()
//   window.addEventListener('resize', this.isMobileSize)
//   this.updateMyClassRoute(this.$route)
//   this.$router.afterEach((to, from) => {
//     this.isMobileSize()
//     this.updateMyClassRoute(to)
//   })
// },
// beforeUnmount() {
//   window.removeEventListener('resize', this.isMobileSize)
// }
</script>

<!-- style -->
<style scoped>
.mobile.show {
  display: none;
}
</style>
