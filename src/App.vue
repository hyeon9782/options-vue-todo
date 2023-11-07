<script lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppWrapper from '@/components/layouts/AppWrapper.vue'
export default {
  components: {
    RouterView,
    AppHeader,
    AppWrapper
  }
}
</script>

<template>
  <AppWrapper>
    <AppHeader />
    <RouterView />
  </AppWrapper>
</template>

<style scoped></style>
