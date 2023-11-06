<template>
  <main>
    <SearchForm />
    <PlusButton />
    <TodoList />
  </main>
</template>

<script lang="ts">
import SearchForm from '@/components/list/SearchForm.vue'
import PlusButton from '@/components/list/PlusButton.vue'
import TodoList from '@/components/list/TodoList.vue'

export default {
  components: { SearchForm, PlusButton, TodoList }
}
</script>

<style lang="css"></style>
