<template>
  <div>
    <section class="service-top-col">
      <section class="inner-col">
        <HeaderSub :sub-title="'개인정보 처리방침'" />
        <ul>
          <li><router-link to="/service/TermsView">이용약관</router-link></li>
          <li><router-link to="/service/PrivacyPolicyView">개인정보 처리방침</router-link></li>
        </ul>
      </section>
    </section>
    <PrivacyPolicy />
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import HeaderSub from '@/components/common/HeaderSub.vue'
import PrivacyPolicy from '@/components/terms/PrivacyPolicy.vue'
</script>

<!-- style -->
<style scrope>
.service-top-col {
  padding: 6rem 0 0;
}
.service-top-col ul {
  display: flex;
  padding-bottom: 3.6rem;
  border-bottom: 0.3rem solid #000;
}
.service-top-col ul li {
  flex: 0 0 auto;
  margin-right: 2.8rem;
}
.service-top-col ul li a {
  position: relative;
  padding: 0;
  color: #b7b7c8;
  font-weight: 700;
  font-size: 2rem;
}
.service-top-col ul li a.router-link-active {
  color: #000;
}
.service-top-col ul li a.router-link-active::before {
  content: '';
  display: inline-block;
  width: 100%;
  position: absolute;
  bottom: -0.3rem;
  border-bottom: 0.3rem solid #ffb900;
}
@media screen and (max-width: 1024px) {
  .service-top-col {
    padding-top: 0;
  }
  .service-top-col .sub-header {
    border: 0;
  }
  .service-top-col ul {
    justify-content: space-evenly;
    padding: 4rem 0;
    border-bottom: 0.1rem solid #dfdfea;
  }
  .service-top-col ul li {
    margin-right: 0;
  }
  .service-top-col ul li a {
    font-size: 2.8rem;
  }
  .service-top-col ul li a.router-link-active::before {
    bottom: -4rem;
    border-bottom: 0.4rem solid #ffb900;
  }
}
</style>
