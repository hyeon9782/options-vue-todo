<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layouts/AppHeader.vue'
import SubHeader from '@/components/layouts/SubHeader.vue'
import AppWrapper from '@/components/layouts/AppWrapper.vue'
export default defineComponent({
  components: {
    RouterView,
    AppHeader,
    SubHeader,
    AppWrapper
  },
  data() {
    return {
      isSub: false
    }
  },
  watch: {
    // 감시하여 현재 경로에 따라 isSub 업데이트
    $route(to, from) {
      this.isSub = to.path !== '/edit' && to.path !== '/search'
    }
  }
})
</script>

<template>
  <AppWrapper>
    <AppHeader v-if="isSub" />
    <SubHeader v-else />
    <RouterView />
  </AppWrapper>
</template>

<style scoped></style>
