<template>
  <div class="todo-list" v-if="todos.length > 0">
    <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" />
  </div>
  <NoData v-else-if="todos.length === 0 && $route.path !== '/search'" />
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import TodoItem from '@/components/home/TodoItem.vue'
import NoData from '@/components/statistics/NoData.vue'
import { useStore } from 'vuex'

const store = useStore()
const todos = computed(() => store.state.todos)

const fetchTodos = () => {
  store.dispatch('getTodos', {
    keyword: '',
    startDate: '',
    endDate: ''
  })
}

onMounted(fetchTodos)
</script>
<style lang="css" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}
</style>
