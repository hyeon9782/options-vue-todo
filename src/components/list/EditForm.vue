<template>
  <form class="edit-form">
    <input type="text" v-model="title" class="edit-input" placeholder="제목을 입력해주세요." />
    <input
      type="text"
      v-model="description"
      class="edit-input"
      placeholder="설명을 입력해주세요."
    />
    <div class="flex-box">
      <input type="date" v-model="deadline" class="edit-date" />
      <select v-model="selectedStatus" class="edit-select">
        <option disabled>선택</option>
        <option v-for="(status, index) in statusArray" :value="status" :key="index">
          <StatusMark :status="status" />

          {{ status }}
        </option>
      </select>
    </div>
    <div class="flex-box">
      <button @click.prevent="editTodo" class="edit-button">추가</button>
      <button @click.prevent="toggleEdit" class="cancel-button">취소</button>
    </div>
  </form>
</template>

<script lang="ts">
import StatusMark from '@/components/list/StatusMark.vue'
export default {
  components: {
    StatusMark
  },
  props: {
    toggleEdit: {
      type: Function,
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
    editTodo() {}
  },
  created() {
    this.title = this.todo.title
    this.description = this.todo.description
    this.deadline = this.todo.deadline
    this.selectedStatus = this.todo.status
  }
}
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
}

.flex-box {
  display: flex;
  gap: 10px;
}

.edit-date {
  width: 80%;
}

.edit-select {
  width: 20%;
}

.edit-button {
  background: blue;
  border-radius: 15px;
  border: none;
  padding: 5px 0;
  width: 80%;
}

.cancel-button {
  background: gray;
  border-radius: 15px;
  border: none;
  padding: 5px 0;
  width: 20%;
}
</style>
