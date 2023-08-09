<template>
  <div class="list-more-box">
    <ul class="pagination">
      <li class="prev">
        <a href="javascript:void(0);" @click="prevPage"></a>
      </li>
      <li v-for="page in visibleNum" :key="page">
        <a href="javascript:void(0);" :dataPage="page" class="num" @click="changePage(page)">{{ page }}</a>
      </li>
      <li class="next">
        <a href="javascript:void(0);" @click="nextPage"></a>
      </li>
    </ul>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';

const props = defineProps({
  totalPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['page-change']);

const currentPage = ref<number>(1);

onMounted(() => {
  activeButton();
  disabledButton();
});

onUpdated(() => {
  activeButton();
  disabledButton();
});

function visibleNum() {
  let pageNum = [];

  for (let i = 1; i <= props.totalPage; i++) {
    pageNum.push(i);
  }

  let targetIndex = pageNum.indexOf(currentPage.value);
  let startIndex = Math.max(targetIndex - 2, 0);
  let endIndex = Math.min(targetIndex + 2, pageNum.length - 1);

  if (currentPage.value <= 2 || currentPage.value >= props.totalPage - 1) {
    endIndex = Math.min(startIndex + 4, pageNum.length - 1);
    startIndex = Math.max(endIndex - 4, 0);
  }
  return pageNum.slice(startIndex, endIndex + 1);
}

function changePage(page: number) {
  currentPage.value = page;
  emit('page-change', page);
  activeButton();
  disabledButton();
}

function activeButton() {
  // 전체 페이지네이션 내의 모든 li에 active 클래스를 빼고
  let pageButton = document.querySelectorAll('.pagination a');
  for (let i = 0; i < pageButton.length; i++) {
    pageButton[i].closest('li')?.classList.remove('active');
  }

  // currentPage와 dataPage의 값이 같은 a의 부모 li에게 active클래스 추가
  let targetButton = document.querySelector(`.pagination .num[dataPage="${currentPage.value}"]`);
  if (targetButton) {
    targetButton.closest('li')?.classList.add('active');
  }
}

// prev,next버튼에 disabled 여부
function disabledButton() {
  if (currentPage.value === 1) {
    document.querySelector('.prev')?.classList.add('disabled');
  } else {
    document.querySelector('.prev')?.classList.remove('disabled');
  }

  if (currentPage.value === props.totalPage) {
    document.querySelector('.next')?.classList.add('disabled');
  } else {
    document.querySelector('.next')?.classList.remove('disabled');
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    changePage(currentPage.value);
    activeButton();
    disabledButton();
  }
}

function nextPage() {
  if (currentPage.value < props.totalPage) {
    currentPage.value++;
    changePage(currentPage.value);
    activeButton();
    disabledButton();
  }
}
</script>

<!-- style -->
<style scoped>
.list-more-box {
  margin-bottom: 10rem;
}
.list-more-box .pagination {
  display: flex;
  justify-content: center;
}
.list-more-box .pagination li + li {
  margin-left: 1.9rem;
}
.list-more-box .pagination li a {
  display: block;
  width: 4rem;
  height: 4rem;
  padding: 1rem 0;
  font-size: 1.8rem;
  text-align: center;
  box-sizing: border-box;
}
.list-more-box .pagination li.prev a {
  background: url(@/assets/images/ico_pc_faq_page_120x120.png) no-repeat 50%/100%;
  transform: rotate(-180deg);
}
.list-more-box .pagination li.next a {
  background: url(@/assets/images/ico_pc_faq_page_120x120.png) no-repeat 50%/100%;
}
.list-more-box .pagination li.disabled a {
  pointer-events: none;
  opacity: 0.2;
}
.list-more-box .pagination li.active a {
  font-weight: 700;
  background-color: #ececf6;
  border-radius: 100%;
}
@media screen and (max-width: 1024px) {
  .list-more-box {
    margin-top: 8rem;
  }
  .list-more-box .pagination li + li {
    margin-left: 3rem;
  }
  .list-more-box .pagination li a {
    width: 6.4rem;
    height: 6.4rem;
    padding: 1.7rem 0;
    font-size: 2.9rem;
  }
}
</style>
