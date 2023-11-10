<template lang="">
  <SubHeader>Search Task</SubHeader>
  <main>
    <SearchForm />
    <TodoList />
  </main>
</template>

<script lang="ts">
import SearchForm from '@/components/search/SearchForm.vue'
import SubHeader from '@/components/layouts/SubHeader.vue'
import TodoList from '@/components/list/TodoList.vue'
export default {
  components: {
    SearchForm,
    TodoList,
    SubHeader
  }
}
</script>
<style lang="css"></style>
