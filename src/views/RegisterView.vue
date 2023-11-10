<template lang="">
  <SubHeader>Add Task</SubHeader>
  <main>
    <EditForm />
  </main>
</template>
<script lang="ts">
import EditForm from '@/components/edit/EditForm.vue'
import SubHeader from '@/components/layouts/SubHeader.vue'
export default {
  components: {
    EditForm,
    SubHeader
  }
}
</script>
<style lang=""></style>
