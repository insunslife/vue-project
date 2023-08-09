// kollus Player Module 에서 사용하는 Videogateway Controller Library 의 타입 정의
declare module '@/assets/js/vg-controller-client.latest.min' {
  export class VgControllerClient {
    // Add the properties and methods of VgControllerClient here.
    constructor(options: any)
  }
}

// try {
//   // var controller: any = new VgControllerClient({ target_window: document.querySelector('#kollusPlayer').contentWindow })
//   const controller: any = new VgControllerClient({
//     target_window: (player.value as HTMLIFrameElement).contentWindow
//   })

//   controller.on('progress', function (percent: number, position: number, duration: number) {
//     // 매 초마다 발생
//     lastPosition.value = position
//     lastDuration.value = duration

//     if (percent >= 85 && complete == false) {
//       completeLectureCallBack() // 85% 완강 처리
//       complete = true
//     }
//   })

//   controller.on('done', function () {
//     completeLectureCallBack() // 100% 완강 처리
//   })
// } catch (error) {
//   // Videogateway Controller Library 는 window.postMessage API 를 이용하기 때문에
//   // 해당 기능을 지원하지 않는 웹브라우저에서는 동작하지 않음
//   console.error(error)
//   alert('오류가 발생했습니다. ' + error)
// }
