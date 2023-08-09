<template>
  <div class="content">
    <IdFindModal v-if="store.state.IdFindModal == true" />
    <IdFindComplateModal v-if="store.state.IdFindComplateModal == true" />

    <PwFindModal v-if="store.state.PwFindModal == true" />
    <PwFindChangeModal v-if="store.state.PwFindChangeModal == true" />
    <PwChangeComplateModal v-if="store.state.PwChangeComplateModal == true" />

    <PwChangeMassModal v-if="store.state.PwChangeMassModal == true" />
    <OverseasSignUpModal v-if="store.state.OverseasSignUpModal == true" />

    <JoinModal v-if="store.state.JoinModal == true" />
    <JoinComplateModal v-if="store.state.JoinComplateModal == true" />
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import IdFindModal from '@/components/modal/IdFindModal.vue'
import IdFindComplateModal from '@/components/modal/IdFindComplateModal.vue'
import PwFindModal from '@/components/modal/PwFindModal.vue'
import PwFindChangeModal from '@/components/modal/PwFindChangeModal.vue'
import PwChangeComplateModal from '@/components/modal/PwChangeComplateModal.vue'
import JoinModal from '@/components/modal/JoinModal.vue'
import JoinComplateModal from '@/components/modal/JoinComplateModal.vue'
import PwChangeMassModal from '@/components/modal/PwChangeMassModal.vue'
import OverseasSignUpModal from '@/components/modal/OverseasSignUpModal.vue'

import b2bStore from '@/stores/b2bStore'
const store = b2bStore()
</script>
