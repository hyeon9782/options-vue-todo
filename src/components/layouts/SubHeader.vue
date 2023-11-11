<template lang="">
  <header class="sub-header">
    <AppBack />
    <div class="title-box">
      <slot></slot>
    </div>
  </header>
</template>
<script setup lang="ts">
import AppBack from '@/components/layouts/AppBack.vue'
</script>
<style lang="css" scoped>
.sub-header {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.title-box {
  font-weight: bold;
  font-size: large;
  width: calc(100% - 32px);
  text-align: center;
}
</style>
