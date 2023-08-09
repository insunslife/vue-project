<template>
  <section class="my-page-col main">
    <MyClassList />
    <!-- TODO: Teleport 필요한지 확인 -->
    <Teleport to="#modals">
      <MyClassQRCodeModal v-if="store.state.MyClassQRCodeModal == true" class="display-m" />
      <CertificateModal v-if="store.state.CertificateModal == true" />
      <CertificatePackageModal v-if="store.state.CertificatePackageModal == true" />
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import MyClassList from '@/components/common/MyClassList.vue'
import CertificateModal from '@/components/modal/CertificateModal.vue';
import CertificatePackageModal from '@/components/modal/CertificatePackageModal.vue';
import MyClassQRCodeModal from '@/components/modal/MyClassQRCodeModal.vue';
import b2bStore from '@/stores/b2bStore'
const store = b2bStore()
</script>
