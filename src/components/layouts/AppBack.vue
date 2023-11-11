<template lang="">
  <font-awesome-icon @click="back" :icon="['fas', 'arrow-left']" class="back" />
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function back() {
  router.go(-1)
}
</script>
<style lang="css" scoped>
.back {
  font-size: large;
  color: rgb(49, 69, 113);
}
</style>
