<template lang="">
  <router-link to="/edit" class="plus-button">
    <font-awesome-icon :icon="['fas', 'plus']" />
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PlusButton',
  data() {
    return {
      isEdit: false
    }
  },
  methods: {}
})
</script>
<style lang="css">
.plus-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
