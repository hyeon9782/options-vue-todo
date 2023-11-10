<template lang="">
  <div class="category-tag" :style="selectColor(category)">{{ category }}</div>
</template>
<script lang="ts">
export default {
  props: {
    category: String
  },
  methods: {
    selectColor(category: string) {
      switch (category) {
        case 'Urgent':
          return {
            backgroundColor: 'rgb(251, 232, 230)',
            color: 'rgb(248, 171, 171)'
          }
        case 'Office':
          return {
            backgroundColor: 'rgb(207, 230, 246)',
            color: 'rgb(52, 152, 219)'
          }
        case 'Home':
          return {
            backgroundColor: 'rgb(223, 251, 236)',
            color: 'rgb(46, 204, 113)'
          }
        case 'School':
          return {
            backgroundColor: 'rgb(251, 232, 230)',
            color: 'rgb(248, 171, 171)'
          }
        case 'ETC':
          return {
            backgroundColor: 'rgb(212, 224, 236)',
            color: 'rgb(44, 62, 80)'
          }
        case 'Work Out':
          return {
            backgroundColor: 'rgb(230, 199, 243)',
            color: 'rgb(155, 89, 182)'
          }
        default:
          return {
            backgroundColor: 'lightgray',
            color: 'black'
          }
      }
    }
  }
}
</script>
<style lang="css" scoped>
.category-tag {
  padding: 5px 15px;
  border-radius: 30px;
  font-size: x-small;
  font-weight: 700;
}
</style>
