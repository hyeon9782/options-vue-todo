<template>
  <form class="edit-form" @submit.prevent="todo ? updateTodo($event) : addTodo()">
    <AppCalender v-model="deadline" />
    <div class="input-box">
      <input
        type="text"
        v-model="title"
        class="title-input"
        placeholder="제목을 입력해주세요."
        required
      />
      <input
        type="text"
        v-model="description"
        class="description-input"
        placeholder="설명을 입력해주세요."
        required
      />
      <div class="select-box">
        <div class="date-box">{{ deadline }}</div>
        <select v-model="selectedStatus" class="edit-select">
          <option value="선택">선택</option>
          <option v-for="(status, index) in statusArray" :key="index" :value="status">
            {{ status }}
          </option>
        </select>
        <select v-model="selectedCategory" class="edit-select">
          <option value="선택">선택</option>
          <option v-for="(category, index) in categories" :key="index" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <div class="button-box">
      <button class="edit-button" @click.prevent="todo ? updateTodo($event) : addTodo()">
        {{ todo ? '수정' : '추가' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatDate } from '@/utils/utils'
import AppCalender from '@/components/edit/AppCalender.vue'

export default defineComponent({
  name: 'EditForm',
  components: {
    AppCalender
  },
  props: {
    todo: {
      type: Object
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

<style lang="css" scoped>
.edit-form {
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-box {
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 20px;
}

.title-input {
  padding: 10px;
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 1.5rem;
  border-bottom: 1px solid gray;
}

.description-input {
  padding: 0px 10px;
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  border-bottom: 1px solid gray;
}

.select-box {
  display: flex;
}

.date-box {
  padding: 10px;
}

.button-box {
  display: flex;
  justify-content: center;
}

.edit-button {
  color: white;
  background-color: blue;
  border: none;
  border-radius: 5px;
  padding: 15px 0;
  font-size: 1.5rem;
  width: 300px;
}

.edit-select {
  border-radius: 5px;
  border: none;
  background: lightgray;
  padding: 10px;
}

.edit-date {
  width: 75%;
  border: none;
  background-color: lightgreen;
  text-align: center;
}
</style>
