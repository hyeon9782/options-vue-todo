<template lang="">
  <SubHeader>Edit Task</SubHeader>
  <main>
    <EditForm :todoId="$route.params.id" />
  </main>
</template>
<script lang="ts">
import SubHeader from '@/components/layouts/SubHeader.vue'
import EditForm from '@/components/edit/EditForm.vue'

export default {
  components: {
    SubHeader,
    EditForm
  }
}
</script>
<style lang="css"></style>
