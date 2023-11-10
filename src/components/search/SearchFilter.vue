<template lang="">
  <div class="filter-container">
    <div class="filter-title">Search Filter</div>
    <div class="date-box">
      <label for="">Date</label>
      <div class="date-list">
        <div class="date-block" v-for="(date, index) in dateList" :key="index">{{ date }}</div>
      </div>
      <RangePicker />
    </div>
    <div class="status-box">
      <label for="">Status</label>
      <StatusList />
    </div>
    <div class="filter-category-box">
      <label for="">Category</label>
      <CategoryList />
    </div>
    <div class="button-box">
      <button class="applay-button">Apply</button>
    </div>
  </div>
</template>
<script lang="ts">
import RangePicker from '@/components/search/RangePicker.vue'
import StatusList from '@/components/search/StatusList.vue'
import CategoryList from '@/components/edit/CategoryList.vue'
export default {
  components: {
    RangePicker,
    StatusList,
    CategoryList
  },
  data() {
    return {
      dateList: ['Today', '1 Week', '1 Month', '3 Month']
    }
  }
}
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

.date-list {
  display: flex;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 10px 0 0 0;
}

.date-block {
  width: 200px;
  text-align: center;
  border-right: 1px solid lightgray;
}

.date-list .date-block:last-child {
  border-right: none;
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
</style>
