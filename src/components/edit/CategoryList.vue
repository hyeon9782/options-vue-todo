<template lang="">
  <div class="category-list">
    <CategoryTag v-for="(category, index) in categories" :key="index" :category="category" />
  </div>
</template>
<script lang="ts">
import CategoryTag from '@/components/edit/CategoryTag.vue'
export default {
  data() {
    return {
      categories: ['Urgent', 'Office', 'Home', 'School', 'ETC', 'Work Out']
    }
  },
  components: {
    CategoryTag
  }
}
</script>
<style lang="css" scoped>
.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 15px 0;
  padding: 0px 10px;
}
</style>
