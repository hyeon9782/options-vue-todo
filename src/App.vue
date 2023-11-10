<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppFooter from '@/components/layouts/AppFooter.vue'
import AppWrapper from '@/components/layouts/AppWrapper.vue'
export default defineComponent({
  components: {
    RouterView,
    AppHeader,
    AppFooter,
    AppWrapper
  },
  data() {
    return {
      isMain: true
    }
  },
  watch: {
    // 감시하여 현재 경로에 따라 isSub 업데이트
    $route(to, from) {
      this.isMain = to.path === '/'
    }
  }
})
</script>

<template>
  <AppWrapper>
    <AppHeader v-if="isMain" />
    <RouterView />
    <AppFooter />
  </AppWrapper>
</template>

<style scoped></style>
