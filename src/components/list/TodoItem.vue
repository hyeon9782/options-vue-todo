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
<script>
import EditForm from '@/components/list/EditForm.vue'
import StatusMark from '@/components/list/StatusMark.vue'
export default {
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
    toggleEdit() {
      this.isEdit = !this.isEdit
    }
  }
}
</script>
<style lang="css">
.todo-item {
  background: lightblue;
  padding: 20px;
  border-radius: 15px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

.todo-title {
  font-weight: bold;
  font-size: 1.5rem;
}

.todo-deadline {
}

.todo-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70px;
}
</style>
