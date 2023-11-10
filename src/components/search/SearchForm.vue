<template>
  <div class="search-box">
    <form @submit.prevent="searchDebounce" class="search-form">
      <input
        v-model="keyword"
        @input="searchDebounce"
        placeholder="검색어를 입력해주세요."
        type="text"
        class="search-input"
      />
      <div class="search-option-box">
        <RangePicker v-model="range" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { debounce, formatDate } from '@/utils/utils'
import { mapMutations } from 'vuex'
import { defineComponent } from 'vue'
import RangePicker from '@/components/search/RangePicker.vue'
export default defineComponent({
  name: 'SearchForm',
  components: {
    RangePicker
  },
  data() {
    return {
      keyword: '',
      date: new Date(),
      range: {
        start: new Date(2020, 9, 12),
        end: new Date(2023, 12, 16)
      }
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
        startDate: formatDate(this.range.start, 'YYYY-MM-DD'),
        endDate: formatDate(this.range.end, 'YYYY-MM-DD')
      })
    }
  },
  watch: {
    keyword: 'searchDebounce',
    range: 'searchDebounce'
  }
})
</script>

<style lang="css" scoped>
.search-box {
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
