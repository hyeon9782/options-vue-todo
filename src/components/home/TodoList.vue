<template>
  <div class="todo-list" v-if="todos.length > 0">
    <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" />
  </div>
  <div class="no-data" v-else>할 일을 추가해보세요!</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TodoItem from '@/components/home/TodoItem.vue'
export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem
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
}

.no-data {
  background-color: lightgray;
  height: 400px;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  margin: 10px 0;
  border-radius: 5px;
}
</style>
