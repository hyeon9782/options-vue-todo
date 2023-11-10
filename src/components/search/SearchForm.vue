<template>
  <div class="search-container">
    <AppBack />
    <form @submit.prevent="searchDebounce" class="search-form">
      <input
        v-model="keyword"
        @input="searchDebounce"
        placeholder="검색어를 입력해주세요."
        type="text"
        class="search-input"
      />
      <div class="search-option-box"></div>
    </form>
  </div>
</template>

<script lang="ts">
import { debounce } from '@/utils/utils'
import { mapMutations } from 'vuex'
import { defineComponent } from 'vue'
import AppBack from '@/components/layouts/AppBack.vue'
export default defineComponent({
  name: 'SearchForm',
  components: {
    AppBack
  },
  data() {
    return {
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
    }
  },
  watch: {
    keyword: 'searchDebounce'
  }
})
</script>

<style lang="css">
.search-container {
  display: flex;
  align-items: center;
}

.search-form {
  display: flex;
  gap: 10px;
  padding: 10px;
}

.search-input {
  padding: 5px 10px;
  border-radius: 15px;
  border: none;
  outline: none;
  font-size: 1.2rem;
  background: white;
}
</style>
