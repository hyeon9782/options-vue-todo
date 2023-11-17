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
      <Transition name="fade" mode="out-in">
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
      </Transition>
    </form>
  </div>
</template>

<script setup lang="ts">
import { debounce, formatDate } from '@/utils/utils'
import { useTodosStore } from '@/stores/todos'
import { ref, watch } from 'vue'
import SearchFilter from '@/components/search/SearchFilter.vue'
import dayjs from 'dayjs'

const todosStore = useTodosStore()

const keyword = ref('')
const range = ref({
  start: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
  end: dayjs().format('YYYY-MM-DD')
})
const showFilter = ref(false)
const selectedCategory = ref('All')
const selectedStatus = ref('all')
const selectedPeriod = ref('3 M')

const selectPeriod = (period: string) => {
  selectedPeriod.value = period

  switch (period) {
    case 'Today':
      setRange(dayjs(), dayjs())
      break
    case '1 W':
      setRange(dayjs().subtract(1, 'week'), dayjs())
      break
    case '1 M':
      setRange(dayjs().subtract(1, 'month'), dayjs())
      break
    case '3 M':
      setRange(dayjs().subtract(3, 'month'), dayjs())
      break
  }
  console.log(range.value)
}

const setRange = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  range.value = {
    start: start.format('YYYY-MM-DD'),
    end: end.format('YYYY-MM-DD')
  }
}

const selectCategory = (category: string) => {
  selectedCategory.value = category
}

const selectStatus = (status: string) => {
  selectedStatus.value = status
}

const searchTodos = () => {
  todosStore.getTodos({
    keyword: keyword.value,
    startDate: keyword.value ? formatDate(range.value.start, 'YYYY-MM-DD') : '',
    endDate: keyword.value ? formatDate(range.value.end, 'YYYY-MM-DD') : '',
    category: selectedCategory.value === 'All' ? '' : selectedCategory.value,
    status: selectedStatus.value === 'all' ? '' : selectedStatus.value
  })
}

const searchDebounce = debounce(searchTodos, 1000)

const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

watch(keyword, searchDebounce)
watch(range, searchDebounce)
watch(selectedCategory, searchDebounce)
watch(selectedStatus, searchDebounce)
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(434px);
  /* opacity: 0; */
}
</style>
