<template lang="">
  <VDatePicker v-model="range" is-range>
    <template #default="{ inputValue, inputEvents }">
      <div class="flex justify-center items-center">
        <input :value="inputValue.start" v-on="inputEvents.start" />
        <IconArrowRight />
        <input :value="inputValue.end" v-on="inputEvents.end" />
      </div>
    </template>
  </VDatePicker>
</template>
<script lang="ts">
export default {}
</script>
<style lang="css" scoped></style>
