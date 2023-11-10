<template lang="">
  <main>
    <SearchForm />
    <TodoList />
  </main>
</template>

<script lang="ts">
import SearchForm from '@/components/search/SearchForm.vue'
import TodoList from '@/components/list/TodoList.vue'
export default {
  components: {
    SearchForm,
    TodoList
  }
}
</script>
<style lang="css"></style>
