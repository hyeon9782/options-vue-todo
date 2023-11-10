<template>
  <header class="header-container">
    <font-awesome-icon :icon="['fas', 'bars']" class="header-menu" />
    <select :value="selectedMonth" class="header-month-select">
      <option v-for="(month, index) in months" :key="index" :value="month">{{ month }}</option>
    </select>
    <router-link to="/search">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
    </router-link>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppHeader',
  data() {
    return {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      selectedMonth: 'November'
    }
  }
})
</script>

<style lang="css">
.header-container {
  padding: 10px 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-menu {
  color: lightblue;
}

.header-month-select {
  border: none;
  outline: none;
  padding: 10px 15px;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
