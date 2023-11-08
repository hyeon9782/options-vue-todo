<template>
  <form class="edit-form" @submit.prevent="todo ? updateTodo($event) : addTodo()">
    <input
      type="text"
      v-model="title"
      class="edit-input"
      placeholder="제목을 입력해주세요."
      required
    />
    <input
      type="text"
      v-model="description"
      class="edit-input"
      placeholder="설명을 입력해주세요."
      required
    />
    <div class="flex-box">
      <input type="date" v-model="deadline" class="edit-date" required />
      <select v-model="selectedStatus" class="edit-select" required>
        <option disabled>선택</option>
        <option v-for="(status, index) in statusArray" :value="status" :key="index">
          <StatusMark :status="status" />

          {{ status }}
        </option>
      </select>
    </div>
    <div class="flex-box">
      <button @submit.prevent="todo ? updateTodo($event) : addTodo()" class="edit-button">
        {{ todo ? '수정' : '추가' }}
      </button>
      <button @click.prevent="cancelEdit" class="cancel-button">취소</button>
    </div>
  </form>
</template>

<script lang="ts">
import StatusMark from '@/components/list/StatusMark.vue'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'EditForm',
  components: {
    StatusMark
  },
  props: {
    toggleEdit: {
      type: Function as PropType<(event: Event) => void>,
      required: true
    },
    todo: {
      type: Object
    }
  },
  data() {
    return {
      title: '',
      description: '',
      deadline: '',
      selectedStatus: '선택',
      statusArray: ['진행전', '진행중', '완료']
    }
  },
  methods: {
    addTodo() {
      console.log(this.deadline)

      // 임시방편인데 더 좋은 방식은 없을까?
      ;(this as any).$store
        .dispatch('createTodo', {
          title: this.title,
          description: this.description,
          deadline: this.deadline,
          status: this.selectedStatus
        })
        .then(() => {
          this.clearForm()
        })
    },
    updateTodo(e: Event) {
      ;(this as any).$store
        .dispatch('updateTodo', {
          id: this.todo?.id,
          title: this.title,
          description: this.description,
          deadline: this.deadline,
          status: this.selectedStatus
        })
        .then(() => {
          this.toggleEdit(e)
        })
    },
    cancelEdit(e: Event) {
      this.toggleEdit(e)
      this.clearForm()
    },
    clearForm() {
      this.title = ''
      this.description = ''
      this.deadline = ''
      this.selectedStatus = '선택'
    }
  },
  created() {
    console.log('todo 있니?')

    if (this.todo) {
      console.log('todo 있다!')
      this.title = this.todo.title
      this.description = this.todo.description
      this.deadline = this.todo.deadline
      this.selectedStatus = this.todo.status
    }
  }
})
</script>

<style lang="css">
.edit-form {
  padding: 20px;
  background: lightblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-input {
  padding: 5px 10px;
  width: 100%;
  border: none;
  outline: none;
  background: none;
  border-bottom: 2px solid black;
}

.flex-box {
  display: flex;
  gap: 10px;
}

.edit-date {
  width: 75%;
  border: none;
  background-color: lightgreen;
  text-align: center;
}

.edit-select {
  width: 25%;
  border-radius: 15px;
  border: none;
  background: lightgreen;
  padding: 10px;
}

.edit-button {
  background: blue;
  border-radius: 15px;
  border: none;
  padding: 5px 0;
  width: 75%;
}

.cancel-button {
  background: gray;
  border-radius: 15px;
  border: none;
  padding: 5px 0;
  width: 25%;
}
</style>
