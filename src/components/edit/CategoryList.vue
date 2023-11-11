<template lang="">
  <div class="category-list">
    <CategoryTag
      v-if="$route.path === '/search'"
      category="All"
      :class="{ select: 'All' === selectedCategory }"
      @click.prevent="selectCategory('All')"
    />
    <CategoryTag
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
      @click.prevent="selectCategory(category)"
      :class="{ select: category === selectedCategory }"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CategoryTag from '@/components/edit/CategoryTag.vue'
const categories = ref(['Urgent', 'Office', 'Home', 'School', 'ETC', 'Work Out'])

defineProps({
  selectCategory: {
    type: Function,
    required: true
  },
  selectedCategory: {
    type: String,
    required: true
  }
})
</script>
<style lang="css" scoped>
.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 15px 0;
  padding: 0px 10px;
}

.select {
  border: 2px solid rgb(71, 91, 216);
}
</style>
