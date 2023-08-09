<!-- template -->
<template>
  <div class="nav-wrap">
    <h1 class="logo">
      <RouterLink to="/">
        <img
          :src="mainLogo?.logoFilePath ? mainLogo.logoFilePath : '/src/assets/images/img_logo_yanadoo.png'"
          :alt="store.siteCode + ' logo images'"
        />
      </RouterLink>
    </h1>
    <nav>
      <ul>
        <li v-for="(gnb, index) in store.gnbList" :key="index">
          <span class="depth1">{{ gnb.gnbName }}</span>
          <ul>
            <li v-for="(gnbSub, index) in gnb.childGnbMenus" :key="index">
              <RouterLink :to="`/store/ProductListView/${gnbSub.categorySeq}`">
                {{ gnbSub.gnbName }}
              </RouterLink>
            </li>
          </ul>
        </li>
        <!-- 고정메뉴 -->
        <li>
          <RouterLink to="/myclass/MyClassMainView" class="depth1"> MY클래스 </RouterLink>
        </li>
        <li>
          <RouterLink to="/service/HelpView" class="depth1">고객센터</RouterLink>
        </li>
        <!-- // 고정메뉴 -->
      </ul>
    </nav>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from '@/stores/b2bStore'
import MainPageService from '@/api/service/MainPageService'
import type { HomepageLogoResponse } from '@/types/service/mainPage'

const store = useStore()

onMounted(() => {
  if (store.isLogin === true) {
    // mainPageLogo()
    // const newAccessToken = await reissueAccessToken(store.refreshToken)
    store.getGnb()
    getLogo()
  }
})

const mainLogo = ref<HomepageLogoResponse>()
// 고객사 로고 조회
async function getLogo() {
  const result: HomepageLogoResponse = await MainPageService.getLogo()
  mainLogo.value = result
}
</script>
