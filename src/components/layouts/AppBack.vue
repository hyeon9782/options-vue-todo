<template lang="">
  <font-awesome-icon @click="back" :icon="['fas', 'arrow-left']" class="back" />
</template>
<script lang="ts">
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="css" scoped>
.back {
  font-size: large;
  color: rgb(49, 69, 113);
}
</style>
