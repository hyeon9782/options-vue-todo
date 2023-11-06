<template>
  <div class="todo-list">
    <TodoItem v-for="(todo, index) in todoList" :key="index" :todo="todo" />
  </div>
</template>
<script lang="ts">
import TodoItem from '@/components/list/TodoItem.vue'
export default {
  components: {
    TodoItem
  },
  data() {
    return {
      todoList: [
        {
          id: 0,
          title: '테스트 Todo 1 제목',
          description: '테스트 Todo 1 설명',
          deadline: '2023-10-01',
          status: '진행전'
        },
        {
          id: 1,
          title: '테스트 Todo 2 제목',
          description: '테스트 Todo 2 설명',
          deadline: '2023-10-03',
          status: '완료'
        }
      ]
    }
  }
}
</script>
<style lang="css">
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
