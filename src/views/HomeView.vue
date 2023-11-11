<template>
  <main class="home-container">
    <WeeklyCanlender v-model="date" />
    <div class="list-box">
      <TodoList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { formatDate } from '@/utils/utils'
import TodoList from '@/components/home/TodoList.vue'
import WeeklyCanlender from '@/components/home/WeeklyCanlender.vue'

const store = useStore()
const date = ref(new Date().toDateString())
const searchTodos = () => {
  const formattedDate = formatDate(date.value, 'YYYY-MM-DD')
  store.dispatch('getTodos', {
    keyword: '',
    startDate: '',
    endDate: formattedDate,
    category: '',
    status: ''
  })
}

const clearTodos = () => {
  store.commit('updateState', {
    todos: []
  })
}

// 데이터 패칭
watch(date, searchTodos)
onMounted(searchTodos)

onUnmounted(clearTodos)
</script>

<style lang="css" scoped>
.home-container {
  height: calc(100vh - 109px);
  /* padding: 0 20px; */
}

.list-box {
  height: 80%;
  overflow: auto;
}
</style>
