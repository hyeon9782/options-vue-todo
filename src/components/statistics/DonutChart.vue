<template>
  <svg :width="width" :height="height">
    <g :transform="'translate(' + (width / 2 - 60) + ',' + height / 2 + ')'">
      <path
        :fill="color(i)"
        :stroke="color(i)"
        stroke-width="3"
        :d="arc(d, i)"
        v-for="(d, i) in arcs"
        :key="i"
      ></path>
      <text
        class="percent"
        v-for="(d, i) in arcs"
        :key="i"
        :transform="'translate(' + getArcCentroid(d, i) + ')'"
        dy=".35em"
        text-anchor="middle"
      >
        {{ ((d.data.value / total) * 100).toFixed(2) + '%' }}
      </text>
      <g
        class="legend"
        v-for="(d, i) in arcs"
        :transform="'translate(' + 180 + ',' + (-45 + i * 30) + ')'"
        :key="i"
      >
        <circle r="8" :style="{ fill: color(i) }"></circle>
        <text x="20" y="5" font-size="12px">{{ d.data.name }}</text>
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
    total(): number {
      return this.data.reduce((sum: number, d: any) => sum + d.value, 0)
    },
    arcs() {
      const pie = d3.pie().value((d: any) => d.value)
      return pie(this.data)
    },
    color() {
      const colorScale = d3
        .scaleOrdinal()
        .domain(this.data.map((d: any) => d.name))
        .range(['rgb(141, 156, 248)', 'rgb(250, 169, 161)', 'rgb(253, 225, 113)'])

      return (i: number) => colorScale(this.arcs[i].data.name)
    },
    arc() {
      const width = window.innerWidth < 500 ? window.innerWidth - 25 : 500
      const height = 250
      const radius = Math.min(width, height) / 2.5
      const arcGenerator = d3.arc().innerRadius(50).outerRadius(radius)
      return arcGenerator
    }
  },
  methods: {
    getArcCentroid(_: any, i: number) {
      return this.arc.centroid(this.arcs[i])
    }
  }
})
</script>

<style lang="css" scoped>
.percent {
  font-weight: bold;
  font-size: small;
  color: rgb(52, 73, 94);
}
</style>
