<template>
  <main class="home-container">
    <WeeklyCanlender />
    <div class="list-box">
      <TodoList />
    </div>
  </main>
</template>

<script lang="ts">
import TodoList from '@/components/list/TodoList.vue'
import WeeklyCanlender from '@/components/list/WeeklyCanlender.vue'

export default {
  components: { TodoList, WeeklyCanlender }
}
</script>

<style lang="css">
.home-container {
  height: calc(100vh - 109px);
}

.list-box {
  height: 80%;
  overflow: auto;
}
</style>
