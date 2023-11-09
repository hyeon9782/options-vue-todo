<template>
  <form @submit.prevent="searchDebounce" class="search-form">
    <select @change="changeCategory" :value="selectedCategory" class="search-select">
      <option v-for="(category, index) in categories" :key="index" :value="category.value">
        {{ category.name }}
      </option>
    </select>
    <input
      v-model="keyword"
      @input="searchDebounce"
      placeholder="검색어를 입력해주세요."
      type="text"
      class="search-input"
    />
  </form>
</template>

<script lang="ts">
import { debounce } from '@/utils/utils'
import { mapMutations } from 'vuex'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SearchForm',
  data() {
    return {
      categories: [
        { name: '제목', value: 'title' },
        { name: '설명', value: 'description' },
        { name: '날짜', value: 'deadline' },
        { name: '상태', value: 'status' }
      ],
      keyword: ''
    }
  },
  methods: {
    ...mapMutations(['updateState']),
    searchDebounce: debounce(function (this: any) {
      this.searchTodos()
    }, 1000),
    searchTodos() {
      this.$store.dispatch('getTodos', {
        keyword: this.keyword,
        category: this.selectedCategory
      })
    },
    changeCategory(event: Event) {
      this.updateState({
        selectedCategory: (event.target as HTMLInputElement).value
      })
    }
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory
    }
  },
  watch: {
    keyword: 'searchDebounce',
    selectedCategory: 'searchDebounce'
  }
})
</script>

<style lang="css">
.search-form {
  display: flex;
  gap: 10px;
  padding: 10px 0;
}

.search-select {
  width: 25%;
  padding: 10px 20px;
  border-radius: 15px;
  border: none;
  background: white;
}

.search-input {
  width: 75%;
  padding: 5px 10px;
  border-radius: 15px;
  border: none;
  background: white;
}
</style>
