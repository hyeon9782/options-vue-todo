<template lang="">
  <VDatePicker v-model="range" is-range>
    <template #default="{ inputValue, inputEvents }">
      <div class="flex justify-center items-center">
        <input class="start-input" :value="inputValue.start" v-on="inputEvents.start" />
        <IconArrowRight />
        <input class="end-input" :value="inputValue.end" v-on="inputEvents.end" />
      </div>
    </template>
  </VDatePicker>
</template>
<script lang="ts">
export default {}
</script>
<style lang="css" scoped>
input {
  border: 1px solid lightgray;
  background-color: transparent;
  width: 50%;
  padding: 5px 0;
  text-align: center;
  margin: 10px 0;
}

.start-input {
  border-right: none;
  border-radius: 5px 0px 0px 5px;
}

.end-input {
  border-left: none;
  border-radius: 0px 5px 5px 0px;
}
</style>
