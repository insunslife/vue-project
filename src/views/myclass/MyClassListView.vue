<template>
  <section class="my-page-col">
    <MyClassList />
    <Teleport to="#modals">
      <CertificateModal v-if="store.state.CertificateModal == true" />
      <CertificatePackageModal v-if="store.state.CertificatePackageModal == true" />
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import MyClassList from '@/components/common/MyClassList.vue';
import CertificateModal from '@/components/modal/CertificateModal.vue';
import CertificatePackageModal from '@/components/modal/CertificatePackageModal.vue';
import { useStore } from '@/stores/b2bStore'
const store = useStore()
</script>
