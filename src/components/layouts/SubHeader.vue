<template lang="">
  <header>
    <AppBack />
    <slot></slot>
  </header>
</template>
<script lang="ts">
import AppBack from '@/components/layouts/AppBack.vue'
export default {
  components: {
    AppBack
  }
}
</script>
<style lang="css"></style>
