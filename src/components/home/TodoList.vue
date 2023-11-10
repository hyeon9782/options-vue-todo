<template>
  <div class="todo-list" v-if="todos.length > 0">
    <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" />
  </div>
  <NoData v-else-if="todos.length === 0 && $route.path !== '/search'" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TodoItem from '@/components/home/TodoItem.vue'
import NoData from '@/components/statistics/NoData.vue'
export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem,
    NoData
  },
  created() {
    // 할 일 목록 조회하기
    this.fetchTodos()
  },
  methods: {
    fetchTodos() {
      ;(this as any).$store.dispatch('getTodos', {
        keyword: '',
        startDate: '',
        endDate: ''
      })
    }
  },
  computed: {
    todos() {
      return (this as any).$store.state.todos
    }
  }
})
</script>
<style lang="css" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}
</style>
