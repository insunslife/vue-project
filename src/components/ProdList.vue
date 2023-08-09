<template>
  <section class="prod-list-wrap">
    <ul class="prod-list">
      <li v-for="(prodItem, index) in props.prodContent" :key="index">
        <div class="img-wrap">
          <RouterLink :to="`/store/ProductDetailView/${prodItem.packageSeq}`">
            <img :src="prodItem.thumbnailPath" :alt="prodItem.title + ` 썸네일 이미지`" />
          </RouterLink>
        </div>
        <div class="txt-wrap">
          <span class="category"
            >{{ prodItem.categoryName }}<span v-if="prodItem.teacherName !== ''">·</span
            >{{ prodItem.teacherName }}</span
          >
          <RouterLink :to="`/store/ProductDetailView/${prodItem.packageSeq}`" class="prod-tit">{{prodItem.title}}</RouterLink>
          <ul class="prod-info-list">
            <li>{{ prodItem.levelCodeName }}</li>
            <li>{{ prodItem.stage }}차시</li>
            <li v-if="prodItem.includeBook === true">교재포함</li>
          </ul>
          <ul class="prod-date-info">
            <li v-if="prodItem.classRegistrationStartDate !== null">
              수강신청 기간 : {{ prodItem.classRegistrationStartDate }} ~ {{ prodItem.classRegistrationEndDate }}
            </li>
            <li v-if="prodItem.classDurationSettingType === 'FLEXIBLE'">
              수강신청일로부터 {{ prodItem.classAvailableDays }}일간 수강
            </li>
            <li v-if="prodItem.classDurationSettingType === 'FIXED'">
              수강기간 : {{ prodItem.classStartDate }} ~ {{ prodItem.classEndDate }}
            </li>
          </ul>
          <em class="prod-grade">{{ prodItem.starPoint }}</em>
          <strong v-if="prodItem.expenseDisplayYn == 'Y'" class="prod-price">{{
            priceToString(prodItem.exceptOptionSalePrice)
          }}</strong>
        </div>
        <div class="button-wrap">
          <button
            v-if="prodItem.packageFreeLecture !== null"
            type="button"
            class="btn-white preview"
            @click="
              openFreePlayer(
                prodItem.packageFreeLecture.className,
                prodItem.packageFreeLecture.lectureTitle,
                prodItem.packageFreeLecture.lectureSortOrder,
                prodItem.packageFreeLecture.curriculumAssetSeq,
                prodItem.packageFreeLecture.mediaContentKey
              )
            "
          >
            미리보기
          </button>
          <RouterLink :to="`/store/ProductDetailView/${prodItem.packageSeq}`" class="btn-yellow more"
            >자세히보기</RouterLink
          >
        </div>
      </li>
    </ul>
    <WinPopup ref="freePlayerPopup"></WinPopup>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import WinPopup from '@/components/player/WinPopup.vue'
import type { SearchPackageInfo } from '@/types/service/search'
import { ref } from 'vue'

const props = defineProps({
  prodContent: {
    type: Array<SearchPackageInfo>,
    required: true
  }
  // prodContent: {
  //   type: Array<StorePackageInfo>,
  //   required: true
  // }
})

function priceToString(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const freePlayerPopup = ref<InstanceType<typeof WinPopup>>()
function openFreePlayer(
  className: string,
  lectureTitle: string,
  lectureSortOrder: number,
  curriculumAssetSeq: number,
  mediaContentKey: string
) {
  let width: number = 773
  let height: number = 562
  let left: number = screen.width ? (screen.width - width) / 2 : 0
  let top: number = screen.height ? (screen.height - height) / 2 : 0
  let features: string = `top=${top},left=${left},width=${width},height=${height},scrollbars=no`

  ;(freePlayerPopup.value as any).openWinPopup('/player/free', 'popupFreePlayer', features, {
    className: className,
    lectureTitle: lectureTitle,
    lectureSortOrder: lectureSortOrder,
    curriculumAssetSeq: curriculumAssetSeq,
    mediaContentKey: mediaContentKey
  })
}
</script>

<!-- style -->
<style scoped>
.btn-yellow {
  border: 1px solid #ffb900;
  background: #ffb900;
}
.btn-white {
  border: 1px solid #dfdfea;
  background: #fff;
}
.btn-disable {
  border: 1px solid #cfcfda;
  background: #cfcfda;
  color: #fff;
  cursor: not-allowed;
}
.prod-list {
  margin-bottom: 8rem;
}
.prod-list > li {
  position: relative;
  display: flex;
  border: 1px solid #e7e7f0;
  border-radius: 1.2rem;
  overflow: hidden;
}
.prod-list > li + li {
  margin-top: 3rem;
}
.prod-list .img-wrap {
  width: 38rem;
  height: 25.8rem;
}
.prod-list .img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.prod-list .txt-wrap {
  flex: 1;
  padding: 2.8rem 4rem;
}
.prod-list .category {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  color: #a0a0b6;
}
.prod-list .prod-tit {
  font-weight: 500;
  font-size: 2.8rem;
}
.prod-list .prod-info-list {
  margin-top: 1.2rem;
}
.prod-list .prod-info-list li {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  vertical-align: middle;
  font-weight: 700;
  font-size: 1.2rem;
  color: #269cff;
  background: #e9f5ff;
  border-radius: 0.4rem;
}
.prod-list .prod-info-list li + li {
  margin-left: 0.4rem;
}
.prod-list .prod-date-info {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #8d8da0;
  line-height: 1.5;
}
.prod-list .prod-price {
  position: absolute;
  bottom: 3.5rem;
  font-size: 2.4rem;
}
.prod-list .prod-price::after {
  content: '원';
  display: inline-block;
  margin: 0 0 0.25rem 0.3rem;
  vertical-align: bottom;
  font-size: 1.4rem;
}
.prod-list .button-wrap {
  position: absolute;
  right: 4rem;
  bottom: 2.8rem;
  display: flex;
  gap: 0 0.8rem;
}
.prod-list .button-wrap > * {
  width: 15.7rem;
  padding: 1.2rem 0;
  font-size: 1.4rem;
  text-align: center;
  border-radius: 0.4rem;
}
.search-result-col .btn-yellow {
  border: 1px solid #ffb900;
  background: #ffb900;
}
.search-result-col .btn-white {
  border: 1px solid #dfdfea;
  background: #fff;
}
.search-result-col .btn-disable {
  border: 1px solid #cfcfda;
  background: #cfcfda;
  color: #fff;
  cursor: not-allowed;
}
.prod-list .prod-grade {
  position: absolute;
  top: 2.8rem;
  right: 4rem;
  font-weight: 500;
  font-size: 1.6rem;
  color: #28284b;
}
.prod-list .prod-grade::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
  margin: -0.3rem 0.5rem 0 0;
  background: url(@/assets/images/ico_pc_star_72x72yellow.png) no-repeat center / 100%;
}

.search-result-col .prod-empty {
  padding: 7.5rem 0 19rem;
  font-weight: 500;
  font-size: 2rem;
  line-height: 1.3;
  text-align: center;
}
.search-result-col .prod-empty::before {
  content: '';
  display: block;
  width: 14rem;
  height: 14rem;
  margin: 0 auto 0.8rem;
  background: url(@/assets/images/ico_pc_empty_420x420.png) no-repeat center / 100%;
}

@media screen and (max-width: 1024px) {
  .prod-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8rem 1.8rem;
    margin-top: 3rem;
  }
  .prod-list > li {
    display: block;
    border: none;
    border-radius: 0;
  }
  .prod-list > li + li {
    margin-top: 0;
  }
  .prod-list .img-wrap {
    width: 100%;
    height: 28vw;
    border-radius: 1em;
    overflow: hidden;
  }
  .prod-list .txt-wrap {
    padding: 2rem 0.8rem 0;
  }
  .prod-list .category {
    margin-bottom: 1.2rem;
    font-size: 2.4rem;
  }
  .prod-list .prod-info-list {
    margin-top: 1.6rem;
  }
  .prod-list .prod-info-list li {
    padding: 0.4rem 0.8rem;
    font-size: 1.6rem;
  }
  .prod-list .prod-date-info {
    display: none;
  }
  .prod-list .prod-grade {
    position: static;
    display: block;
    margin-top: 1.2rem;
    font-size: 2rem;
  }
  .prod-list .prod-grade::before {
    width: 2.4rem;
    height: 2.4rem;
  }
  .prod-list .prod-price {
    position: static;
    display: block;
    margin-top: 2rem;
    font-size: 3.2rem;
  }
  .prod-list .prod-price::after {
    margin: 0;
    font-size: 3.2rem;
  }
  .prod-list .button-wrap {
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    text-indent: -999px;
    overflow: hidden;
  }
  .prod-list .button-wrap .more {
    width: 100%;
    height: 100%;
    background: none;
    border: 0;
  }
  .prod-list .preview {
    display: none;
  }
  .prod-list .btn-more {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
  }
  .search-result-col .prod-empty {
    padding: 7.5rem 0 11.5rem;
    font-size: 3.2rem;
  }
  .search-result-col .prod-empty::before {
    width: 21rem;
    height: 21rem;
    margin-bottom: 0.5rem;
  }
}
</style>
