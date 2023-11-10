<template>
  <form class="edit-form" @submit.prevent="todoId ? updateTodo($event) : addTodo()">
    <AppCalender v-model="deadline" />
    <div class="input-box">
      <label for="title"> Title </label>
      <input
        type="text"
        id="title"
        v-model="title"
        class="title-input"
        placeholder="Title must be inserted"
        required
      />
      <label for="description"> Description </label>
      <input
        type="text"
        id="description"
        v-model="description"
        class="description-input"
        placeholder="Description optional"
        required
      />
      <label for="category"> Category </label>
      <CategoryList />
      <div class="select-box">
        <select v-if="todoId" v-model="selectedStatus" class="edit-select">
          <option value="선택">선택</option>
          <option v-for="(status, index) in statusArray" :key="index" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
      <div class="button-box">
        <button class="edit-button" @click.prevent="todoId ? updateTodo($event) : addTodo()">
          {{ todoId ? 'Edit' : 'Create' }}
        </button>
        <button v-if="todoId" class="delete-button" @click.prevent="deleteTodo">Delete</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatDate } from '@/utils/utils'
import AppCalender from '@/components/edit/AppCalender.vue'
import { getTodoAPI } from '@/api/todos'
import CategoryList from '@/components/edit/CategoryList.vue'

export default defineComponent({
  name: 'EditForm',
  components: {
    AppCalender,
    CategoryList
  },
  props: {
    todoId: {
      type: Number
    }
  },
  data() {
    return {
      title: '',
      description: '',
      deadline: formatDate(new Date(), 'YYYY-MM-DD'),
      selectedStatus: '선택',
      statusArray: ['진행전', '진행중', '완료'],
      selectedCategory: '선택',
      categories: ['운동', '공부', '취미']
    }
  },
  methods: {
    addTodo() {
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
          this.$router.push('/')
        })
    },
    updateTodo(e: Event) {
      ;(this as any).$store
        .dispatch('updateTodo', {
          id: this.todoId,
          title: this.title,
          description: this.description,
          deadline: this.deadline,
          status: this.selectedStatus
        })
        .then(() => {
          this.clearForm()
          this.$router.push('/')
        })
    },
    clearForm() {
      this.title = ''
      this.description = ''
      this.deadline = ''
      this.selectedStatus = '선택'
    },
    deleteTodo() {
      this.$store
        .dispatch('deleteTodo', this.todoId)
        .then(() => {
          this.clearForm()
          this.$router.push('/')
        })
        .then(() => {
          this.clearForm()
          this.$router.push('/')
        })
    },
    async getTodo() {
      const id = this.$route.params.id
      console.log(id)
      const todo = await getTodoAPI(Number(id))
      console.log(todo)

      this.title = todo.title
      this.description = todo.description
      this.deadline = todo.deadline
      this.selectedStatus = todo.status
    }
  },
  mounted() {
    if (this.todoId) {
      this.getTodo()
    }
  }
})
</script>

<style lang="css" scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 48.8px);
}

.input-box {
  border-radius: 25px 25px 0px 0px;
  background-color: rgb(239, 240, 251);
  box-shadow: rgb(224, 224, 224) 0px 3px 14px 10px;
  padding: 30px 30px;
  height: 80%;
}

.title-input {
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  border-bottom: 1px solid lightgray;
  margin: 15px 0;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: medium;
  color: rgb(49, 69, 113);
}

.description-input {
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  border-bottom: 1px solid lightgray;
  margin: 15px 0;
}

.select-box {
  display: flex;
}

.button-box {
  display: flex;
  justify-content: center;
}

.edit-button {
  color: white;
  background-color: rgb(71, 91, 216);
  border: none;
  border-radius: 30px;
  padding: 15px 0;
  font-weight: bold;
  font-size: medium;
  width: 200px;
  margin-top: 10px;
}

.edit-select {
  border-radius: 5px;
  border: none;
  background: lightgray;
  padding: 10px;
}
</style>