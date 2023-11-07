<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppWrapper from '@/components/layouts/AppWrapper.vue'
export default defineComponent({
  components: {
    RouterView,
    AppHeader,
    AppWrapper
  }
})
</script>

<template>
  <AppWrapper>
    <AppHeader />
    <RouterView />
  </AppWrapper>
</template>

<style scoped></style>
