<template lang="">
  <EditForm v-if="isEdit" :toggleEdit="toggleEdit" />
  <button v-else @click="toggleEdit" class="plus-button">+</button>
</template>
<script lang="ts">
import EditForm from '@/components/list/EditForm.vue'
export default {
  components: {
    EditForm
  },
  data() {
    return {
      isEdit: false
    }
  },
  methods: {
    toggleEdit() {
      this.isEdit = !this.isEdit
    }
  }
}
</script>
<style lang="css">
.plus-button {
  background-color: lightblue;
  border: none;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
