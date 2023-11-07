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
  created() {
    this.searchDebounce = debounce(() => {
      this.searchTodos()
    }, 1000)
  },
  methods: {
    ...mapMutations(['updateState']),
    // 이벤트 헨들러를 디바운스하는 것이 맞는지, watch와 함께 디바운스하는 것이 맞는지
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
    changeCategory(event: Event) {
      console.log((event.target as HTMLInputElement).value)

      this.updateState({
        selectedCategory: (event.target as HTMLInputElement).value
      })
    }
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory
    }
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
