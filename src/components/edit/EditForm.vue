<template>
  <form class="edit-form" @submit.prevent="todoId ? updateTodoClick($event) : addTodo($event)">
    <div class="deadline-box">
      <AppCalender v-model="deadline" />
    </div>
    <div class="input-box">
      <div>
        <label for="title"> Title </label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="title-input"
          placeholder="Title must be inserted"
          required
        />
      </div>
      <div>
        <label for="description"> Description </label>
        <input
          type="text"
          id="description"
          v-model="description"
          class="description-input"
          placeholder="Description optional"
        />
      </div>
      <div>
        <label for="status"> Status </label>
        <StatusList :selectStatus="selectStatus" :selectedStatus="selectedStatus" />
      </div>
      <div>
        <label for="category"> Category </label>
        <CategoryList :selectCategory="selectCategory" :selectedCategory="selectedCategory" />
      </div>
      <div class="button-box">
        <button class="edit-button" type="submit">
          {{ todoId ? 'Edit' : 'Create' }}
        </button>
        <button v-if="todoId" class="delete-button" @click="deleteTodoClick">Delete</button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// import { useTodosStore } from '@/stores/todos'
import { formatDate } from '@/utils/utils'
import { getTodoAPI } from '@/api/todos'
import AppCalender from '@/components/edit/AppCalender.vue'
import CategoryList from '@/components/edit/CategoryList.vue'
import StatusList from '@/components/search/StatusList.vue'
import { useTodos } from '@/composables/todos'

const props = defineProps({
  todoId: Number
})

const { createTodo, updateTodo, deleteTodo } = useTodos()

// const todosStore = useTodosStore()

const router = useRouter()
const route = useRoute()

const title = ref('')
const description = ref('')
const deadline = ref(formatDate(new Date().toDateString(), 'YYYY-MM-DD'))
const selectedStatus = ref('planned')
const selectedCategory = ref('Urgent')

const selectCategory = (category: string) => {
  selectedCategory.value = category
}

const selectStatus = (status: string) => {
  selectedStatus.value = status
}

const addTodo = (e: Event) => {
  e.preventDefault()
  if (!title.value) {
    alert('제목을 입력해주세요!')
    return
  }
  createTodo({
    title: title.value,
    description: description.value,
    deadline: deadline.value,
    status: selectedStatus.value,
    category: selectedCategory.value
  }).then(() => {
    clearForm()
    router.push('/')
  })
}

const updateTodoClick = (e: Event) => {
  e.preventDefault()
  if (!title.value) {
    alert('제목을 입력해주세요!')
    return
  }

  updateTodo({
    id: props.todoId,
    title: title.value,
    description: description.value,
    deadline: deadline.value,
    status: selectedStatus.value,
    category: selectedCategory.value
  }).then(() => {
    clearForm()
    router.push('/')
  })
}

const clearForm = () => {
  title.value = ''
  description.value = ''
  deadline.value = ''
  selectedStatus.value = '선택'
}

const deleteTodoClick = () => {
  deleteTodo(props.todoId).then(() => {
    clearForm()
    router.push('/')
  })
}

const getTodo = async () => {
  const id = route.params.id
  const todo = await getTodoAPI(Number(id))
  title.value = todo.title
  description.value = todo.description
  deadline.value = todo.deadline
  selectedStatus.value = todo.status
  selectedCategory.value = todo.category
}

onMounted(() => {
  if (props.todoId) {
    getTodo()
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

.deadline-box {
  height: 20%;
}

.input-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  gap: 10px;
}

.edit-button {
  color: white;
  background-color: rgb(71, 91, 216);
  border: none;
  border-radius: 30px;
  padding: 15px 0;
  font-weight: bold;
  font-size: medium;
  width: 50%;
  margin-top: 10px;
}

.delete-button {
  color: white;
  background-color: rgb(71, 91, 216);
  border: none;
  border-radius: 30px;
  padding: 15px 0;
  font-weight: bold;
  font-size: medium;
  width: 50%;
  margin-top: 10px;
}

.edit-select {
  border-radius: 5px;
  border: none;
  background: lightgray;
  padding: 10px;
}
</style>
