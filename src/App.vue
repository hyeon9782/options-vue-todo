<script lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layouts/AppHeader.vue'
export default {
  components: {
    RouterView,
    AppHeader
  }
}
</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style scoped></style>
