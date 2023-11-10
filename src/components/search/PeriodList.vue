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
<script lang="ts">
export default {
  data() {
    return {
      periodList: ['Today', '1 Week', '1 Month', '3 Month']
    }
  },
  props: {
    selectedPeriod: {
      type: String
    },
    selectPeriod: {
      type: Function
    }
  }
}
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
}

.select {
  border: 2px solid rgb(71, 91, 216);
}
</style>
