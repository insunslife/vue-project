<template>
  <section class="my-page-col" :class="activeTab === 0 ? 'bg-white-col' : ''">
    <section class="inner-col">
      <div class="lnb-wrap">
        <MyClassLnb />
        <section class="inquiry-content">
          <HeaderSub :sub-title="'회원정보 수정'" />
          <div class="class-cont">
            <div class="class-tab-wrap mt-0">
              <ul class="sub-menu">
                <li
                  v-for="(tab, index) in tabs"
                  :key="index"
                  :class="{ active: activeTab === index }"
                  @click="changeTab(index)"
                >
                  <a href="#">{{ tab }}</a>
                </li>
              </ul>
            </div>
            <!-- 회원정보수정 tab -->
            <div v-show="activeTab === 0">
              <form name="EditFrm" action="#">
                <div class="edit-form">
                  <dl>
                    <dt>아이디</dt>
                    <dd>
                      <input type="text" name="id" readonly :value="me.user.id" />
                    </dd>
                  </dl>
                  <dl>
                    <dt>이름</dt>
                    <dd>
                      <input type="text" name="name" readonly :value="me.user.name" />
                    </dd>
                  </dl>
                  <dl>
                    <dt>비밀번호 변경</dt>
                    <dd>
                      <button type="button" class="btn-password" @click="openModal('PwChangeModal')">
                        <span>새 비밀번호 설정</span>
                      </button>
                    </dd>
                  </dl>
                  <dl class="line">
                    <dt>휴대전화</dt>
                    <dd>
                      <input type="text" name="cellPhone" readonly :value="me.user.cellPhone" /><em class="notice"
                        >휴대전화 번호 변경은 고객센터 1600-0563으로 문의주시기 바랍니다.</em
                      >
                    </dd>
                  </dl>
                  <dl>
                    <dt>이메일 주소</dt>
                    <dd class="email-box">
                      <div>
                        <input
                          type="text"
                          placeholder="이메일 주소를 입력해주세요."
                          class=""
                          name="email"
                          :value="me.user.email"
                        />
                      </div>
                      <div class="agree-box">
                        <p class="display-pc">
                          야나두에서 제공하는 컨텐츠 안내 및 이벤트, 각종 소식에 대한 알림을 이메일로 받으시겠습니까?
                        </p>
                        <div>
                          <label for="smsAgree" class="input-chk chk-md"
                            ><input id="smsAgree" v-model="me.user.isReceiveSms" type="checkbox" /><span class="chk-txt"
                              >SMS 수신 동의</span
                            >
                          </label>
                          <label for="emailAgree" class="input-chk chk-md"
                            ><input id="emailAgree" v-model="me.user.isReceiveEmail" type="checkbox" /><span
                              class="chk-txt"
                              >이메일 수신 동의</span
                            >
                          </label>
                        </div>
                      </div>
                    </dd>
                  </dl>
                  <dl>
                    <dt>기업고유코드</dt>
                    <dd class="company-code">
                      {{ me?.company.companyCode }}
                    </dd>
                  </dl>
                  <dl>
                    <dt>계열사명</dt>
                    <dd>
                      <input
                        v-model="me.company.affiliateName"
                        type="text"
                        name=""
                        placeholder="소속 계열사명을 입력해 주세요."
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>사번</dt>
                    <dd>
                      <input
                        v-model="me.company.employeeIdentificationNumber"
                        type="text"
                        name=""
                        placeholder="사번을 입력해 주세요."
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>부서명</dt>
                    <dd>
                      <input
                        v-model="me.company.departmentName"
                        type="text"
                        name=""
                        placeholder="부서명을 입력해 주세요."
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>직책</dt>
                    <dd>
                      <input v-model="me.company.position" type="text" name="" placeholder="직책을 입력해 주세요." />
                    </dd>
                  </dl>
                  <dl>
                    <dt>직급</dt>
                    <dd>
                      <input v-model="me.company.jobGrade" type="text" name="" placeholder="직급을 입력해 주세요." />
                    </dd>
                  </dl>
                  <dl>
                    <dt>비고/기타</dt>
                    <dd>
                      <input v-model="me.company.note" type="text" name="" placeholder="내용을 입력해 주세요." />
                    </dd>
                  </dl>
                  <dl class="address">
                    <dt>주소</dt>
                    <dd>
                      <div>
                        <input v-model="me.user.zipCode" type="text" name="" placeholder="우편번호" />
                        <button class="btn" type="button" @click="findAddress()">우편번호</button>
                      </div>
                      <input v-model="me.user.address" type="text" name="" placeholder="주소를 입력해 주세요." />
                      <input
                        v-model="me.user.detailAddress"
                        type="text"
                        name=""
                        placeholder="상세 주소를 입력해 주세요."
                      />
                      <em class="notice"
                        >무료 교재 및 이벤트 상품은 해당 입력 주소로 발송이 되오니 정확한 주소 입력 부탁드립니다.</em
                      >
                    </dd>
                  </dl>
                </div>
              </form>

              <div class="btn-wrap">
                <button class="btn-save" type="button" @click="modifyMe()">저장</button>
              </div>
            </div>
            <!-- 학습기기관리 -->
            <div v-show="activeTab === 1">
              <span class="sub-text display-pc"
                ><em>{{ me.user.name }}({{ me.user.id }})</em>님의 계정에 아래 기기 <em>{{ deviceList.length }}건</em>이
                등록되어 있습니다.</span
              >
              <ul class="device-list">
                <li
                  v-for="device in deviceList.slice(0, 5)"
                  :key="device.userSeq"
                  class="device"
                  :class="{ phone: device.mobileYn, pc: !device.mobileYn }"
                >
                  <!-- .device 클래스 pc, phone, tab -->
                  <label :for="'check-xs-' + device.seq" class="input-chk chk-xs">
                    <input :id="'check-xs-' + device.seq" type="checkbox" />
                    <div class="chk-txt">
                      <div class="device-info">
                        <span class="status" :class="{ ing: device.reqYn === 1 }">{{
                          device.reqYn === 0 ? '정상' : '처리중'
                        }}</span>
                        <strong>{{ device.deviceName }}</strong>
                        <span class="date">{{ formatDate(device.updateDate) }}</span>
                      </div>
                    </div>
                  </label>
                </li>
                <li v-for="i in 5 - deviceList.length" :key="i" class="device no">
                  <p>기기가 등록되지 않았습니다.</p>
                </li>
              </ul>
              <div class="device-notice">
                <strong>기기관리 유의사항</strong>
                <ul>
                  <li>야나두 강의는 한 ID당 기기 5대(PC, Mobile, App, Pad)까지 수강이 가능합니다.</li>
                  <li>기기 초기화 신청 시 사유 문의를 위해 고객센터(1600-0563)연락 받으실 수 있습니다.</li>
                  <li>초기화 처리는 고객센터 운영시간(평일 09:00 ~ 18:00)내 확인하여 진행 됩니다.</li>
                  <li>18:00 이후 초기화 신청건에 대해서는 익일 운영 시간내 처리됩니다.</li>
                  <li>초기화 요청 시, 선택한 기기에 "처리중”이라는 표시를 확인 해주시기 바랍니다.</li>
                </ul>
              </div>
              <div class="btn-wrap">
                <button class="btn-reset" type="button" @click="requestDeviceReset('DeviceResetConfirmModal')">
                  초기화 신청
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <Teleport to="#modals">
      <PwChangeModal v-if="store.state.PwChangeModal == true" class="now-pw-change" />
      <DeviceResetConfirmModal v-if="store.state.DeviceResetConfirmModal == true" />
    </Teleport>
  </section>
</template>

<!-- script -->
<script setup lang="ts">
import UserService from '@/api/auth/UserService'
import MyClassService from '@/api/service/MyClassService'
import type { B2BFindMeResponse, B2BModifyMeRequest } from '@/types/auth/user'
import type { CommonResponse } from '@/types/commonResponse'
import type { KollusDevice } from '@/types/service/myClass'
import { useStore } from '@/stores/b2bStore'
import { onMounted, ref } from 'vue'
import type { ModalState } from '@/types/service/gnb'
// import { daum } from '../../assets/js/postcode.v2.js'
import MyClassLnb from '@/components/common/MyClassLnb.vue'
import HeaderSub from '@/components/common/HeaderSub.vue'
import PwChangeModal from '@/components/modal/PwChangeModal.vue'
import DeviceResetConfirmModal from '@/components/modal/DeviceResetConfirmModal.vue'

// api result 값
const me = ref<B2BFindMeResponse>({
  user: {
    id: '',
    name: '',
    cellPhone: '',
    email: '',
    isReceiveSms: false,
    isReceiveEmail: false,
    zipCode: '',
    address: '',
    detailAddress: ''
  }, // 회원 관련 정보
  company: {
    companyCode: '',
    affiliateName: '',
    employeeIdentificationNumber: '',
    departmentName: '',
    position: '',
    jobGrade: '',
    note: ''
  } // 회사 관련 정보
})

const tabs = ref<string[]>(['회원정보 수정', '학습기기 관리'])
const activeTab = ref<number>(0)
const deviceList = ref<KollusDevice[]>([])

const store = useStore()

onMounted(() => {
  getDeviceList()
})

// 학습기기관리
async function getDeviceList() {
  const result: KollusDevice[] = await MyClassService.getDeviceList()
  deviceList.value = result
}

async function modifyMe() {
  const payload: B2BModifyMeRequest = {
    email: me.value?.user.email ?? '',
    isReceiveSms: me.value?.user.isReceiveSms ?? false,
    isReceiveEmail: me.value?.user.isReceiveEmail ?? false,
    zipCode: me.value?.user.zipCode ?? '',
    address: me.value?.user.address ?? '',
    detailAddress: me.value?.user.detailAddress ?? '',
    affiliateName: me.value?.company.affiliateName ?? '',
    employeeIdentificationNumber: me.value?.company.employeeIdentificationNumber ?? '',
    departmentName: me.value?.company.departmentName ?? '',
    position: me.value?.company.position ?? '',
    jobGrade: me.value?.company.jobGrade ?? '',
    note: me.value?.company.note ?? ''
  }

  const result: CommonResponse<void> = await UserService.modifyMe(payload)
  if (result.meta.code === 200) {
    alert('저장이 완료되었습니다.')
    location.reload()
  } else {
    alert('데이터 저장에 실패하였습니다.')
  }
}

// 학습기기관리 초기화
async function requestDeviceReset(modalName: keyof ModalState) {
  const selectedDevices = deviceList.value.filter((device) => {
    const checkbox = document.getElementById(`check-xs-${device.seq}`) as HTMLInputElement
    return checkbox.checked
  })

  if (selectedDevices.length === 0) {
    alert('초기화할 기기를 선택해주세요.')
    return
  }

  const request = selectedDevices.map((device) => ({
    reason: 'Web에서 초기화 신청',
    seq: device.seq
  }))
  const result: CommonResponse<void> = await MyClassService.resetApplication(request)
  if (result.meta.code === 200) {
    // alert('초기화 신청이 완료되었습니다.')
    store.openModal(modalName)
    selectedDevices.forEach((device) => {
      const checkbox = document.getElementById(`check-xs-${device.seq}`) as HTMLInputElement
      if (checkbox) {
        checkbox.checked = false
        device.reqYn = 1
      }
    })
  } else {
    // alert('초기화 신청에 실패하였습니다.')
    console.log('초기화 신청에 실패하였습니다.')
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

// https://cocococo.tistory.com/entry/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%A3%BC%EC%86%8C-API-TypeScript%EC%97%90%EC%84%9C-%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%8B%A4%EC%9D%8C-%EC%A3%BC%EC%86%8C-API-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95
declare global {
  interface Window {
    daum: any
  }
}
// interface IAddr {
//   address: string
//   zonecode: string
// }
// https://codelist.tistory.com/59
function findAddress() {
  new window.daum.Postcode({
    oncomplete: (data: any) => {
      me.value.user.zipCode = data.zonecode
      me.value.user.address = data.address
    }
  }).open()
}

function changeTab(index: number) {
  activeTab.value = index
}

function openModal(modalName: keyof ModalState): void {
  store.openModal(modalName)
}
</script>

<!-- style -->
<style scoped>
.my-page-col .sub-header {
  display: none;
}
@media screen and (max-width: 1024px) {
  .my-page-col .sub-header {
    display: block;
  }
}
</style>
