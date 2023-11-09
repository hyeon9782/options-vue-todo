<template lang="">
  <EditForm v-if="isEdit" :toggleEdit="toggleEdit" :todo="todo" />
  <div v-else class="todo-item" @click="toggleEdit">
    <div class="contents-box">
      <div class="todo-title">
        {{ todo.title }}
      </div>
      <div class="additional-information">
        <div class="todo-deadline">
          {{ todo.deadline }}
        </div>
        <div class="todo-description">
          {{ todo.description }}
        </div>
      </div>
    </div>
    <div class="todo-status" :style="{ backgroundColor: selectColor(todo.status) }"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EditForm from '@/components/list/EditForm.vue'
export default defineComponent({
  name: 'TodoItem',
  components: {
    EditForm
  },
  props: {
    todo: Object
  },
  data() {
    return {
      isEdit: false
    }
  },
  methods: {
    toggleEdit(event: Event) {
      this.isEdit = !this.isEdit
    },
    selectColor(status: string) {
      switch (status) {
        case '진행전':
          return 'red'
        case '진행중':
          return 'blue'
        case '완료':
          return 'greenyellow'
        default:
          break
      }
    }
  }
})
</script>
<style lang="css">
.todo-item {
  border-radius: 5px;
  height: 120px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.contents-box {
  padding: 20px;
  width: 100%;
}

.contents-box .todo-title {
  font-weight: bold;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.additional-information {
  font-size: 1rem;
  color: lightgray;
  display: flex;
}

.additional-information .todo-deadline {
  width: 20%;
}

.additional-information .todo-description {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.todo-status {
  height: 80%;
  width: 5px;
}
</style>
