<template lang="">
  <SubHeader>Edit Task</SubHeader>
  <main>
    <EditForm :todoId="$route.params.id" />
  </main>
</template>
<script setup lang="ts">
import SubHeader from '@/components/layouts/SubHeader.vue'
import EditForm from '@/components/edit/EditForm.vue'
</script>
