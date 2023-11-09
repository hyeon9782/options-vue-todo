<template lang="">
  <EditForm v-if="isEdit" :toggleEdit="toggleEdit" :todo="todo" />
  <div v-else class="todo-item" @click="toggleEdit">
    <div class="flex-between">
      <div class="todo-title">
        {{ todo.title }}
      </div>
      <div class="todo-deadline">
        {{ todo.deadline }}
      </div>
    </div>
    <div class="flex-between">
      <div class="todo-description">
        {{ todo.description }}
      </div>
      <div class="todo-status">
        <StatusMark :status="todo.status" />
        {{ todo.status }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EditForm from '@/components/list/EditForm.vue'
import StatusMark from '@/components/list/StatusMark.vue'
export default defineComponent({
  name: 'TodoItem',
  components: {
    EditForm,
    StatusMark
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
    }
  }
})
</script>
<style lang="css" scoped>
.todo-item {
  background: lightblue;
  padding: 20px;
  border-radius: 15px;
  height: 120px;
  box-sizing: border-box;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

.todo-title {
  font-weight: bold;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
}

.todo-deadline {
  width: 20%;
}

.todo-description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
}

.todo-status {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 20%;
}
</style>
