<template>
  <section class="content">
    <ProdBanner />
    <section class="product-list-wrap">
      <div class="inner-col">
        <div class="prod-tit-wrap">
          <ul class="category-list">
            <li>
              <select v-model="levelList" @change="getPackageListWithPage()">
                <option v-for="levelList in levelOption" :key="levelList">{{ levelList }}</option>
              </select>
            </li>
            <li>
              <RouterLink :to="{ query: { category: '' } }" :class="!$route.query.category ? 'active' : ''"
                >전체</RouterLink
              >
            </li>
            <li v-for="(categoryInfo, idx) in categoryInfoList" :key="categoryInfo.b2bCategorySeq" :seq="idx">
              <RouterLink
                :to="{ query: { category: categoryInfo.b2bCategorySeq } }"
                :class="Number(route.query.category) === categoryInfo.b2bCategorySeq ? 'active' : ''"
                >{{ categoryInfo.categoryName }}</RouterLink
              >
            </li>
          </ul>
          <div class="select-wrap">
            <label for="check-prod" class="input-chk chk-xs">
              <input id="check-prod" v-model="isRegister" type="checkbox" @change="resetPagination()" />
              <span class="chk-txt">수강신청 가능한 클래스만 보기</span>
            </label>
            <PageSize @updatePageSize="handlePageSizeChange" @change="resetPagination()" />
          </div>
        </div>
        <div v-if="totalCount > 0" class="prod-wrap">
          <ProdList :prod-content="storePackageInfo" />
          <PaginationList
            ref="pagination"
            :total-page="Math.ceil(totalCount / pageSize)"
            @page-change="handlePageChange"
          />
        </div>
        <div v-else class="prod-wrap">
          <p class="prod-empty">등록된 상품이 없습니다</p>
        </div>
      </div>
      <!-- // 검색결과 -->
    </section>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProdList from '@/components/ProdList.vue'
import PaginationList from '@/components/PaginationList.vue'
import StoreService from '../../api/service/StoreService'
import type {
  B2BCategoryInfo,
  FindStorePackagesRequest,
  FindStorePackagesResponse,
  StorePackageInfo
} from '../../types/service/store'
import ProdBanner from '@/components/ProdBanner.vue'
import PageSize from '@/components/PageSize.vue'

const route = useRoute()

const categorySeq = ref<number>(Number(route.params.categorySeq))
const levelOption = ref<string[]>(['난이도', '입문', '초급', '중급', '고급', '수험', '기타'])
const levelList = ref<string>('난이도')
const totalCount = ref<number>(1)
const pageSize = ref<number>(10)
const pageIndex = ref<number>(1)
const isRegister = ref<boolean>(false)
const storePackageInfo = ref<StorePackageInfo[]>([])
const categoryInfoList = ref<B2BCategoryInfo[]>([])

onMounted(() => {
  getPackageListWithPage()
  getB2BCategories()
})

// TODO: 잘되는지 확인해야 함. ProductDetailView getLevelName 함수와 비교해서 수정해야 함.
function getLevelName(levelCode: string): string {
  const levelMap: { [key: string]: string } = {
    '': '난이도',
    BASIC: '입문',
    BEGIN: '초급',
    MIDDLE: '중급',
    HIGH: '고급',
    EXAM: '수험',
    ETC: '기타'
  }
  return levelMap[levelCode] || ''
}

// B2B 패키지 카테고리 리스트 조회
async function getB2BCategories() {
  const result: B2BCategoryInfo[] = await StoreService.getB2BCategories(categorySeq.value)
  categoryInfoList.value = result
}

// B2B 패키지 리스트 조회 페이징
async function getPackageListWithPage() {
  const request: FindStorePackagesRequest = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    b2bCategorySeq: categorySeq.value,
    levelCode: getLevelName(levelList.value),
    isRegister: isRegister.value
  }
  const result: FindStorePackagesResponse = await StoreService.getPackageListWithPage(request)
  totalCount.value = result.totalCount
  storePackageInfo.value = result.storePackageInfos
}

function handlePageChange(page: number) {
  pageIndex.value = page
  getPackageListWithPage()
}

function handlePageSizeChange(size: number) {
  pageSize.value = size
  getPackageListWithPage()
}

// '수강신청 가능한 클래스만 보기' 라디오 버튼에 의해 노출되어야 할 상품의 리스트가 변경되어서 페이지네이션 또한 처음으로 돌아가야할 때
function resetPagination() {
  // pagination 컴포넌트의 currentPage 값을 1로 설정
  // $refs는 페이지 내 ref속성을 가진 자식 컴포넌트에 접근 할 수 있게 해준다.
  // TODO: 구현해야 함.
  // if (totalCount.value > 0) {
  //   this.$refs.pagination.currentPage = 1
  // }

  pageIndex.value = 1
  getPackageListWithPage()
}
</script>

<!-- style -->
<style scoped>
.product-list-wrap * {
  letter-spacing: -0.03em;
}
.product-list-wrap {
  padding: 0 0 12rem;
}
.product-list-wrap .search-txt {
  color: #ff5647;
}

.prod-tit-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
}
.prod-tit-wrap .category-list li {
  display: inline-block;
  vertical-align: middle;
  font-size: 1.4rem;
  overflow: hidden;
}
.prod-tit-wrap .category-list li + li {
  margin-left: 0.8rem;
}
.prod-tit-wrap .category-list select {
  padding: 1rem 4.4rem 1rem 2.4rem;
  color: #fff;
  background: #28284b url(@/assets/images/ico_pc_arrowdown_48x48white.png) no-repeat 80% center / 1.6rem;
  border-radius: 10rem;
}
.prod-tit-wrap .category-list a {
  display: block;
  padding: 1rem 2.4rem;
  color: #717188;
  border: 1px solid #e7e7f0;
  border-radius: 10rem;
}
.prod-tit-wrap .category-list a:hover,
.prod-tit-wrap .category-list a.active {
  color: #28284b;
  border-color: #28284b;
}
.prod-tit-wrap .chk-xs {
  color: #717188;
}
.prod-tit-wrap .select-wrap {
  display: flex;
  align-items: center;
}
.product-list-wrap .prod-empty {
  padding: 7.5rem 0 19rem;
  font-weight: 500;
  font-size: 2rem;
  line-height: 1.3;
  text-align: center;
}
.product-list-wrap .prod-empty::before {
  content: '';
  display: block;
  width: 14rem;
  height: 14rem;
  margin: 0 auto 0.8rem;
  background: url(@/assets/images/ico_pc_empty_420x420.png) no-repeat center / 100%;
}
@media screen and (max-width: 1024px) {
  .product-list-wrap {
    padding: 4.8rem 4.2rem 10rem;
  }
  .prod-tit-wrap {
    display: block;
    margin-bottom: 5rem;
  }
  .prod-tit-wrap .select-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
  }

  .prod-tit-wrap .category-list {
    white-space: nowrap;
    overflow: auto;
    margin: 0 -4.2rem 0;
    padding: 0 4.2rem;
  }
  .prod-tit-wrap .category-list li {
    font-size: 2.8rem;
  }
  .prod-tit-wrap .category-list li + li {
    margin-left: 1.4rem;
  }
  .prod-tit-wrap .category-list select {
    padding: 1.8rem 7.6rem 1.8rem 4.2rem;
    font-size: 2.8rem;
    background: #28284b url(@/assets/images/ico_pc_arrowdown_48x48white.png) no-repeat 80% center / 2.4rem;
    border: none;
  }
  .prod-tit-wrap .category-list a {
    padding: 1.8rem 4.2rem;
  }

  .product-list-wrap .prod-empty {
    padding: 7.5rem 0 11.5rem;
    font-size: 3.2rem;
  }
  .product-list-wrap .prod-empty::before {
    width: 21rem;
    height: 21rem;
    margin-bottom: 0.5rem;
  }
}
</style>
