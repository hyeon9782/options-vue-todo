<template>
  <main>
    <SearchForm />
    <PlusButton />
    <EditForm />
  </main>
</template>

<script lang="ts">
import SearchForm from '@/components/list/SearchForm.vue'
import PlusButton from '@/components/list/PlusButton.vue'
import EditForm from '@/components/list/EditForm.vue'
export default {
  components: { SearchForm, PlusButton, EditForm }
}
</script>

<style lang="css"></style>
