<template>
  <div class="search-box">
    <form @submit.prevent="searchDebounce" class="search-form">
      <input
        v-model="keyword"
        @input="searchDebounce"
        placeholder="Search for tasks"
        type="text"
        class="search-input"
      />
      <div class="setting-box" @click.prevent="toggleFilter">
        <font-awesome-icon :icon="['fas', 'sliders']" class="setting-icon" />
      </div>
      <SearchFilter v-show="showFilter" />
    </form>
  </div>
</template>

<script lang="ts">
import { debounce, formatDate } from '@/utils/utils'
import { mapMutations } from 'vuex'
import { defineComponent } from 'vue'
import SearchFilter from '@/components/search/SearchFilter.vue'
export default defineComponent({
  name: 'SearchForm',
  components: {
    SearchFilter
  },
  data() {
    return {
      keyword: '',
      date: new Date(),
      range: {
        start: new Date(2020, 9, 12),
        end: new Date(2023, 12, 16)
      },
      showFilter: false
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
        startDate: this.keyword ? formatDate(this.range.start, 'YYYY-MM-DD') : '',
        endDate: this.keyword ? formatDate(this.range.end, 'YYYY-MM-DD') : ''
      })
    },
    toggleFilter() {
      this.showFilter = !this.showFilter
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
  padding: 10px;
  width: 100%;
}

.search-input {
  padding: 10px;
  border-radius: 7px 0 0 7px;
  border: 1px solid rgb(224, 224, 224);
  outline: none;
  font-size: 1rem;
  background: white;
  width: 90%;
}

.setting-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 7px 7px 0;
  background-color: rgb(224, 224, 224);
  width: 10%;
}

.setting-icon {
  font-size: large;
  color: rgb(44, 62, 80);
}
</style>
