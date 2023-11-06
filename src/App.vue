<script lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layouts/AppHeader.vue'
import Wrapper from '@/components/layouts/Wrapper.vue'
export default {
  components: {
    RouterView,
    AppHeader,
    Wrapper
  }
}
</script>

<template>
  <Wrapper>
    <AppHeader />
    <RouterView />
  </Wrapper>
</template>

<style scoped></style>
