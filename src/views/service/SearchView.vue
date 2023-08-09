<template>
  <section class="content">
    <section class="sub-header search-head">
      <button type="button" class="btn-back" @click="$router.back()">
        <span class="blind">뒤로가기</span>
      </button>
      <div class="search">
        <input
          id="curriculum-search"
          v-model="searchWord2"
          type="text"
          placeholder="교육과정을 검색하세요"
          @keyup.enter="goSearch()"
        />
        <button type="button" class="btn-delete" @click="searchWord2 = ''">
          <span class="blind">내용 지우기</span>
        </button>
      </div>
    </section>
    <div class="serach-wrap">
      <section class="search-result-col">
        <div class="inner-col">
          <div class="prod-tit-wrap">
            <h3>
              <span class="search-txt">'{{ searchWord }}'</span>에 대한 {{ totalCount }}개의 교육과정이 있어요!
            </h3>
            <div class="select-wrap">
              <label for="check-prod" class="input-chk chk-xs">
                <input id="check-prod" v-model="isRegister" type="checkbox" @change="resetPagination()" />
                <span class="chk-txt">수강신청 가능한 클래스만 보기</span>
              </label>
              <PageSize @update-page-size="handlePageSizeChange" @change="resetPagination()" />
            </div>
          </div>
          <div v-if="totalCount > 0" class="prod-wrap">
            <ProdList :prod-content="searchPackageInfo" />
            <PaginationList
              ref="pagination"
              :total-page="Math.ceil(totalCount / pageSize)"
              @page-change="handlePageChange"
            />
          </div>
          <div v-else class="prod-wrap">
            <p class="prod-empty">
              <span class="search-txt">'{{ searchWord }}'</span>에 대한<br />교육과정이 존재하지 않습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchService from '@/api/service/SearchService'
import type { SearchPackageInfo, SearchPackagesRequest, SearchPackagesResponse } from '@/types/service/search'
import ProdList from '@/components/ProdList.vue'
import PaginationList from '@/components/PaginationList.vue'
import PageSize from '@/components/PageSize.vue'

const route = useRoute()
const router = useRouter()

const totalCount = ref<number>(1)
const searchPackagesResponse = ref<SearchPackagesResponse>()
const searchPackageInfo = ref<SearchPackageInfo[]>([])
const searchWord2 = ref<string>('')

onMounted(() => {
  searchWord.value = route.query.searchWord as string
  searchCategory.value = route.query.searchCategory as string
  console.log('searchWord=', searchWord.value)
  console.log('searchCategory=', searchCategory.value)

  searchPackages()
})

const pageIndex = ref<number>(1)
const pageSize = ref<number>(10)
const searchWord = ref<string>('')
const searchCategory = ref<string>('')
const isRegister = ref<boolean>(false)

// https://dev.yanadoo.co.kr/b2b/search/packages?isRegister=false&pageIndex=1&pageSize=10&searchWord=%25EC%2598%2581%25EC%2596%25B4

// 상품 리스트 검색
async function searchPackages() {
  console.log('searchPackages')
  const request: SearchPackagesRequest = {
    pageIndex: pageIndex.value, // 페이지 위치 (기본값 1)
    pageSize: pageSize.value, // 페이지 내 개수 (기본값 20)
    searchWord: encodeURIComponent(searchWord.value), // 검색어
    // b2bCategorySeq: Number(searchCategory.value), // B2B 카테고리 시퀀스
    // B2BLevelCodeEnum: string // 패키지 레벨 : BASIC-입문 / BEGIN-초급- / MIDDLE-중급 / HIGH-고급 / EXAM-수험 / ETC-기타
    isRegister: isRegister.value // 수강신청 가능 클래스 여부
  }
  console.log('searchPackages=', request)
  const result: SearchPackagesResponse = await SearchService.searchPackages(request)
  searchPackagesResponse.value = result
  searchPackageInfo.value = result.searchPackages
  totalCount.value = result.totalCount
}

function handlePageChange(page: number) {
  pageIndex.value = page
  searchPackages()
}

function handlePageSizeChange(size: number) {
  pageSize.value = size
  searchPackages()
}

const pagination = ref<HTMLElement | null>(null)
// '수강신청 가능한 클래스만 보기' 라디오 버튼에 의해 노출되어야 할 상품의 리스트가 변경되어서 페이지네이션 또한 처음으로 돌아가야할 때
function resetPagination() {
  // pagination 컴포넌트의 currentPage 값을 1로 설정
  // if (totalCount.value > 0) {
  //   pagination.value = 1 // TODO: 어찌해야 할지 모르겠음.
  // }
  pageIndex.value = 1
  searchPackages()
}

function goSearch() {
  if (!searchWord2.value.trim()) {
    return alert('검색어를 입력해주세요')
  } else {
    router.push({
      path: '/search/SearchView/',
      query: {
        searchWord: searchWord2.value
      }
    })
  }
}
</script>

<!-- style -->
<style scoped>
.serach-wrap * {
  letter-spacing: -0.03em;
}
.serach-wrap {
  padding: 5.6rem 0 12rem;
}
.serach-wrap .search-txt {
  color: #ff5647;
}
.prod-tit-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
}
.prod-tit-wrap h3 {
  font-weight: 500;
  font-size: 2.4rem;
}
.prod-tit-wrap .chk-xs {
  color: #717188;
}
.prod-wrap .prod-empty {
  padding: 15.5rem 0 19rem;
  font-weight: 500;
  font-size: 2rem;
  line-height: 1.3;
  text-align: center;
}
.prod-wrap .prod-empty::before {
  content: '';
  display: block;
  width: 14rem;
  height: 14rem;
  margin: 0 auto 0.8rem;
  background: url(@/assets/images/ico_pc_empty_420x420.png) no-repeat center / 100%;
}

@media screen and (max-width: 1024px) {
  .serach-wrap {
    padding: 4.8rem 4.2rem 10rem;
  }
  .prod-tit-wrap {
    display: block;
  }
  .prod-tit-wrap h3 {
    font-size: 3.2rem;
    text-align: center;
  }
  .prod-tit-wrap .select-wrap {
    margin-top: 5.8rem;
  }
  .prod-tit-wrap .chk-xs {
    display: none;
  }
  .prod-empty {
    padding: 7.5rem 0 11.5rem;
    font-size: 3.2rem;
  }
  .prod-empty::before {
    width: 21rem;
    height: 21rem;
    margin-bottom: 0.5rem;
  }
  .prod-wrap .prod-empty {
    font-size: 3.2rem;
  }
}
</style>
