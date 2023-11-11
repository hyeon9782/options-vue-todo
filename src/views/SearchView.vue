<template lang="">
  <SubHeader>Search</SubHeader>
  <main class="search-container">
    <SearchForm />
    <div class="list-box">
      <TodoList />
    </div>
  </main>
</template>

<script setup lang="ts">
import SearchForm from '@/components/search/SearchForm.vue'
import SubHeader from '@/components/layouts/SubHeader.vue'
import TodoList from '@/components/home/TodoList.vue'
</script>
<style lang="css" scoped>
.search-container {
  height: calc(100vh - 109px);
}
.list-box {
  height: 80%;
  overflow: auto;
}
</style>
