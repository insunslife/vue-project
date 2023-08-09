import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import type { ModalState, FindGnbMenuListWithChildResponse } from '@/types/service/gnb'
import GnbService from '@/api/service/GnbService'
import type { MyClassRunningClassLecturesDTO } from '@/types/service/myClass'
import type { B2BSignInResponse } from '@/types/auth/signIn'

export const useStore = defineStore(
  'b2bStore',
  () => {
    const state = reactive<ModalState>({
      CertificateModal: false,
      CertificatePackageModal: false,
      DeviceResetConfirmModal: false,
      IdFindComplateModal: false,
      IdFindModal: false,
      InquiryConfirmModal: false,
      InquiryModal: false,
      JoinComplateModal: false,
      JoinModal: false,
      LoginWrapModal: false,
      MyClassQnaModal: false,
      MyClassQRCodeModal: true,
      MyInquiryModal: false,
      OverseasSignUpModal: false,
      PwChangeComplateModal: false,
      PwChangeMassModal: false,
      PwChangeModal: false,
      PwFindChangeModal: false,
      PwFindModal: false
    })

    const loading = ref<boolean>(false)
    const myClass = ref<MyClassRunningClassLecturesDTO>()
    const getMyClass = computed(() => myClass.value)
    const userId = ref<string>('')

    const signUpDate = ref<string>('')
    const cpcc = ref<string>('')
    const studyGroupUserSeqToMyClass = ref<number>(0)
    const studyGroupUserSeqToMyClassPackage = ref<number>(0)
    const certifiedIn = ref<boolean>(false)

    const siteCode = ref<string>('')
    // 로그인 여부
    const isLogin = ref<boolean>(false)
    // 사용자 정보
    const signIn = ref<B2BSignInResponse>()
    const getSignIn = computed(() => signIn.value)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    function setSignIn(result: B2BSignInResponse): void {
      console.log('setSignIn')
      isLogin.value = true
      signIn.value = result
      // router.push('/')
    }
    // function login(): void {
    //   console.log('login')
    //   loggedIn.value = true
    //   router.push('/' + siteCode.value + '/myClass')
    // }
    // login()
    function setSignOut(): void {
      console.log('setLogout==========================')
      isLogin.value = false
      router.push(`/${siteCode.value}/sign-in`)
    }

    // const gnbSubList = ref<Array<GnbMenuSubList>>([])
    const gnbList = ref<FindGnbMenuListWithChildResponse[]>([])
    // const getGnbList = computed(() => gnbList.value)
    async function getGnb() {
      // if (gnbList.value.length > 0) {
      //   console.log('00 gnbList.value : ', gnbList.value)
      //   return gnbList.value
      // } else {
      //   const result = await GnbService.getGnbListWithChild()
      //   console.log('getGnb result : ', result)
      //   gnbList.value = result.data
      //   return gnbList.value
      // }
      const result = await GnbService.getGnbListWithChild()
      console.log('getGnb result : ', result)
      gnbList.value = result
      console.log('gnbList.value : ', gnbList.value)
      return gnbList.value
    }

    function openModal(modalName: keyof ModalState): void {
      state[modalName] = !state[modalName] // true false 반전
      console.log('openModal ' + modalName + '=' + state[modalName].toString())
    }

    function closeModal(modalName: keyof ModalState): void {
      console.log('closeModal ' + modalName)
      state[modalName] = !state[modalName] // true false 반전
    }

    function formatTime(seconds: number) {
      const minutes = Math.floor(seconds / 60) // 분 계산
      const remainingSeconds = seconds % 60 // 초 계산
      const formattedMinutes = String(minutes).padStart(2, '0') // 분을 2자리 숫자로 포맷팅
      const formattedSeconds = String(remainingSeconds).padStart(2, '0') // 초를 2자리 숫자로 포맷팅
      return `${formattedMinutes}:${formattedSeconds}`
    }
    return {
      state,
      loading,
      myClass,
      getMyClass,
      userId,
      isLogin,
      siteCode,
      signUpDate,
      cpcc,
      studyGroupUserSeqToMyClass,
      studyGroupUserSeqToMyClassPackage,
      certifiedIn,
      openModal,
      closeModal,
      signIn,
      getSignIn,
      setSignIn,
      setSignOut,
      getGnb,
      gnbList,
      formatTime
    }
  },
  {
    persist: true // 사용자가 페이지를 새로고침하거나 페이지를 닫아도 상태가 유지되도록 설정
  }
)
export default useStore

// export const b2bStore2 = defineStore('b2bStore2', () => {
//   const modalState = {
//     MyInquiry: false,
//     LoginWrapModal: false,
//   }
//   function openModal(modalName: string): void {
//     for (const key in modalState) {
//       if (key === modalName) {
//         modalState[key] = true
//       } else {
//         modalState[key] = false
//       }
//     }
//   }
//   return {
//     modalState: modalState,
//   }
// })
