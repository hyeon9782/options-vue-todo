<template lang="">
  <div class="period-list">
    <div
      class="period-item"
      v-for="(period, index) in periodList"
      :key="index"
      :class="{ select: period === selectedPeriod }"
      @click.prevent="selectPeriod(period)"
    >
      {{ period }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const periodList = ref(['Today', '1 W', '1 M', '3 M'])

defineProps({
  selectedPeriod: {
    type: String,
    required: true
  },
  selectPeriod: {
    type: Function,
    required: true
  }
})
</script>
<style lang="css" scoped>
.period-list {
  display: flex;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 10px 0 0 0;
}

.period-item {
  width: 200px;
  text-align: center;
  border-radius: 5px;
  font-size: small;
  font-weight: bold;
}

.select {
  border: 2px solid rgb(71, 91, 216);
}
</style>
