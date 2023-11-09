<template lang="">
  <svg :width="width" :height="height">
    <g :transform="'translate(' + width / 3 + ',' + height / 2 + ')'">
      <path
        :fill="color(i)"
        :stroke="color(i)"
        stroke-width="3"
        :d="arc(d, i)"
        v-for="(d, i) in arcs"
        :key="i"
      ></path>
      <g
        class="legend"
        v-for="(d, i) in arcs"
        :transform="'translate(140,' + (-45 + i * 30) + ')'"
        :key="i"
      >
        <circle r="10" :style="{ fill: color(i) }"></circle>
        <text x="30" y="5">{{ `${d.data.name} ${d.data.value}개` }}</text>
      </g>
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import * as d3 from 'd3'
export default defineComponent({
  name: 'DonutChart',
  data() {
    return {
      width: window.innerWidth < 500 ? window.innerWidth - 25 : 500,
      height: 250
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    arcs() {
      const pie = d3.pie().value((d: any) => d.value)
      return pie(this.data)
    },
    color() {
      const colorScale = d3
        .scaleOrdinal()
        .domain(this.data.map((d: any) => d.name))
        .range(d3.schemeDark2)
      return (i: number) => colorScale(this.arcs[i].data.name)
    },
    arc() {
      const width = window.innerWidth < 500 ? window.innerWidth - 25 : 500
      const height = 250
      const radius = Math.min(width, height) / 2.5
      const arcGenerator = d3.arc().innerRadius(70).outerRadius(radius)
      return (_: any, i: number) => arcGenerator(this.arcs[i])
    }
  }
})
</script>
