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
        </div>
      </div>
      <div class="todo-description">
        {{ todo.description }}
      </div>
      <div class="category-box">
        <CategoryTag :category="todo.category" />
        <!-- <StatusTag :status="todo.status" /> -->
        <div class="status-box">
          {{ todo.status.charAt(0).toUpperCase() + todo.status.slice(1) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CategoryTag from '@/components/edit/CategoryTag.vue'
import StatusTag from '@/components/search/StatusTag.vue'
export default defineComponent({
  name: 'TodoItem',
  components: {
    CategoryTag,
    StatusTag
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
      console.log(status)

      switch (status) {
        case 'planned':
          return {
            backgroundColor: 'rgb(141, 156, 248)'
          }
        case 'ongoing':
          return {
            backgroundColor: 'rgb(250, 169, 161)'
          }
        case 'complete':
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
  width: 100%;
  background-color: rgb(247, 247, 253);
}

.todo-status-line {
  width: 5px;
  height: 80px;
  border-radius: 30px;
  margin-right: 5px;
}

.todo-box {
  width: calc(100% - 5px);
  padding: 10px;
}

.item-head {
  display: flex;
  justify-content: space-between;
}

.todo-info {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 20%;
  color: black;
}

.todo-title {
  color: rgb(44, 62, 80);
  font-size: small;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
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
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}

.status-box {
  font-size: x-small;
  font-weight: bold;
}
</style>
