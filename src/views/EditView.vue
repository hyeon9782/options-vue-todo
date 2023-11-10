<template lang="">
  <SubHeader>Edit Task</SubHeader>
  <main>
    <EditForm />
  </main>
</template>
<script lang="ts">
import SubHeader from '@/components/layouts/SubHeader.vue'
import EditForm from '@/components/edit/EditForm.vue'
import { getTodoAPI } from '@/api/todos'
export default {
  components: {
    SubHeader,
    EditForm
  },
  methods: {
    getTodo() {
      const id = this.$route.params.id
      console.log(id)
      getTodoAPI(Number(id))
    }
  },
  mounted() {
    this.getTodo()
  }
}
</script>
<style lang="css"></style>
