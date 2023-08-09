<template>
  <div id="inquiryModal" class="modal-wrap">
    <div class="modal-content question-popup">
      <div class="modal-head">
        <h4>학습문의</h4>
        <button type="button" class="btn-modal-close" @click="closeModal('InquiryModal')">
          <span class="blind">닫기</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="">
          <ul>
            <li>
              <label for="" class="modal-tit">문의내용</label>
              <textarea
                id="inquiryTxt"
                placeholder="현재 문의량이 많아 답변이 지연되고 있습니다. 순차적으로 답변 드리고 있으며, 빠른 답변이 될 수 있도록 하겠습니다. 불편을 드려 죄송합니다."
                maxlength="1000"
              ></textarea>
              <p class="count-txt"><span>0</span>/1000</p>
            </li>

            <!-- file -->
            <li>
              <strong class="modal-tit">첨부파일</strong>
              <div class="form-style02">
                <input type="text" class="file-txt" value="파일을 선택해 주세요." disabled />
                <div class="form-btn file-wrap">
                  <input id="fileUpload" type="file" accept="image/" class="file-upload" />
                  <label class="file-btn" for="fileUpload">파일찾기</label>
                </div>
              </div>
              <span class="form-guide">파일은 2MB 이하, jpg, png, gif 형식만 등록 가능 합니다.</span>
            </li>
            <!-- // file -->
          </ul>
          <div class="question-notice">
            <strong>문의 작성 안내</strong>
            <ul>
              <li>
                약관 및 법률에 위배(비속어, 허위사실 등), 해석이 불가능하거나 문의 외 다른 목적의 글을 작성한 경우
                관리자에 의해 사전 동의 없이 미게시 될 수 있습니다.
              </li>
              <li>작성하신 내용은 홍보, 이벤트 등 다양한 방법으로 활용될 수 있습니다.</li>
            </ul>
            <div class="form-button-wrap">
              <button class="form-button white">취소</button>
              <button class="form-button" disabled>확인</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="dimmed"></div>
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import b2bStore from '@/stores/b2bStore'
import type { ModalState } from '@/types/service/gnb'

const store = b2bStore()

function closeModal(modalName: keyof ModalState): void {
  store.closeModal(modalName)
}
</script>
