<template>
  <div class="content">
    <img src="@/assets/images/img_error.png" alt="404 error" class="img-error" />
    <strong>원하시는 페이지를 찾을 수 없습니다.</strong>
    <p>
      페이지 주소가 잘못 입력되었거나,<br class="display-m" />
      주소의 변경 또는 삭제로 인해 연결할 수 없습니다.<br />
      페이지 주소가 정확한지 다시 한번 확인해 주세요.
    </p>
    <router-link to="/" class="btn-home">홈으로 가기</router-link>
  </div>
</template>

<!-- style -->
<style scoped>
.content {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  text-align: center;
  background: #fff;
  z-index: 10;
}
.img-error {
  width: 24rem;
}
strong {
  display: block;
  margin-top: 2rem;
  font-size: 2.8rem;
  letter-spacing: -0.03em;
}
p {
  margin-top: 2.4rem;
  font-size: 1.8rem;
  line-height: 1.3;
  color: #717188;
}
.btn-home {
  display: inline-block;
  width: 22rem;
  padding: 1.35rem 0;
  margin-top: 2.4rem;
  font-size: 1.6rem;
  border: 1px solid #dfdfea;
  border-radius: 0.4rem;
}
.btn-home:hover {
  background: #28284b;
  color: #fff;
}
@media screen and (max-width: 1024px) {
  .img-error {
    width: 28rem;
  }
  strong {
    margin-top: 4rem;
    font-size: 3.8rem;
  }
  p {
    margin-top: 2.8rem;
    font-size: 2.4rem;
    line-height: 1.25;
  }
  .btn-home {
    width: 28rem;
    padding: 2.1rem 0;
    margin-top: 5.6rem;
    font-size: 2.4rem;
  }
}
</style>
