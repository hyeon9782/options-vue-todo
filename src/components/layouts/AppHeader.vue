<template>
  <header class="header-container">
    <div class="header-title">Task</div>
    <router-link to="/search">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon" />
    </router-link>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppHeader'
})
</script>

<style lang="css" scoped>
.header-container {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.header-title {
  font-weight: bold;
  width: 100%;
  text-align: center;
  font-size: 1.7rem;
}

.search-icon {
  font-size: 1.8rem;
  position: absolute;
  top: 25px;
  right: 20px;
}
</style>
