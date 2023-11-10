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
      <SearchFilter
        v-show="showFilter"
        :selectedCategory="selectedCategory"
        :selectCategory="selectCategory"
        :selectedPeriod="selectedPeriod"
        :selectPeriod="selectPeriod"
        :selectedStatus="selectedStatus"
        :selectStatus="selectStatus"
        :toggleFilter="toggleFilter"
        v-model="range"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { debounce, formatDate } from '@/utils/utils'
import { mapMutations } from 'vuex'
import { defineComponent } from 'vue'
import SearchFilter from '@/components/search/SearchFilter.vue'
import dayjs from 'dayjs'
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
        start: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD')
      },
      showFilter: false,
      selectedCategory: 'All',
      selectedStatus: 'all',
      selectedPeriod: '3 M'
    }
  },
  methods: {
    ...mapMutations(['updateState']),
    selectPeriod(period: string) {
      this.selectedPeriod = period

      switch (period) {
        case 'Today':
          this.setRange(dayjs(), dayjs())
          break
        case '1 W':
          this.setRange(dayjs().subtract(1, 'week'), dayjs())
          break
        case '1 M':
          this.setRange(dayjs().subtract(1, 'month'), dayjs())
          break
        case '3 M':
          this.setRange(dayjs().subtract(3, 'month'), dayjs())
          break
      }
      console.log(this.range)
    },
    setRange(start: dayjs.Dayjs, end: dayjs.Dayjs) {
      this.range = {
        start: start.format('YYYY-MM-DD'),
        end: end.format('YYYY-MM-DD')
      }
    },
    selectCategory(category: string) {
      this.selectedCategory = category
    },
    selectStatus(status: string) {
      this.selectedStatus = status
    },
    searchDebounce: debounce(function (this: any) {
      this.searchTodos()
    }, 1000),
    searchTodos() {
      this.$store.dispatch('getTodos', {
        keyword: this.keyword,
        startDate: this.keyword ? formatDate(this.range.start, 'YYYY-MM-DD') : '',
        endDate: this.keyword ? formatDate(this.range.end, 'YYYY-MM-DD') : '',
        category: this.selectedCategory === 'All' ? '' : this.selectedCategory,
        status: this.selectedStatus === 'all' ? '' : this.selectedStatus
      })
    },
    toggleFilter() {
      this.showFilter = !this.showFilter
    }
  },
  watch: {
    keyword: 'searchDebounce',
    range: 'searchDebounce',
    selectedCategory: 'searchDebounce',
    selectedStatus: 'searchDebounce'
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
