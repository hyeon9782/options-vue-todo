<template lang="">
  <header class="sub-header">
    <AppBack />
    <div class="title-box">
      <slot></slot>
    </div>
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
