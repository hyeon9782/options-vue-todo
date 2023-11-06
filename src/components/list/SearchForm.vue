<template>
  <form @submit.prevent="searchTodos" class="search-form">
    <select @change="changeCategory" class="search-select">
      <option v-for="(category, index) in categories" :key="index" :value="category.value">
        {{ category.name }}
      </option>
    </select>
    <input
      v-model="keyword"
      placeholder="검색어를 입력해주세요."
      type="text"
      class="search-input"
    />
  </form>
</template>

<script lang="ts">
import { mapMutations } from 'vuex'
export default {
  name: 'SearchForm',
  data() {
    return {
      categories: [
        {
          name: '제목',
          value: 'title'
        },
        {
          name: '설명',
          value: 'description'
        },
        {
          name: '날짜',
          value: 'deadline'
        },
        {
          name: '상태',
          value: 'status'
        }
      ],
      keyword: ''
    }
  },
  methods: {
    ...mapMutations(['updateState']),
    searchTodos() {
      console.log('검색')
      console.log(this.keyword)
      console.log(this.selectedCategory)

      // this로 접근해서 값을 바인딩하는 것이 맞는 것인지
      // event 객체를 받아서 form요소 안에 있는 input이나 select의 값을 가져오는 게 맞는 것인지
      this.$store.dispatch('getTodos', {
        keyword: this.keyword,
        category: this.selectedCategory
      })
    },
    changeCategory(event) {
      console.log(event.target.value)

      this.updateState({
        selectedCategory: event.target.value
      })
    }
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory
    }
  }
}
</script>

<style lang="css">
.search-form {
  display: flex;
  gap: 10px;
  padding: 10px 0;
}

.search-select {
  width: 20%;
  padding: 10px 20px;
  border-radius: 15px;
  border: none;
  background: white;
}

.search-input {
  width: 80%;
  padding: 5px 10px;
  border-radius: 15px;
  border: none;
  background: white;
}
</style>
