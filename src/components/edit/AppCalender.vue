<template lang="">
  <VDatePicker v-model.range="range" borderless expanded />
</template>
<script>
export default {
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date()
      }
    }
  }
}
</script>
<style lang="css"></style>
