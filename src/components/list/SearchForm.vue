<template>
  <form @submit="searchTodo" class="search-form">
    <select v-model="selectedCategory" class="search-select">
      <option v-for="(category, index) in categories" :key="index" :value="category">
        {{ category }}
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
export default {
  name: 'SearchForm',
  data() {
    return {
      categories: ['제목', '설명', '상태', '날짜'],
      keyword: '',
      selectedCategory: '제목'
    }
  },
  methods: {
    searchTodo() {
      console.log('검색')
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
