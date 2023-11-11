<template lang="">
  <div class="filter-container">
    <div class="filter-title">Search Filter</div>
    <div class="date-box">
      <label for="">Date</label>
      <PeriodList :selectedPeriod="selectedPeriod" :selectPeriod="selectPeriod" />
      <VDatePicker v-model="value" is-range locale="en-US">
        <template #default="{ inputValue, inputEvents }">
          <div class="flex justify-center items-center">
            <input
              class="date-input start-input"
              :value="inputValue.start"
              v-on="inputEvents.start"
            />
            <IconArrowRight />
            <input class="date-input end-input" :value="inputValue.end" v-on="inputEvents.end" />
          </div>
        </template>
      </VDatePicker>
    </div>
    <div class="status-box">
      <label for="">Status</label>
      <StatusList :selectedStatus="selectedStatus" :selectStatus="selectStatus" />
    </div>
    <div class="filter-category-box">
      <label for="">Category</label>
      <CategoryList :selectedCategory="selectedCategory" :selectCategory="selectCategory" />
    </div>
    <div class="button-box">
      <button class="applay-button" @click.prevent="toggleFilter">Apply</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, computed } from 'vue'
import StatusList from '@/components/search/StatusList.vue'
import CategoryList from '@/components/edit/CategoryList.vue'
import PeriodList from '@/components/search/PeriodList.vue'

const props = defineProps({
  selectedCategory: String,
  selectCategory: Function,
  selectedPeriod: String,
  selectPeriod: Function,
  selectedStatus: String,
  selectStatus: Function,
  range: Object,
  toggleFilter: Function,
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
<style lang="css" scoped>
.filter-container {
  position: absolute;
  padding: 20px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgb(239, 240, 251);
  border-radius: 25px 25px 0px 0px;
  box-shadow: rgb(224, 224, 224) 12px 3px 14px 10px;
  z-index: 4;
}

.filter-title {
  font-size: large;
  text-align: center;
  font-weight: bold;
}

.date-box {
}

label {
  color: rgb(44, 62, 80);
  font-weight: 700;
  font-size: medium;
}

.button-box {
  display: flex;
  justify-content: center;
}

.applay-button {
  color: white;
  border: none;
  background-color: rgb(71, 91, 216);
  border-radius: 30px;
  font-size: medium;
  font-weight: 700;
  width: 208px;
  height: 44px;
}

.date-input {
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
