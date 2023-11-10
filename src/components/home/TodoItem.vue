<template lang="">
  <div class="todo-item" @click="moveEdit">
    <div class="todo-status-line" :style="selectColor(todo.status)"></div>
    <div class="todo-box">
      <div class="item-head">
        <div class="todo-title">
          {{ todo.title }}
        </div>
        <div class="todo-info">
          <div class="todo-deadline">
            {{ todo.deadline }}
          </div>
          <div class="todo-status">
            {{ todo.status }}
          </div>
        </div>
      </div>
      <div class="todo-description">
        {{ todo.description }}
      </div>
      <div class="category-box">
        <CategoryTag :category="todo.category" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CategoryTag from '@/components/edit/CategoryTag.vue'
export default defineComponent({
  name: 'TodoItem',
  components: {
    CategoryTag
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEdit: false
    }
  },
  methods: {
    selectColor(status: string) {
      switch (status) {
        case '진행전':
          return {
            backgroundColor: 'rgb(141, 156, 248)'
          }
        case '진행중':
          return {
            backgroundColor: 'rgb(250, 169, 161)'
          }
        case '완료':
          return {
            backgroundColor: 'rgb(253, 225, 113)'
          }
        default:
          break
      }
    },
    moveEdit() {
      this.$router.push(`/edit/${this.todo.id}`)
    }
  }
})
</script>
<style lang="css">
.todo-item {
  border-radius: 5px;
  box-shadow: rgb(224, 224, 224) 10px 10px 10px 0px;
  box-sizing: border-box;
  display: flex;

  background-color: rgb(247, 247, 253);
}

.todo-status-line {
  width: 5px;
  height: 80px;
  border-radius: 30px;
  margin-right: 5px;
}

.todo-box {
  width: 100%;
  padding: 10px;
}

.item-head {
  display: flex;
  justify-content: space-between;
}

.todo-info {
  display: flex;
  gap: 10px;
  width: 27%;
  color: black;
}

.todo-title {
  color: rgb(44, 62, 80);
  font-size: small;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 73%;
}

.todo-deadline {
  font-size: x-small;
}

.todo-status {
  font-size: x-small;
}

.todo-description {
  color: rgb(127, 127, 127);
  font-size: x-small;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-box {
  display: flex;
  padding-top: 10px;
}
</style>
